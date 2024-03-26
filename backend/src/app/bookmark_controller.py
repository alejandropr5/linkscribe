from typing import Annotated
from fastapi import Depends, APIRouter, HTTPException, Query, status
import requests
from sqlalchemy.orm import Session

from model.model import Model
from sqlapp import crud, database, schemas
from utils import bookmark_models, user_models, category_models


router = APIRouter()


@router.post("/predict", response_model=bookmark_models.PredictResponseBody)
async def predict(
    web: bookmark_models.PredictRequestBody,
    model: Annotated[Model, Depends(bookmark_models.get_model)],
):
    try:
        prediction = model.predict(web.url)
    except (
        requests.exceptions.ConnectionError,
        requests.exceptions.MissingSchema,
    ):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The provided URL does not exist or is not accessible.",
        )

    return bookmark_models.PredictResponseBody(**prediction)


@router.get("/")
def read_user_bookmarks(
    current_user: Annotated[
        schemas.User, Depends(user_models.get_current_active_user)
    ],
    search: Annotated[str | None, Query()] = None,
    cat: Annotated[list[int] | None, Query()] = None,
    skip: Annotated[int, Query()] = 0,
    limit: Annotated[int, Query()] = 100,
    db: Session = Depends(database.get_db),
):
    bookmarks = crud.get_user_bookmarks(
        db,
        user_id=current_user.id,
        categories_id=cat,
        search_text=search,
        skip=skip,
        limit=limit,
    )

    return bookmarks


@router.patch("/{bookmark_id}")
def update_user_bookmark(
    bookmark_id: int,
    bookmark_update: schemas.BookmarkUpdate,
    current_user: Annotated[
        schemas.User, Depends(user_models.get_current_active_user)
    ],
    db: Session = Depends(database.get_db),
):
    if bookmark_update.category_id is not None:
        category_models.get_user_category(
            db,
            user_id=current_user.id,
            category_id=bookmark_update.category_id,
        )

    updated_bookmark = crud.update_bookmark(
        db,
        user_id=current_user.id,
        bookmark_id=bookmark_id,
        new_bookmark=bookmark_update,
    )

    if updated_bookmark is None:
        raise HTTPException(
            status_code=400, detail="Bookmark id is not in user bookmarks."
        )

    return updated_bookmark


@router.delete("/{bookmark_id}")
def delete_user_bookmark(
    bookmark_id: int,
    current_user: Annotated[
        schemas.User, Depends(user_models.get_current_active_user)
    ],
    db: Session = Depends(database.get_db),
):
    bookmark = bookmark_models.get_user_bookmark(
        db, user_id=current_user.id, bookmark_id=bookmark_id
    )
    crud.delete_bookmark(db, bookmark)

    return bookmark
