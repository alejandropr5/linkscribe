from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from sqlapp import crud, schemas
from sqlapp.database import SessionLocal
from model.webscrapping import get_text


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


router = InferringRouter()


@cbv(router)
class BookmarksController:
    @router.post("/predict")
    def predict(self, url: str):
        response = get_text(url)

        return {"response": response}

    @router.post("/{user_id}", response_model=schemas.Bookmark)
    def create_bookmark_for_user(self,
                                 user_id: int,
                                 bookmark: schemas.BookmarkCreate,
                                 db: Session = Depends(get_db)):
        return crud.create_user_bookmark(db=db,
                                         bookmark=bookmark,
                                         user_id=user_id)

    @router.get("/", response_model=list[schemas.Bookmark])
    def read_bookmarks(self,
                       skip: int = 0,
                       limit: int = 100,
                       db: Session = Depends(get_db)):
        items = crud.get_bookmarks(db, skip=skip, limit=limit)
        return items
