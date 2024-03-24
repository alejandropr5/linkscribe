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
        self.feature_names = self.vectorizer.get_feature_names_out()
        self.important_words = []

    @staticmethod
    def __load_sklearn_model(path: Union[str, Path]):
        with open(path, "rb") as file:
            return pickle.load(file)

    @staticmethod
    def __load_tfidf_vectorizer(path: Union[str, Path]):
        with open(path, "rb") as file:
            return pickle.load(file)

    @staticmethod
    def __word_list_split(word_list: list[str]) -> list[str]:
        result = []

        for word in word_list:
            words = word.split()
            result.extend(filter(lambda x: x not in result, words))

        return result

    def __get_important_words(
        self, vectors, max_rate: float = 0.5
    ) -> list[str]:
        vectors_array = vectors.toarray()
        min_value = vectors_array.max() * max_rate

        words_index = vectors_array >= min_value
        words = self.feature_names[words_index.squeeze()]

        return self.__word_list_split(list(words))

    def predict(self, texts: list[str]) -> str:
        """Predicts the category of a given text extracted from a web
        page.

        Args:
            texts (str): The list of texts to be categorized.

        Returns:
            str: The predicted category of the text.
        """
        tfidf_vectors = self.vectorizer.transform(texts)
        prediction = self.model.predict(tfidf_vectors)

        self.important_words = self.__get_important_words(tfidf_vectors)

        return str(PageCategorizer.CLASSES[prediction[0]])
