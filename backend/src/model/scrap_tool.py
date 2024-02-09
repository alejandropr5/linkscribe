import re
from bs4 import BeautifulSoup
from typing import Union
import bs4 as bs4
import requests
import spacy
from urllib.parse import urlparse
import requests


class ScrapTool:
    """Create a ScrapTool object."""

    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")

    @staticmethod
    def __get_title(html) -> str:
        title = ""
        if html.title:
            title = html.title.string
        elif title_tag := html.find("meta", property="og:title"):
            title = title_tag.get("content")
        elif title_tag := html.find("meta", property="twitter:title"):
            title = title_tag.get("content")
        elif title_tag := html.find("h1"):
            title = title_tag.string
        return title

    @staticmethod
    def __get_html_title_tag(soup) -> str:
        title_contents = ""
        if soup.title:
            title_contents = " ".join(soup.title.contents)

        return title_contents

    @staticmethod
    def __get_html_meta_tags(soup) -> str:
        tags = soup.find_all(
            lambda tag: (tag.name == "meta")
            & (tag.has_attr("name") & (tag.has_attr("content")))
        )
        content = [
            str(tag["content"])
            for tag in tags
            if tag["name"] in ["keywords", "description"]
        ]
        return " ".join(content)

    @staticmethod
    def __get_html_heading_tags(soup) -> str:
        tags = soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6"])
        content = [" ".join(tag.stripped_strings) for tag in tags]
        return " ".join(content)

    @staticmethod
    def __get_text_content(soup) -> str:
        tags_to_ignore = [
            "style",
            "script",
            "head",
            "title",
            "meta",
            "[document]",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "noscript",
        ]
        tags = soup.find_all(string=True)
        result = []
        for tag in tags:
            stripped_tag = tag.strip()
            if (
                tag.parent.name not in tags_to_ignore
                and not isinstance(tag, bs4.element.Comment)
                and not stripped_tag.isnumeric()
                and len(stripped_tag) > 0
            ):
                result.append(stripped_tag)
        return " ".join(result)

    @staticmethod
    def __remove_duplicate_words(text) -> str:
        words = text.split()
        unique_words = set(words)

        return " ".join(unique_words)

    @staticmethod
    def __validate_url(url: any) -> str:
        try:
            requests.get(url)
        except requests.exceptions.MissingSchema:
            return ""
        else:
            return url

    def __get_image_url(self, html) -> str:
        image_url = ""
        if img := html.find("meta", property="image"):
            image_url = self.__validate_url(img.get("content"))
        elif img := html.find("meta", property="og:image"):
            image_url = self.__validate_url(img.get("content"))
        elif img := html.find("meta", property="twitter:image"):
            image_url = self.__validate_url(img.get("content"))
        elif img := html.find("img", src=True):
            image_url = self.__validate_url(img.get("src"))
        elif img := html.find("link", rel="shortcut icon"):
            image_url = self.__validate_url(img.get("href"))
        elif img := html.find("link", rel="icon"):
            image_url = self.__validate_url(img.get("href"))

        return image_url

    def visit_url(self, website_url) -> dict[str, str]:
        """Visits a given website URL and extracts relevant content.

        Args:
            website_url (str): The URL of the website to visit.

        Returns:
            dict[str, str]: A dictionary containing extracted content.
        """
        content = requests.get(website_url, timeout=60).content
        soup = BeautifulSoup(content, "lxml")
        result = {
            "url": website_url,
            "name": self.__get_title(soup),
            "image": self.__get_image_url(soup),
            "text": self.__get_html_title_tag(soup)
            + self.__get_html_meta_tags(soup)
            + self.__get_html_heading_tags(soup)
            + self.__get_text_content(soup),
        }
        return result

    def clean_text(self, text: str) -> str:
        """Cleans the text by removing stop words, punctuation, and
        non-alphanumeric characters, and lemmatizing the remaining
        words.

        Args:
            text (str): The text to be cleaned.

        Returns:
            str: The cleaned text.
        """
        doc = self.nlp(text)
        tokens = []
        exclusion_list = ["nan"]
        token_str = ""
        for token in doc:
            if (
                token.is_stop
                or token.is_punct
                or token.text.isnumeric()
                or not token.text.isalnum()
                or token.text in exclusion_list
            ):
                continue
            token_str = str(token.lemma_.lower().strip())
            tokens.append(token_str)
        return " ".join(tokens)

    def get_web_content(self, website_url: str) -> dict[str, str]:
        """Retrieves and cleans the content of a given website URL.

        Args:
            website_url (str): The URL of the website to retrieve
                content from.

        Returns:
            dict[str, str]: A dictionary containing cleaned web content.
        """
        web = self.visit_url(website_url)

        web["text"] = self.clean_text(web["text"])
        web["words"] = self.__remove_duplicate_words(web["text"])

        return web
