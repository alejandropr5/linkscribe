from sqlalchemy.orm import Session
import sqlalchemy
# from datetime import datetime

from sqlapp import models, schemas
from utils import user_models


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    response = db.query(models.User).filter(models.User.email == email)
    return response.first()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = user_models.get_password_hash(
        user.password, user_models.pwd_context
    )
    db_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user: schemas.User):
    db.delete(user)
    db.commit()


def create_user_category(
    db: Session, category: schemas.CategoryCreate, user_id: int
):
    db_category = models.Category(**category.dict(), user_id=user_id)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


def get_user_category_by_id(
    db: Session, user_id: int, category_id: int
):
    response = db.query(models.Category).filter_by(
        id=category_id,
        user_id=user_id
    )
    return response.first()


def delete_category(db: Session, category: schemas.Category):
    db.delete(category)
    db.commit()


def update_category(
    db: Session,
    user_id: id,
    category_id: int,
    new_category: schemas.CategoryCreate
):
    db_category = get_user_category_by_id(db, user_id, category_id)

    db_category.name = new_category.name
    db_category.father_id = new_category.father_id
    db.commit()
    db.refresh(db_category)

    return db_category


def get_user_categories(
    db: Session, user_id: int, skip: int = 0, limit: int = 100
):
    return db.query(models.Category)\
        .filter_by(user_id=user_id).offset(skip).limit(limit).all()


def create_user_bookmark(
    db: Session,
    user_id: int,
    category_id: int,
    bookmark: schemas.BookmarkCreate
):
    db_bookmark = models.Bookmark(
        name=bookmark.name,
        url=bookmark.url,
        image=bookmark.image,
        user_id=user_id
    )
    db.add(db_bookmark)
    db.commit()
    db.refresh(db_bookmark)

    create_category_bookmark(db, category_id, db_bookmark.id)
    create_bookmark_words(db, bookmark.words, db_bookmark.id)

    db.refresh(db_bookmark)

    return db_bookmark


def get_user_bookmarks(
    db: Session,
    user_id: int,
    categories_id: list[int] | None,
    search_text: str | None,
    skip: int = 0,
    limit: int = 100
):
    b = models.Bookmark
    cb = models.CategoryBookmark
    w = models.Word

    query = db.query(b)\
        .join(cb, b.id == cb.bookmark_id)\
        .outerjoin(w, b.id == w.bookmark_id)\
        .filter(b.user_id == user_id)\
        .order_by(b.created_at)

    if categories_id is not None:
        query = query.filter(cb.category_id.in_(categories_id))

    if search_text is not None:
        search_words = search_text.split()
        contain_words = (w.word.ilike(f"%{word}%") for word in search_words)

        query = query.filter(
            b.name.ilike(f"%{search_text}%") | sqlalchemy.or_(*contain_words)
        )

    response = query.offset(skip).limit(limit).distinct().all()

    return response


def create_category_bookmark(
    db: Session, category_id: int, bookmark_id: int
):
    db_category_bookmark = models.CategoryBookmark(
        category_id=category_id,
        bookmark_id=bookmark_id
    )
    db.add(db_category_bookmark)
    db.commit()
    db.refresh(db_category_bookmark)

    return db_category_bookmark


def get_bookmark_words(
    db: Session, bookmark_id: int, skip: int = 0, limit: int = 100
):
    return db.query(models.Word)\
        .filter_by(bookmark_id=bookmark_id).offset(skip).limit(limit).all()


def create_bookmark_words(
    db: Session, words: str, bookmark_id: int
):
    for word in words:
        db_word = models.Word(
            word=word,
            bookmark_id=bookmark_id
        )
        db.add(db_word)

    db.commit()

    return get_bookmark_words(db, bookmark_id)
