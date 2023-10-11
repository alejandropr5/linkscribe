from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from fastapi import Depends, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel

from src.sqlapp import crud, schemas
from src.sqlapp.database import SessionLocal
from src.model.model_loader import ModelLoader
from src.model.scrap import ScrapTool


class PredictBody(BaseModel):
    url: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_model(request: Request):
    return request.app.state.model


async def get_scrap(request: Request):
    return request.app.state.scrap


router = InferringRouter()


@cbv(router)
class BookmarksController:
    model: ModelLoader = Depends(get_model)
    scrap: ScrapTool = Depends(get_scrap)

    @router.post("/predict")
    def predict(self, web: PredictBody):
        clean_text = self.scrap.get_clean_text(web.url)
        prediction = self.model.predict([clean_text])
        return {"prediction": prediction}

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
