from typing import Annotated
from fastapi import Body
from pydantic import BaseModel

from utils import constants

# class BookmarkBase(BaseModel):
#     web_title: str
#     url: str
#     category: str
#     words: str
#     image: str


# class BookmarkCreate(BookmarkBase):
#     pass


# class Bookmark(BookmarkBase):
#     id: int
#     username: str
#     created_at: datetime

#     class Config:
#         orm_mode = True


class UserBase(BaseModel):
    name: Annotated[str, Body(min_length=1, max_length=40)]
    email: Annotated[str, Body(
        pattern=constants.EMAIL_REGEX
    )] = "example@mail.com"
    disabled: bool = False


class UserCreate(UserBase):
    password: Annotated[str, Body(min_length=6, max_length=50)]


class User(UserBase):
    id: int
    # bookmarks: list[Bookmark] = []

    class Config:
        orm_mode = True
