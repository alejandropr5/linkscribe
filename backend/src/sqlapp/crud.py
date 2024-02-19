from sqlalchemy.orm import Session
# from datetime import datetime

from sqlapp import models, schemas
from utils import user_models


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    response = db.query(models.User).filter(models.User.email == email)
    return response.first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = user_models.get_password_hash(
        user.password, user_models.pwd_context
    )
    db_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        disabled=user.disabled
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user: schemas.User):
    db.delete(user)
    db.commit()


# def get_bookmarks(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.Bookmark).offset(skip).limit(limit).all()


# def get_bookmarks_by_username(db: Session, username: str):
#     response = db.query(models.Bookmark)
#     return response.filter(models.Bookmark.username == username).all()


# def get_bookmarks_by_date_range(
#     db: Session, username: str, init_date: datetime, final_date: datetime
# ):
#     response = db.query(models.Bookmark)
#     return response.filter(models.Bookmark.username == username).all()


# def create_user_bookmark(
#     db: Session, bookmark: schemas.BookmarkCreate, username: str
# ):
#     db_bookmark = models.Bookmark(**bookmark.dict(), username=username)
#     db.add(db_bookmark)
#     db.commit()
#     db.refresh(db_bookmark)
#     return db_bookmark
