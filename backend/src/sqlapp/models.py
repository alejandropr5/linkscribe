from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship

from sqlapp.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    disabled = Column(Boolean, default=False)

    # bookmarks = relationship("Bookmark", back_populates="user")


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(400))
    father_id = Column(Integer)
    user_id = Column(Integer, ForeignKey("users.id"))

    # categories = relationship("Category", back_populates="bookmark")


class Bookmark(Base):
    __tablename__ = "bookmarks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(400))
    url = Column(String(500))
    image = Column(String(800))
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(TIMESTAMP, server_default="")

    words = relationship("Word", back_populates="bookmark")
    # user = relationship("User", back_populates="bookmarks")


class Word(Base):
    __tablename__ = "words"

    id = Column(Integer, primary_key=True, index=True)
    word = Column(String(40))
    bookmark_id = Column(Integer, ForeignKey("bookmarks.id"))

    bookmark = relationship("Bookmark", back_populates="words")


class CategoryBookmark(Base):
    __tablename__ = "category_bookmark"

    category_id = Column(
        Integer, ForeignKey("categories.id"), primary_key=True
    )
    bookmark_id = Column(Integer, ForeignKey("bookmarks.id"), primary_key=True)
