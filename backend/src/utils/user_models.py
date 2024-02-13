from fastapi import Cookie
from typing import Annotated, Optional
from sqlapp.database import SessionLocal


CookieParam = Annotated[Optional[str], Cookie()]


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
