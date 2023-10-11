import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlapp import models
from sqlapp.database import engine

from routers.bookmarks_controller import router as bookmarks_router
from routers.github_controller import router as github_router
from routers.users_controller import router as users_router


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


@app.on_event("shutdown")
def shutdown_event():
    print("Shutting down the application...")


app.include_router(github_router, tags=["github"], prefix="/github")
app.include_router(users_router, tags=["users"], prefix="/users")
app.include_router(bookmarks_router, tags=["bookmarks"], prefix="/bookmarks")


@app.get("/hi")
def hi():
    return {"message": "Hello World from the API"}
