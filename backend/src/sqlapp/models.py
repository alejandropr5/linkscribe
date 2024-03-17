from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship

from sqlapp.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(40), nullable=False)
    email = Column(String(50), nullable=False, unique=True)
    password = Column(String(60), nullable=False)
    disabled = Column(Boolean, default=False)


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(40), nullable=False)
    father_id = Column(Integer, ForeignKey("categories.id"))
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    bookmarks = relationship("Bookmark", back_populates="category")


class Bookmark(Base):
    __tablename__ = "bookmarks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(400), nullable=False)
    url = Column(String(500), nullable=False)
    image = Column(String(800), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)

    created_at = Column(TIMESTAMP, server_default="")

    words = relationship("Word", back_populates="bookmark")
    category = relationship("Category", back_populates="bookmarks")


class Word(Base):
    __tablename__ = "words"

    id = Column(Integer, primary_key=True, index=True)
    word = Column(String(60), nullable=False)
    bookmark_id = Column(Integer, ForeignKey("bookmarks.id"), nullable=False)

    bookmark = relationship("Bookmark", back_populates="words")
