from utils import constants
from model.page_categorizer import PageCategorizer
from model.scrap_tool import ScrapTool


class Model:
    def __init__(self) -> None:
        self.categorizer = PageCategorizer(
            constants.ModelsPath.MODEL, constants.ModelsPath.VECTORIZER
        )
        self.scrap_tool = ScrapTool()

    def predict(self, url: str) -> dict:
        web_content = self.scrap_tool.get_web_content(url)
        prediction = self.categorizer.predict([web_content["text"]])

        del web_content["text"]

        return {
            **web_content,
            "category": prediction,
            "words": self.categorizer.important_words,
        }
