from typing import Union
from pathlib import Path
import pickle


class PageCategorizer:
    """Create a PageCategorizer object."""
    CLASSES: list[str] = [
        "Travel",
        "Social Networking and Messaging",
        "News",
        "Streaming Services",
        "Sports",
        "Photography",
        "Law and Government",
        "Health and Fitness",
        "Games",
        "E-Commerce",
        "Forums",
        "Food",
        "Education",
        "Computers and Technology",
        "Business/Corporate",
        "Adult",
    ]

    def __init__(
        self,
        model_path: Union[str, Path],
        vectorizer_path: Union[str, Path],
    ):
        """Create a PageCategorizer object.

        Args:
            model_path (str | Path): The path to the saved sklearn model
                file (pickle).
            vectorizer_path (str | Path): The path to the saved TF-IDF
                vectorizer file (pickle).
        """
        self.model = self.__load_sklearn_model(model_path)
        self.vectorizer = self.__load_tfidf_vectorizer(vectorizer_path)

    def __load_sklearn_model(self, path: Union[str, Path]):
        with open(path, "rb") as file:
            return pickle.load(file)

    def __load_tfidf_vectorizer(self, path: Union[str, Path]):
        with open(path, "rb") as file:
            return pickle.load(file)

    def predict(self, texts: list[str]) -> str:
        """Predicts the category of a given text extracted from a web
        page.

        Args:
            texts (str): The list of texts to be categorized.

        Returns:
            str: The predicted category of the text.
        """
        tfidf_vectors = self.vectorizer.transform(texts)

        print(f"{tfidf_vectors.toarray()}")
        print(f"{self.vectorizer.get_feature_names_out()}")

        prediction = self.model.predict(tfidf_vectors)

        return str(PageCategorizer.CLASSES[prediction[0]])
