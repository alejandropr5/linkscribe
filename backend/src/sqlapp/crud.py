from sqlalchemy.orm import Session
from datetime import datetime

from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    response = db.query(models.User).filter(models.User.username == username)
    return response.first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    # fake_hashed_password = user.password
    db_user = models.User(username=user.username,
                          password=user.password,
                          name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_bookmarks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Bookmark).offset(skip).limit(limit).all()


def get_bookmarks_by_username(db: Session, username: str):
    response = db.query(models.Bookmark)
    return response.filter(models.Bookmark.username == username).all()


def get_bookmarks_by_date_range(db: Session,
                                username: str,
                                init_date: datetime,
                                final_date: datetime):
    response = db.query(models.Bookmark)
    return response.filter(models.Bookmark.username == username).all()


def create_user_bookmark(
        db: Session, bookmark: schemas.BookmarkCreate, username: str
):
    db_bookmark = models.Bookmark(**bookmark.dict(), username=username)
    db.add(db_bookmark)
    db.commit()
    db.refresh(db_bookmark)
    return db_bookmark
