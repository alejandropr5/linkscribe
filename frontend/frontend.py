import streamlit as st
import streamlit as st
import streamlit_authenticator as stauth
import pickle
from pathlib import Path
from logup import sign_up

with open("styles.css") as f:
    st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

st.markdown(
    """
<style>
/* Estilos para el botón */

.text-label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #ffffff;
    }


/* Espaciado entre los campos de entrada y los títulos */
.text-input {
    margin-top: 2px;
    }
.st-ef .st-e6.st-e7 .st-bm {

    background-color: #005500; /* Cambiar color de fondo al hacer clic */
    color: white; /* Cambiar color del texto al hacer clic */

    }

  /* Estilos para el contenedor de entrada de texto */
    .text-input-container {
        margin-bottom: 15px;
    }

    .button-primary {
        background-color: #158237;
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    /* Estilos cuando el cursor pasa sobre el botón */
    .button-primary:hover {
        background-color: #158237; /* Cambia el fondo al pasar el cursor */
        color: #00FF00; /* Cambia el color de la letra al pasar el cursor */
    }

    /* Estilos para cambiar el fondo de la página */
    .stApp {
        background-color: #333333; /* Cambia el color de fondo a gris claro */
    }
    .title {
        color: #c9d0d3;
        margin-bottom: 80px; /* Cambia el color del título a azul */
    }

    .link-input-bar {
        background-color: #005500; /* Cambia el fondo a verde oscuro */
        padding: 10px; /* Añade espacio alrededor de la barra de entrada de texto */
        margin-top: -20px; /* Sube la barra de entrada de texto */
    }


    /* Estilos cuando el cursor pasa sobre el botón y cambia el fondo de la página */
    .button-primary:hover + body {
        background-color: #f0f0f0; /* Cambia el fondo de la página al pasar el cursor sobre el botón */
    }

    .stColumn > div {
    padding: 0px 10px; /* Ajusta el valor de padding según tu preferencia */
}
    </style>
    """,
    unsafe_allow_html=True,
)

names = ["Carlos Reyes", "Rebeca Miller"]
usernames = ["Empanada", "bunuelo"]

file_path = Path(__file__).parent / "hashed_pw.pkl"
with file_path.open("rb") as file:
    hashed_passwords = pickle.load(file)

authenticator = stauth.Authenticate(
    names,
    usernames,
    hashed_passwords,
    "sales_dashboard",
    "abcdef",
    cookie_expiry_days=30,
)

name, authentication_status, username = authenticator.login(
    ":green[Iniciar Sesion]", "main"
)

if authentication_status == False:
    st.error("Usuario o contrasena incorrecta")

if authentication_status == None:
    st.warning("Por favor ingrese su contrasena y usuario")

if not authentication_status:
    sign = st.sidebar.radio("No estas registrado?:", ["Login", "Registro"])
    if sign == "Registro":
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
        st.sidebar.header(f"Bienvenido {username}")
        st.sidebar.title("Menu")
        page = st.sidebar.radio(
            "Selecciona una pagina:",
            ["Extraer Caracteristicas", "Lista de Links"],
        )

        if page == "Extraer Caracteristicas":
            extract_features()

        elif page == "Lista de Links":
            show_links()

        # elif page == "Login":
        #     login()

        # elif page == "Registro":
        #     register()
        authenticator.logout(":green[Logout]", "sidebar")

    def extract_features():
        link = st.text_input("Ingresa el enlace:")

        green_button = '<button class="button-primary">Procesar</button>'
        show_success_message = False

        if st.markdown(green_button, unsafe_allow_html=True):
            user_input_link = link

            if user_input_link:
                st.write(
                    f"Enlace procesado... funciona Aljenadro??: {user_input_link}"
                )
            else:
                st.warning("Ingresa un enlace")

        # la lgica de extraccin de caractersticas

    # Pigina para mostrar la lista de links con filtros
    def show_links():
        st.markdown(
            '<h2 style="color: white;">Filtrar por:</h2>',
            unsafe_allow_html=True,
        )

        # estilo al selectbox al hacer clic
        st.markdown(
            "<style>.st-ef .st-e6.st-e7 .st-bm { background-color: #005500; color: white; }</style>",
            unsafe_allow_html=True,
        )

        filter_option = st.selectbox(
            "Filtrar por:", ["Nombre", "Fecha de Ingreso"]
        )
        # implementar la lgica de mostrar la lista de links y aplicar filtros

    # Pgina de login
    def login():
        # st.title("Login")
        st.markdown(
            '<label class="text-label">Nombre de usuario:</label>',
            unsafe_allow_html=True,
        )
        username = st.text_input("", "", key="username")
        st.markdown(
            '<label class="text-label">Contrasena:</label>',
            unsafe_allow_html=True,
        )

        password = st.text_input("", type="password", key="password")
        # username = st.text_input("Nombre de usuario:")
        # password = st.text_input("Contrasena:", type="password")
        # login_button = st.button("Iniciar Sesion")
        button_html = '<button class="button-primary">Iniciar Sesion</button>'
        st.markdown(button_html, unsafe_allow_html=True)

        # if login_button:
        # Aquo puedes implementar la logica de autenticacion

        if st.button("¿Aún no estás registrado?", key="Noregister"):
            register()

    # Pogina de registro
    def register():
        # st.title("Registro")
        st.markdown(
            '<label class="text-label">Nombre de usuario:</label>',
            unsafe_allow_html=True,
        )
        username = st.text_input("", "", key="username1")

        st.markdown(
            '<label class="text-label">Contrasena:</label>',
            unsafe_allow_html=True,
        )
        password = st.text_input("", type="password", key="password1")

        st.markdown(
            '<label class="text-label">Confirmar Contrasena:</label>',
            unsafe_allow_html=True,
        )
        confirm_password = st.text_input(
            "", type="password", key="confirm_password"
        )

        # register_button = '<button class="button-primary">Registrarse</button>'
        st.button("Registrarse", key="newbuton")

        # if register_button:
        # implementar la logica de registro

    if __name__ == "__main__":
        home()
