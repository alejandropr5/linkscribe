from pathlib import Path
import pickle
import logging

logging.basicConfig(level=logging.DEBUG,
                    format="%(levelname)s:\t%(message)s")


class ModelLoader:
    CLASSES = ['Travel', 'Social Networking and Messaging', 'News',
               'Streaming Services', 'Sports', 'Photography',
               'Law and Government', 'Health and Fitness', 'Games',
               'E-Commerce', 'Forums', 'Food', 'Education',
               'Computers and Technology', 'Business/Corporate', 'Adult']

    def __init__(self,
                 model_path: str | Path = "models/modelweb.pkl",
                 vectorizer_path: str | Path = "models/tfidf_vectorizer.pkl"):
        self.model = self.__load_sklearn_model(model_path)
        self.vectorizer = self.__load_tfidf_vectorizer(vectorizer_path)

    def __load_sklearn_model(self, path: str | Path):
        with open(path, "rb") as file:
            return pickle.load(file)

    def __load_tfidf_vectorizer(self, path: str | Path):
        with open(path, "rb") as file:
            return pickle.load(file)

    def predict(self, text: str):
        tfidf_vectors = self.vectorizer.transform(text)
        prediction = self.model.predict(tfidf_vectors)
        prediction_prob = self.model.predict_proba(tfidf_vectors)
        for idx, item in enumerate(prediction_prob[0]):
            logging.info(f"{ModelLoader.CLASSES[idx]}: {item}")
        return ModelLoader.CLASSES[prediction[0]]
