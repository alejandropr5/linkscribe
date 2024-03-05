from datetime import timedelta
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status, APIRouter

from sqlapp import crud, schemas
from utils import user_models as models
from utils.constants import AuthConstants


router = APIRouter()


@router.post("/", response_model=models.AuthUser)
def create_user(
    user: schemas.UserCreate, db: Session = Depends(models.get_db)
):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = crud.create_user(db=db, user=user)

    access_token_expires = timedelta(
        minutes=AuthConstants.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    access_token = models.create_access_token(
        data={"email": user.email}, expires_delta=access_token_expires
    )
    return models.AuthUser(
        name=new_user.name,
        email=new_user.email,
        access_token=access_token,
        token_type="bearer"
    )


@router.get("/", response_model=list[schemas.User])
def read_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(models.get_db),
):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@router.get("/available/{email}")
def is_available(email: str, db: Session = Depends(models.get_db)):
    db_user = crud.get_user_by_email(db, email=email)
    return {"available": db_user is None}


@router.post("/login", response_model=models.AuthUser)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(models.get_db),
):
    user = models.authenticate_user(
        db, form_data.username, form_data.password, models.pwd_context
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
    access_token = models.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return models.AuthUser(
        name=user.name,
        email=user.email,
        access_token=access_token,
        token_type="bearer"
    )


@router.get("/me/", response_model=schemas.User)
async def read_users_me(
    current_user: Annotated[
        schemas.User, Depends(models.get_current_active_user)
    ],
):
    return current_user
