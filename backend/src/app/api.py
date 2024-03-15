from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from sqlapp import database
from utils import constants
from sqlapp.database import engine
from app.bookmark_controller import router as bookmark_router
from app.user_controller import router as users_router
from app.category_controller import router as category_router
from model.model import Model


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model = Model()
    yield

    # Clean up the models and release the resources
    del app.state.model


app = FastAPI(lifespan=lifespan)
database.Base.metadata.create_all(bind=engine)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[constants.HOMEPAGE_URL],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


app.include_router(users_router, tags=["users"], prefix="/users")
app.include_router(bookmark_router, tags=["bookmark"], prefix="/bookmark")
app.include_router(category_router, tags=["category"], prefix="/category")
