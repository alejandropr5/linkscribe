import os
from importlib import resources


HOMEPAGE_URL = os.environ.get("HOMEPAGE_URL", "http://localhost:3000")
URL_REGEX = "^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$"

class ModelsPath:
    __ML_MODELS = f"{resources.files('ml_models')}"
    MODEL = os.path.join(__ML_MODELS, "modeloweb.pkl")
    VECTORIZER = os.path.join(__ML_MODELS, "tfidf_vectorizer.pkl")
