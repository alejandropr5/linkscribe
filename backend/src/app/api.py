import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.sqlapp import models
from src.sqlapp.database import engine

from routers.bookmarks_controller import router as bookmarks_router
from routers.users_controller import router as users_router
from src.model.model_loader import ModelLoader
from src.model.scrap import ScrapTool


HOMEPAGE_URL = os.environ.get("HOMEPAGE_URL", "http://127.0.0.1:3000")

app = FastAPI()
models.Base.metadata.create_all(bind=engine)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[HOMEPAGE_URL],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


class ModelsPath:
    MODEL = "src/model/models/modeloweb.pkl"
    VECTORIZER = "src/model/models/tfidf_vectorizer.pkl"


@app.on_event("startup")
def load_model():
    print("Starting up the application...")
    model = ModelLoader(ModelsPath.MODEL, ModelsPath.VECTORIZER)
    scrap = ScrapTool()
    print("Model loaded successfully!")
    app.state.model = model
    app.state.scrap = scrap


@app.on_event("shutdown")
def shutdown_event():
    print("Shutting down the application...")


app.include_router(users_router, tags=["users"], prefix="/users")
app.include_router(bookmarks_router, tags=["bookmarks"], prefix="/bookmarks")


@app.get("/hi")
def hi():
    return {"message": "Hello World from the API"}
