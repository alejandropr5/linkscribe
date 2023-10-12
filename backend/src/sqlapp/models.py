from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    name = Column(String)

    bookmarks = relationship("Bookmark", back_populates="user")


class Bookmark(Base):
    __tablename__ = "bookmarks"

    id = Column(Integer, primary_key=True, index=True)
    web_title = Column(String)
    url = Column(String)
    category = Column(String)
    words = Column(String)
    image = Column(String)
    username = Column(String, ForeignKey("users.username"))

    user = relationship("User", back_populates="bookmarks")
