from datetime import datetime, date
import streamlit as st
import streamlit_authenticator as stauth
from logup import sign_up
import os
import requests
import json


st.set_page_config(
    page_title="RAC LinkScribe",
    page_icon="LogoRACA.ico",
    layout="centered",
    initial_sidebar_state="auto",
)

with open("styles.css") as f:
    st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)


API_URL = os.environ.get("API_ENDPOINT", "http://127.0.0.1:8000")


def show_bookmarks_list(bookmarks: list[dict]):
    for bookmark in bookmarks:
        # 2023-10-12T02:17:34.362412
        date = datetime.strptime(bookmark["created_at"],
                                 "%Y-%m-%dT%H:%M:%S.%f")
        colf1, colf2 = st.columns([5, 4])

        colf1.image(bookmark["image"])
        with colf2.container():
            st.markdown(f'<h5 class="title">'
                        f'{bookmark["web_title"]}</h5>',
                        unsafe_allow_html=True)
            st.markdown(f'<a class="url" href="{bookmark["url"]}">'
                        f'Open website</a>',
                        unsafe_allow_html=True)
            st.markdown(f'<p class="category"><b>Category: </b>'
                        f'{bookmark["category"]}</p>',
                        unsafe_allow_html=True)
            st.markdown(f'<p class="category"><b>Created at: </b>'
                        f'{date.strftime("%d/%m/%Y, %H:%M")}</p>',
                        unsafe_allow_html=True)


def show_bookmarks_date(bookmarks, date_range):
    for bookmark in bookmarks:
        date = datetime.strptime(bookmark["created_at"],
                                 "%Y-%m-%dT%H:%M:%S.%f")
        try:
            if date.date() >= date_range[0] and date.date() <= date_range[1]:
                show_bookmarks_list([bookmark])
        except IndexError:
            pass


def make_multiselect_box(bookmarks):
    categories = [bookmark["category"] for bookmark in bookmarks]
    unique_categories = list(set(categories))
    options = st.multiselect('Select some categories',
                             unique_categories)

    for bookmark in bookmarks:
        if bookmark["category"] in options:
            show_bookmarks_list([bookmark])


def predict(url):
    data = {"url": url}
    request_data_json = json.dumps(data)
    headers = {
        'Content-Type': 'application/json'
    }
    predict_method_endpoint = f"{API_URL}/bookmarks/predict"
    response = requests.request(
        "POST", predict_method_endpoint,
        headers=headers, data=request_data_json
    )
    response_json = response.json()
    return response_json


def get_users_with_passwords():
    headers = {
        'Content-Type': 'application/json'
    }
    get_users_with_passwords_endpoint = f"{API_URL}/users/passwords/"
    # try:
    response = requests.request(
        "GET", get_users_with_passwords_endpoint,
        headers=headers
    )
    response_json = response.json()
    if response.status_code != 200:
        error_detail = response.json().get("detail")
        st.error(error_detail, icon="🚨")
        return None
    else:
        names = [item["name"] for item in response_json]
        usernames = [item["username"] for item in response_json]
        passwords = [item["password"] for item in response_json]
        return names, usernames, passwords


def create_bookmark(web_info: dict):
    data = {
        "web_title": web_info["name"],
        "url": web_info["url"],
        "category": web_info["category"],
        "words": web_info["words"],
        "image": web_info["image"]
    }
    request_data_json = json.dumps(data)
    headers = {
        'Content-Type': 'application/json'
    }
    create_bookmark_endpoint = (f"{API_URL}/bookmarks/"
                                f"{st.session_state['username']}")
    response = requests.request(
        "POST", create_bookmark_endpoint,
        headers=headers, data=request_data_json
    )
    if response.status_code != 200:
        error_detail = response.json().get("detail")
        st.error(error_detail, icon="🚨")
    else:
        st.success("Bookmark added!", icon="✅")


def get_bookmarks_by_username():
    headers = {
        'Content-Type': 'application/json'
    }
    get_bookmarks_endpoint = (f"{API_URL}/bookmarks/"
                              f"{st.session_state['username']}")

    response = requests.request(
        "GET", get_bookmarks_endpoint,
        headers=headers
    )
    response_json = response.json()
    if response.status_code != 200:
        error_detail = response.json().get("detail")
        st.error(error_detail, icon="🚨")
        return None
    else:
        return response_json


names, usernames, hashed_passwords = get_users_with_passwords()


authenticator = stauth.Authenticate(
    names,
    usernames,
    hashed_passwords,
    "sales_dashboard",
    "fgyuh",
    cookie_expiry_days=1,
)

name, authentication_status, username = authenticator.login(
    ":green[Sign In]", "main"
)

if authentication_status is False:
    st.error("Incorrect username or password")

if authentication_status is None:
    st.warning("Please enter your username and password")


if not authentication_status:
    sign = st.sidebar.radio("Not registered yet?", ["Login", "Sing Up"])
    if sign == "Sing Up":
        sign_up()

if authentication_status:
    # Pagina de inicio
    def home():
        logo_path = "RACpeqA.png"
        # logo_path = "RACsinfondo.jpg"
        # logo_path = "LogoRac.jpg"
        # logo_path = "OIG.M.jpg"

        col1, col2 = st.columns([0.1, 0.2], gap="small")

        with col1:
            st.image(logo_path, use_column_width=False)

        with col2:
            st.markdown(
                '<h1 class="title">LinkScribe</h1>', unsafe_allow_html=True
            )

        # st.title("Clasificador de Links Web")
        st.sidebar.header(f"Welcome {username}")
        st.sidebar.title("Menu")
        page = st.sidebar.radio(
            "Select page:", ["Extract Links", "List of Links"]
        )

        if page == "Extract Links":
            extract_features()

        elif page == "List of Links":
            show_links()
        authenticator.logout(":green[Logout]", "sidebar")

    def extract_features():
        link = st.text_input("Enter link:")

        green_button = '<button class="button-primary">Process :bulb:</button>'

        predict_button = st.markdown(green_button, unsafe_allow_html=True)
        if predict_button:
            user_input_link = link

            if user_input_link:
                with st.spinner('Processing...'):
                    prediction = predict(user_input_link)
                    col1, col2 = st.columns([3, 1])

                    col1.image(prediction["image"])
                    col2.markdown(f'<h5 class="title">'
                                  f'{prediction["name"]}</h5>',
                                  unsafe_allow_html=True)
                    col2.markdown(f'<p class="category"><b>Category: </b>'
                                  f'{prediction["category"]}</p>',
                                  unsafe_allow_html=True)

                boton = st.button("Save to Lists", key="Noregister")
                if boton:
                    create_bookmark(prediction)

            else:
                st.warning("Enter a Link")

        # la lgica de extraccin de caractersticas

    # Pigina para mostrar la lista de links con filtros
    def show_links():
        # estilo al selectbox al hacer clic
        st.markdown(
            "<style>.st-ef .st-e6.st-e7 .st-bm { background-color: "
            "#005500; color: white; }</style>",
            unsafe_allow_html=True,
        )

        filter_option = st.selectbox(
            "Filter by:", ["-Select-", "Category", "Entry date"]
        )
        # lgica de mostrar la lista de links y aplicar filtros
        if filter_option == "Category":
            bookmarks = get_bookmarks_by_username()
            make_multiselect_box(bookmarks)
            
        elif filter_option == "Entry date":
            today = datetime.now()
            next_year = today.year
            jan_1 = date(next_year, 1, 1)
            dec_31 = date(next_year, 12, 31)

            date_range = st.date_input(
                "Select a date range",
                (today.date(), today.date()),
                jan_1,
                dec_31,
                format="MM.DD.YYYY",
            )
            # st.write(date_range[0])
            bookmarks = get_bookmarks_by_username()
            show_bookmarks_date(bookmarks, date_range)

        else:
            bookmarks = get_bookmarks_by_username()
            show_bookmarks_list(bookmarks)


    if __name__ == "__main__":
        home()
