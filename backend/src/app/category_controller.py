from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, APIRouter

from sqlapp import crud, schemas, database
from utils import category_models, user_models


router = APIRouter()


@router.post("/")
async def create_user_category(
    category: schemas.CategoryCreate,
    current_user: Annotated[
        schemas.User, Depends(user_models.get_current_active_user)
    ],
    db: Session = Depends(database.get_db),
):
    category_models.validate_father_id(
        db, user_id=current_user.id, father_id=category.father_id
    )

    new_category = crud.create_user_category(
        db, category=category, user_id=current_user.id
    )

    return new_category


@router.delete("/{category_id}")
async def delete_user_category(
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


@router.put("/{category_id}")
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

    updated_category = crud.update_category(
        db,
        user_id=current_user.id,
        category_id=category_id,
        new_category=category_update,
    )

    return updated_category


@router.get("/", response_model=list)
def read_user_categories(
    current_user: Annotated[
        schemas.User, Depends(user_models.get_current_active_user)
    ],
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(database.get_db),
):
    categories = crud.get_user_categories(
        db, user_id=current_user.id, skip=skip, limit=limit
    )
    return categories
