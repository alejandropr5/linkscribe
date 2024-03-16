from typing import Annotated
from pydantic import BaseModel
from datetime import datetime
from fastapi import Request, Body

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
