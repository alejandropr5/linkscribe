from typing import Annotated
from pydantic import BaseModel
from datetime import datetime
from fastapi import HTTPException, Request, Body
from sqlalchemy.orm import Session

from sqlapp import crud
from utils import constants


class PredictRequestBody(BaseModel):
    url: Annotated[
        str,
        Body(
            title="Website URL",
            description="The URL of the website to visit.",
            pattern=constants.URL_REGEX,
        ),
    ] = "https://www.example.com"


class PredictResponseBody(BaseModel):
    url: str
    name: str
    image: str
    category: str
    words: list[str]


class DateRange(BaseModel):
    username: str
    init_date: datetime
    final_date: datetime


async def get_model(request: Request):
    return request.app.state.model


async def get_scrap_tool(request: Request):
    return request.app.state.scrap_tool


async def get_user_bookmark(db: Session, user_id: int, bookmark_id: int):
    bookmark = crud.get_user_bookmark_by_id(
        db, user_id=user_id, bookmark_id=bookmark_id
    )
    if bookmark is None:
        raise HTTPException(
            status_code=400, detail="Bookmark id not in user bookmarks."
        )
    return bookmark
