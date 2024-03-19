from sqlalchemy.orm import Session, aliased
from sqlalchemy import or_, func, distinct, exists
# from datetime import datetime

from sqlapp import models, schemas
from utils import user_models


# users


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
        name=user.name, email=user.email, password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    create_user_category(
        db, schemas.CategoryCreate(name="All Bookmarks"), user_id=db_user.id
    )

    return db_user


def delete_user(db: Session, user: schemas.User):
    db.delete(user)
    db.commit()


# categories


def create_user_category(
    db: Session, category: schemas.CategoryCreate, user_id: int
):
    father_id = category.father_id
    if father_id is None:
        root_category = get_user_category(db, user_id=user_id)
        if root_category is not None:
            father_id = root_category.id

    db_category = models.Category(
        name=category.name, father_id=father_id, user_id=user_id
    )
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


def get_user_category(
    db: Session, user_id: int, category_id: int | None = None
):
    query = (
        db.query(models.Category)
        .filter_by(user_id=user_id)
        .order_by(models.Category.id)
    )

    if category_id is not None:
        query = query.filter_by(id=category_id)

    response = query.first()

    return response


def delete_category(db: Session, category: schemas.Category):
    db.delete(category)
    db.commit()


def update_category(
    db: Session,
    user_id: id,
    category_id: int,
    new_category: schemas.CategoryCreate,
):
    db_category = get_user_category(db, user_id, category_id)

    db_category.name = new_category.name
    db_category.father_id = new_category.father_id
    db.commit()
    db.refresh(db_category)

    return db_category


def get_category_children(
    db: Session, user_id: int, category_id: int | None = None
):
    if category_id is None:
        root_category = get_user_category(db, user_id=user_id)
        category_id = root_category.id

    c = aliased(models.Category)
    cc = aliased(models.Category)

    query = (
        db.query(
            cc.id.label("child_id"),
            cc.name.label("child_name"),
            exists()
            .where(cc.id == models.Category.father_id)
            .label("has_children"),
        )
        .join(c, c.id == cc.father_id)
        .filter(c.user_id == user_id, c.id == category_id)
        .order_by(cc.id)
    )

    return query.all()


def create_user_category_bookmark(
    db: Session,
    user_id: int,
    category_id: int,
    bookmark: schemas.BookmarkCreate,
):
    db_bookmark = models.Bookmark(
        name=bookmark.name,
        url=bookmark.url,
        image=bookmark.image,
        user_id=user_id,
        category_id=category_id,
    )
    db.add(db_bookmark)
    db.commit()
    db.refresh(db_bookmark)

    create_bookmark_words(db, bookmark.words, db_bookmark.id)

    db.refresh(db_bookmark)

    return db_bookmark


# bookmarks


def get_user_bookmarks(
    db: Session,
    user_id: int,
    categories_id: list[int] | None,
    search_text: str | None,
    skip: int = 0,
    limit: int = 100,
):
    b = models.Bookmark
    w = models.Word

    query = (
        db.query(b)
        .join(w, b.id == w.bookmark_id)
        .filter(b.user_id == user_id)
        .order_by(b.created_at)
        .group_by(b.id)
    )

    if categories_id is not None:
        query = query.filter(b.category_id.in_(categories_id))

    if search_text is not None:
        search_words = search_text.split()
        contain_words = (w.word.ilike(f"%{word}%") for word in search_words)

        query = query.filter(
            b.name.ilike(f"%{search_text}%") | or_(*contain_words)
        ).having(func.count(distinct(w.word)) == len(search_words))

    response = query.offset(skip).limit(limit).distinct().all()

    return response


def get_user_bookmark_by_id(db: Session, user_id: int, bookmark_id: int):
    response = db.query(models.Bookmark).filter_by(
        id=bookmark_id, user_id=user_id
    )
    return response.first()


def get_bookmark_words(
    db: Session, bookmark_id: int, skip: int = 0, limit: int = 100
):
    return (
        db.query(models.Word)
        .filter_by(bookmark_id=bookmark_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_bookmark_words(db: Session, words: str, bookmark_id: int):
    for word in words:
        db_word = models.Word(word=word, bookmark_id=bookmark_id)
        db.add(db_word)

    db.commit()

    return get_bookmark_words(db, bookmark_id)


def update_bookmark(
    db: Session,
    user_id: id,
    bookmark_id: int,
    new_bookmark: schemas.BookmarkUpdate,
):
    db_bookmark = (
        db.query(models.Bookmark)
        .filter_by(id=bookmark_id, user_id=user_id)
        .first()
    )

    if db_bookmark is not None:
        if new_bookmark.name is not None:
            db_bookmark.name = new_bookmark.name
        db_bookmark.category_id = new_bookmark.category_id

        db.commit()
        db.refresh(db_bookmark)

    return db_bookmark


def delete_bookmark(db: Session, bookmark: schemas.Bookmark):
    db.delete(bookmark)
    db.commit()
