from typing import Annotated
from fastapi import Depends, APIRouter, Query
from sqlalchemy.orm import Session

from model.model import Model
from sqlapp import crud, database, schemas
from utils import bookmark_models, category_models, user_models


router = APIRouter()


@router.post("/predict")
async def predict(
    web: bookmark_models.PredictRequestBody,
    model: Annotated[Model, Depends(bookmark_models.get_model)],
):
    prediction = model.predict(web.url)

    return bookmark_models.PredictResponseBody(**prediction)


@router.post("/{category_id}")
async def create_user_bookmark(
    category_id: int,
    bookmark: schemas.BookmarkCreate,
    current_user: Annotated[
        schemas.User, Depends(user_models.get_current_active_user)
    ],
    db: Session = Depends(database.get_db),
):
    category_models.get_user_category(
        db, user_id=current_user.id, category_id=category_id
    )

    db_category = crud.create_user_bookmark(
        db, user_id=current_user.id, category_id=category_id, bookmark=bookmark
    )

    return db_category


@router.get("/")
async def read_user_bookmarks(
    current_user: Annotated[
        schemas.User, Depends(user_models.get_current_active_user)
    ],
    search: Annotated[str | None, Query()] = None,
    cat: Annotated[list[int] | None, Query()] = None,
    skip: Annotated[int, Query()] = 0,
    limit: Annotated[int, Query()] = 100,
    db: Session = Depends(database.get_db),
):
    print(f"{search=}")
    print(f"{cat=}")
    bookmarks = crud.get_user_bookmarks(
        db,
        user_id=current_user.id,
        categories_id=cat,
        search_text=search,
        skip=skip,
        limit=limit,
    )

    return bookmarks


@router.put("/")
async def update_user_bookmark(
    bookmark_id: int,
    bookmark_update: schemas.BookmarkCreate,
    current_user: Annotated[
        schemas.User, Depends(user_models.get_current_active_user)
    ],
    db: Session = Depends(database.get_db),
):
    old_bookmark = bookmark_models.get_user_bookmark(
        db, user_id=current_user.id, bookmark_id=bookmark_id
    )

    updated_bookmark = crud.update_bookmark(
        db,
        user_id=current_user.id,
        bookmark_id=bookmark_id,
        new_bookmark=bookmark_update,
        category_id=1
    )

    return updated_bookmark
