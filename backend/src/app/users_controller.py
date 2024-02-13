from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from sqlapp import crud, schemas
from utils import user_models as models


router = InferringRouter()


@cbv(router)
class UsersController:
    @router.post("/", response_model=schemas.User)
    def create_user(
        self, user: schemas.UserCreate, db: Session = Depends(models.get_db)
    ):
        db_user = crud.get_user_by_email(db, email=user.email)
        if db_user:
            raise HTTPException(
                status_code=400, detail="Email already registered"
            )
        return crud.create_user(db=db, user=user)

    @router.get("/", response_model=list[schemas.User])
    def read_users(
        self,
        skip: int = 0,
        limit: int = 100,
        db: Session = Depends(models.get_db),
    ):
        users = crud.get_users(db, skip=skip, limit=limit)
        return users

    @router.get("/{email}", response_model=schemas.User)
    def read_user(self, email: str, db: Session = Depends(models.get_db)):
        db_user = crud.get_user_by_email(db, email=email)
        if db_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return db_user
