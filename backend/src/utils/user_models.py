from pydantic import BaseModel
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from typing import Annotated, Optional
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
from fastapi import Cookie, Depends, HTTPException, status

from sqlapp import models, crud, database
from utils.constants import AuthConstants

CookieParam = Annotated[Optional[str], Cookie()]


class AuthUser(BaseModel):
    name: str
    email: str
    access_token: str
    token_type: str


class AvailableResponse(BaseModel):
    is_available: bool


class TokenData(BaseModel):
    username: str | None = None


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password, pwd_context):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password, pwd_context):
    return pwd_context.hash(password)


def authenticate_user(db, email: str, password: str, pwd_context):
    user = crud.get_user_by_email(db, email=email)
    if not user:
        return False
    if not verify_password(password, user.password, pwd_context):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, AuthConstants.SECRET_KEY, algorithm=AuthConstants.ALGORITHM
    )
    return encoded_jwt


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: Session = Depends(database.get_db),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token,
            AuthConstants.SECRET_KEY,
            algorithms=[AuthConstants.ALGORITHM],
        )
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_email(db, email=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[models.User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
