from bs4 import BeautifulSoup
import bs4 as bs4
import requests
import spacy
import logging

logging.basicConfig(level=logging.DEBUG, format="%(levelname)s:\t%(message)s")


class ScrapTool:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")

    def visit_url(self, website_url):
        content = requests.get(website_url, timeout=60).content
        soup = BeautifulSoup(content, "lxml")
        result = {
            "url": website_url,
            "name": self.get_title(soup),
            "image": self.get_image(soup),
            "text": self.get_html_title_tag(soup)
            + self.get_html_meta_tags(soup)
            + self.get_html_heading_tags(soup)
            + self.get_text_content(soup),
        }
        return result

    def get_title(self, html):
        title = None
        if html.title.string:
            title = html.title.string
        elif html.find("meta", property="og:title"):
            title = html.find("meta", property="og:title").get("content")
        elif html.find("meta", property="twitter:title"):
            title = html.find("meta", property="twitter:title").get("content")
        elif html.find("h1"):
            title = html.find("h1").string
        return title

    def get_image(self, html):
        image = None
        if html.find("meta", property="image"):
            image = html.find("meta", property="image").get("content")
        elif html.find("meta", property="og:image"):
            image = html.find("meta", property="og:image").get("content")
        elif html.find("meta", property="twitter:image"):
            image = html.find("meta", property="twitter:image").get("content")
        elif html.find("img", src=True):
            image = html.find_all("img").get("src")
        return image

    def get_html_title_tag(self, soup):
        return ". ".join(soup.title.contents)

    def get_html_meta_tags(self, soup):
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

    def get_html_heading_tags(self, soup):
        tags = soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6"])
        content = [" ".join(tag.stripped_strings) for tag in tags]
        return " ".join(content)

    def get_text_content(self, soup):
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

    def clean_text(self, text: str):
        doc = self.nlp(text)
        tokens = []
        exclusion_list = ["nan"]
        for token in doc:
            if (
                token.is_stop
                or token.is_punct
                or token.text.isnumeric()
                or not token.text.isalnum()
                or token.text in exclusion_list
            ):
                continue
            token = str(token.lemma_.lower().strip())
            tokens.append(token)
        return " ".join(tokens)

    def remove_duplicate_words(self, text):
        words = text.split()
        unique_words = set(words)
        text_without_duplicates = " ".join(unique_words)

        return text_without_duplicates

    def get_web_content(self, website_url: str):
        web = self.visit_url(website_url)
        logging.info(f"bs4 response: {web}")
        web["text"] = self.clean_text(web["text"])
        web["words"] = self.remove_duplicate_words(web["text"])
        return web
