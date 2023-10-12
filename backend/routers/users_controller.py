from typing import Annotated
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from fastapi import Cookie, Response, Depends, HTTPException
from sqlalchemy.orm import Session
import logging

from src.sqlapp import crud, schemas
from src.sqlapp.database import SessionLocal


logging.basicConfig(level=logging.DEBUG,
                    format="%(levelname)s:\t%(message)s")

CookieParam = Annotated[str | None, Cookie()]


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


router = InferringRouter()


@cbv(router)
class UsersController:
    @router.get("/session")
    async def session(self, access_token: CookieParam = None):
        session = access_token is not None
        return {"session": session}

    @router.get("/logout")
    async def logout(self, response: Response):
        response.delete_cookie("access_token")

    @router.post("/", response_model=schemas.User)
    def create_user(self,
                    user: schemas.UserCreate,
                    db: Session = Depends(get_db)):
        db_user = crud.get_user_by_username(db, username=user.username)
        if db_user:
            raise HTTPException(status_code=400,
                                detail="Username already registered")
        return crud.create_user(db=db, user=user)

    @router.get("/", response_model=list[schemas.User])
    def read_users(self,
                   skip: int = 0,
                   limit: int = 100,
                   db: Session = Depends(get_db)):
        users = crud.get_users(db, skip=skip, limit=limit)
        return users

    @router.get("/passwords", response_model=list[schemas.UserPassword])
    def read_users_with_passwords(self,
                                  skip: int = 0,
                                  limit: int = 100,
                                  db: Session = Depends(get_db)):
        users = crud.get_users(db, skip=skip, limit=limit)
        return users

    @router.get("/{user_id}", response_model=schemas.User)
    def read_user(self, user_id: int, db: Session = Depends(get_db)):
        db_user = crud.get_user(db, user_id=user_id)
        if db_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return db_user
