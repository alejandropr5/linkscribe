import spacy.cli


def _download_en_core_web_sm():
    spacy.cli.download("en_core_web_sm")


if __name__ == "__main__":
    _download_en_core_web_sm()
