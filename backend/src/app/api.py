from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from sqlapp import models
from utils import constants
from sqlapp.database import engine
from app.bookmark_controller import router as bookmark_router
from app.users_controller import router as users_router
from model.model_loader import ModelLoader
from model.scrap import ScrapTool


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model = ModelLoader(
        constants.ModelsPath.MODEL, constants.ModelsPath.VECTORIZER
    )
    app.state.scrap = ScrapTool()
    yield

    # Clean up the models and release the resources
    del app.state.model
    del app.state.scrap


app = FastAPI(lifespan=lifespan)
models.Base.metadata.create_all(bind=engine)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[constants.HOMEPAGE_URL],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


app.include_router(users_router, tags=["users"], prefix="/users")
app.include_router(bookmark_router, tags=["bookmark"], prefix="/bookmark")


@app.get("/")
async def home():
    return {"message": f"{app.state=}"}
