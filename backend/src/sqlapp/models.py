from sqlalchemy import Column, ForeignKey, Integer, String, TIMESTAMP
from sqlalchemy.orm import relationship

from sqlapp.database import Base


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
    web_title = Column(String(400))
    url = Column(String(500))
    category = Column(String(35))
    created_at = Column(TIMESTAMP, server_default="")
    words = Column(String(5000))
    image = Column(String(800))
    username = Column(String, ForeignKey("users.username"))

    user = relationship("User", back_populates="bookmarks")
