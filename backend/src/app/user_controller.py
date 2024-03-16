from datetime import timedelta
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status, APIRouter

from sqlapp import crud, schemas, database
from utils import user_models
from utils.constants import AuthConstants


router = APIRouter()


@router.post("/", response_model=user_models.AuthUser)
def create_user(
    user: schemas.UserCreate, db: Session = Depends(database.get_db)
):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = crud.create_user(db=db, user=user)

    access_token_expires = timedelta(
        minutes=AuthConstants.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    access_token = user_models.create_access_token(
        data={"email": user.email}, expires_delta=access_token_expires
    )
    return user_models.AuthUser(
        name=new_user.name,
        email=new_user.email,
        access_token=access_token,
        token_type="bearer",
    )


@router.get("/available/{email}")
def is_available(email: str, db: Session = Depends(database.get_db)):
    db_user = crud.get_user_by_email(db, email=email)
    return {"available": db_user is None}


@router.post("/login", response_model=user_models.AuthUser)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(database.get_db),
):
    user = user_models.authenticate_user(
        db, form_data.username, form_data.password, user_models.pwd_context
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(
        minutes=AuthConstants.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    access_token = user_models.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return user_models.AuthUser(
        name=user.name,
        email=user.email,
        access_token=access_token,
        token_type="bearer",
    )
