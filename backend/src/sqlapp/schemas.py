from pydantic import BaseModel


class BookmarkBase(BaseModel):
    web_title: str
    url: str
    category: str
    words: str
    image: str


class BookmarkCreate(BookmarkBase):
    pass


class Bookmark(BookmarkBase):
    id: int
    username: str

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str
    name: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    bookmarks: list[Bookmark] = []

    class Config:
        orm_mode = True


class UserPassword(UserCreate):
    id: int

    class Config:
        orm_mode = True
