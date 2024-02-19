from typing import Annotated
from fastapi import Depends, APIRouter

from model.page_categorizer import PageCategorizer
from model.scrap_tool import ScrapTool
from utils import bookmark_models as models


router = APIRouter()


@router.post("/predict")
def predict(
    web: models.PredictRequestBody,
    categorizer: Annotated[PageCategorizer, Depends(models.get_categorizer)],
    scrap: Annotated[ScrapTool, Depends(models.get_scrap_tool)]
):
    web_content = scrap.get_web_content(web.url)
    prediction = categorizer.predict([web_content["text"]])

    del web_content["text"]

    return models.PredictResponseBody(
        **web_content,
        category=prediction,
        words=categorizer.important_words
    )

# @router.post("/{username}", response_model=schemas.Bookmark)
# def create_bookmark_for_user(
#     username: str,
#     bookmark: schemas.BookmarkCreate,
#     db: Session = Depends(get_db),
# ):
#     return crud.create_user_bookmark(
#         db=db, bookmark=bookmark, username=username
#     )

# @router.get("/", response_model=list[schemas.Bookmark])
# def read_bookmarks(
#     skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
# ):
#     items = crud.get_bookmarks(db, skip=skip, limit=limit)
#     return items

# @router.get("/{username}", response_model=list[schemas.Bookmark])
# def get_bookmarks_by_username(
#     username: str, db: Session = Depends(get_db)
# ):
#     items = crud.get_bookmarks_by_username(db, username=username)
#     return items
