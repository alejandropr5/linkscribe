from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from fastapi import Depends, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime

from src.sqlapp import crud, schemas
from src.sqlapp.database import SessionLocal
from src.model.model_loader import ModelLoader
from src.model.scrap import ScrapTool


class PredictBody(BaseModel):
    url: str


class DateRange(BaseModel):
    username: str
    init_date: datetime
    final_date: datetime


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
        web_content = self.scrap.get_web_content(web.url)
        prediction = self.model.predict([web_content["text"]])
        web_content["category"] = prediction
        del web_content["text"]
        return web_content

    @router.post("/{username}", response_model=schemas.Bookmark)
    def create_bookmark_for_user(self,
                                 username: str,
                                 bookmark: schemas.BookmarkCreate,
                                 db: Session = Depends(get_db)):
        return crud.create_user_bookmark(db=db,
                                         bookmark=bookmark,
                                         username=username)

    @router.get("/", response_model=list[schemas.Bookmark])
    def read_bookmarks(self,
                       skip: int = 0,
                       limit: int = 100,
                       db: Session = Depends(get_db)):
        items = crud.get_bookmarks(db, skip=skip, limit=limit)
        return items

    @router.get("/{username}", response_model=list[schemas.Bookmark])
    def get_bookmarks_by_username(self,
                                  username: str,
                                  db: Session = Depends(get_db)):
        items = crud.get_bookmarks_by_username(db, username=username)
        return items
