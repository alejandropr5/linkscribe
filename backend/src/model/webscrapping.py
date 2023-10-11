from bs4 import BeautifulSoup
import requests


def get_text(url: str):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        texts_list = []
        for element in soup.find_all(text=True):
            texts_list.append(element.get_text())
        
        text = " ".join(texts_list)

        prediction = model.predict(text)

        return prediction
    else:
        return ("Failed to retrieve the web page. "
                f"Status code: {response.status_code}")
