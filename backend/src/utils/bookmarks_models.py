from typing import Annotated
from pydantic import BaseModel
from datetime import datetime
from fastapi import Request, Body

from sqlapp.database import SessionLocal
from utils import constants


class PredictRequestBody(BaseModel):
    url: Annotated[str, Body(
        title="Website URL",
        description="The URL of the website to visit.",
        pattern=constants.URL_REGEX
    )] = "https://www.example.com"


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


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_categorizer(request: Request):
    return request.app.state.categorizer


async def get_scrap_tool(request: Request):
    return request.app.state.scrap_tool
