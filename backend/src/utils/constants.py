import os
from dotenv import load_dotenv
from importlib import resources


load_dotenv()


HOMEPAGE_URL = os.environ.get("HOMEPAGE_URL", "http://localhost:3000")
URL_REGEX = "^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$"
EMAIL_REGEX = "^([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+$"


class ModelsPath:
    __ML_MODELS = f"{resources.files('ml_models')}"
    MODEL = os.path.join(__ML_MODELS, "modeloweb.pkl")
    VECTORIZER = os.path.join(__ML_MODELS, "tfidf_vectorizer.pkl")


class AuthConstants:
    SECRET_KEY = os.environ.get("SECRET_KEY")
    ALGORITHM = os.environ.get("ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get(
        "ACCESS_TOKEN_EXPIRE_MINUTES",
        30
    ))


class DBConstants:
    DATABASE_URL = os.environ.get(
        "DATABASE_URL",
        "postgresql://postgres:991005@127.0.0.1:5434/linkscribe",
    )
