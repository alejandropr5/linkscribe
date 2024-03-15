from typing import Annotated
from fastapi import Depends, APIRouter, Query
from sqlalchemy.orm import Session

from model.model import Model
from sqlapp import crud, database, schemas
from utils import bookmark_models as models, category_models, user_models


router = APIRouter()


@router.post("/predict")
def predict(
    web: models.PredictRequestBody,
    model: Annotated[Model, Depends(models.get_model)]
):
    prediction = model.predict(web.url)

    return models.PredictResponseBody(
        **prediction
    )


@router.post("/{category_id}")
def create_user_bookmark(
    category_id: int,
    bookmark: schemas.BookmarkCreate,
    current_user: Annotated[
        schemas.User, Depends(user_models.get_current_active_user)
    ],
    db: Session = Depends(database.get_db)
):
    category_models.get_user_category(
        db, user_id=current_user.id, category_id=category_id
    )

    db_category = crud.create_user_bookmark(
        db, user_id=current_user.id, category_id=category_id, bookmark=bookmark
    )

    return db_category


# , response_model=list[schemas.Bookmark]
@router.get("/")
def read_user_bookmarks(
    current_user: Annotated[
        schemas.User, Depends(user_models.get_current_active_user)
    ],
    q: Annotated[str | None, Query()] = None,
    cat: Annotated[list[int] | None, Query()] = None,
    skip: Annotated[int, Query()] = 0,
    limit: Annotated[int, Query()] = 100,
    db: Session = Depends(database.get_db)
):
    bookmarks = crud.get_user_bookmarks(
        db,
        user_id=current_user.id,
        categories_id=cat,
        words=q,
        skip=skip,
        limit=limit
    )

    return bookmarks
