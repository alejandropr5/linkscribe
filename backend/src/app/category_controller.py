from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, APIRouter

from sqlapp import crud, schemas, database
from utils import category_models, user_models


router = APIRouter()


@router.post("/", response_model=schemas.Category)
def create_user_category(
    category: schemas.CategoryCreate,
    current_user: Annotated[
        schemas.User, Depends(user_models.get_current_active_user)
    ],
    db: Session = Depends(database.get_db),
):
    category_models.validate_father_id(
        db, user_id=current_user.id, father_id=category.father_id
    )

    return crud.create_user_category(
        db, category=category, user_id=current_user.id
    )


@router.delete("/{category_id}", response_model=schemas.Category)
def delete_user_category(
    category_id: int,
    current_user: Annotated[
        schemas.User, Depends(user_models.get_current_active_user)
    ],
    db: Session = Depends(database.get_db),
):
    category = category_models.get_user_category(
        db, user_id=current_user.id, category_id=category_id
    )
    crud.delete_category(db, category)

    return category


@router.patch("/{category_id}", response_model=schemas.Category)
def update_user_category(
    category_id: int,
    category_update: schemas.CategoryCreate,
    current_user: Annotated[
        schemas.User, Depends(user_models.get_current_active_user)
    ],
    db: Session = Depends(database.get_db),
):
    category_models.get_user_category(
        db, user_id=current_user.id, category_id=category_id
    )

    if category_update.father_id is not None:
        category_models.validate_father_id(
            db, user_id=current_user.id, father_id=category_update.father_id
        )

    return crud.update_category(
        db,
        user_id=current_user.id,
        category_id=category_id,
        new_category=category_update,
    )


@router.get("/root", response_model=schemas.Category)
def read_user_root_category(
    current_user: Annotated[
        schemas.User, Depends(user_models.get_current_active_user)
    ],
    db: Session = Depends(database.get_db),
):
    return crud.get_user_category(db, current_user.id)


@router.post("/{category_id}/bookmarks", response_model=schemas.Bookmark)
def create_user_category_bookmark(
    bookmark: schemas.BookmarkCreate,
    category_id: int,
    current_user: Annotated[
        schemas.User, Depends(user_models.get_current_active_user)
    ],
    db: Session = Depends(database.get_db),
):
    category_models.get_user_category(
        db, user_id=current_user.id, category_id=category_id
    )

    db_category = crud.create_user_category_bookmark(
        db, user_id=current_user.id, category_id=category_id, bookmark=bookmark
    )

    return db_category
