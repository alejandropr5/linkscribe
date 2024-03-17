from datetime import datetime
from typing import Annotated
from fastapi import Body
from pydantic import BaseModel

from utils import constants


# word table
class WordBase(BaseModel):
    word: str


class WordCreate(WordBase):
    pass


class Word(WordBase):
    id: int
    bookmark_id: int


# bookmark table
class BookmarkBase(BaseModel):
    name: str
    url: str
    image: str


class BookmarkCreate(BookmarkBase):
    words: list[str] = []


class BookmarkUpdate(BaseModel):
    name: str | None
    category_id: int | None


class Bookmark(BookmarkBase):
    id: int
    user_id: int
    category_id: int
    created_at: datetime


# user table
class UserBase(BaseModel):
    name: Annotated[str, Body(min_length=1, max_length=40)]
    email: Annotated[
        str, Body(pattern=constants.EMAIL_REGEX)
    ] = "example@mail.com"


class UserCreate(UserBase):
    password: Annotated[str, Body(min_length=6, max_length=50)]


class User(UserBase):
    id: int
    disabled: bool


# categories table
class CategoryBase(BaseModel):
    name: str
    father_id: int | None


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    id: int
    user_id: int
