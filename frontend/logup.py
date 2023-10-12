import streamlit as st
import streamlit_authenticator as stauth
import re
import os
import json
import requests
# import logging

# logging.basicConfig(level=logging.DEBUG,
#                     format="%(levelname)s:\t%(message)s")


API_URL = os.environ.get("API_ENDPOINT", "http://127.0.0.1:8000")


def insert_user(name, username, password):
    user = {
        "name": name,
        "username": username,
        "password": password
    }
    request_data_json = json.dumps(user)
    headers = {
        'Content-Type': 'application/json'
    }
    create_user_endpoint = f"{API_URL}/users/"
    response = requests.request(
        "POST", create_user_endpoint,
        headers=headers, data=request_data_json
    )
    if response.status_code != 200:
        error_detail = response.json().get("detail")
        st.error(error_detail, icon="🚨")
    else:
        st.success("Account created successfully!!")
        st.balloons()


def validate_username(username):
    """
    Checks Validity of userName
    :param username:
    :return True if username is valid else False:
    """
    pattern = "^[a-zA-Z0-9]*$"
    if re.match(pattern, username):
        return True
    return False


def validate_name(name):
    """
    Check Name Validity
    :param name:
    :return True if name is valid else False:
    """
    pattern = "^[A-Za-z\s'-]+$"

    if re.match(pattern, name):
        return True
    return False


def sign_up():
    with st.form(key="signup", clear_on_submit=True):
        st.subheader(":green[Sign Up]")
        name = st.text_input(":blue[Name]", placeholder="Enter Your Name")
        username = st.text_input(
            ":blue[Username]", placeholder="Enter Your Username"
        )
        password1 = st.text_input(
            ":blue[Password]",
            placeholder="Enter Your Password",
            type="password",
        )
        password2 = st.text_input(
            ":blue[Confirm Password]",
            placeholder="Confirm Your Password",
            type="password",
        )
        _, _, col, _, _ = st.columns(5)

        with col:
            form_button = st.form_submit_button("Sign Up")

        if form_button:
            if name:
                if validate_name(name):
                    if validate_username(username):
                        if len(username) >= 2:
                            if len(password1) >= 6:
                                if password1 == password2:
                                    # Add User to DB
                                    hashed_password = stauth.Hasher(
                                        [password2]
                                    ).generate()
                                    insert_user(name,
                                                username,
                                                hashed_password[0])
                                else:
                                    st.warning("Passwords Do Not Match")
                            else:
                                st.warning("Password is too Short")
                        else:
                            st.warning("Username Too short")
                    else:
                        st.warning("Invalid Username")
                else:
                    st.warning("Invalid Name")
