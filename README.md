# Linkscibe 📚

Linkscibe is a web application that utilizes natural language processing (NLP) and machine learning algorithms to classify and organize web links as bookmarks. The project is divided into frontend and backend components.

## Project Structure 🏗️

The project structure is organized as follows:

- **[backend](backend)**: The backend is built using Python and FastAPI and handles link classification, authentication, data retrieval, and storage in a PostgreSQL database.

- **[docker-compose.yml](docker-compose.yml)**: Configuration for Docker containers.

- **[frontend](frontend)**: The frontend is implemented in Streamlit and includes several main pages:
  - Login page.
  - Sign-in page.
  - Prediction page (where users enter a URL and receive category predictions).
  - Bookmarks page (for viewing and filtering saved bookmarks).

- **[postgres](postgres)**: Docker configuration for a PostgreSQL database container.

## Deployment 🚀

The application is currently deployed using Docker Compose, utilizing images created and hosted on Docker Hub.

## Technologies 🧪

- **Frontend**: The frontend is implemented using Streamlit.
- **Backend**: The backend is built with Python and FastAPI, providing RESTful API endpoints and integrating with PostgreSQL.
- **Database**: The application uses a PostgreSQL database.
- **NLP and ML**: NLP and machine learning models are used for link classification.

## Future Enhancements 🛰️

In the future, the project aims to implement the following features:

- Export/import bookmarks as HTML for compatibility with various web browsers.
- Share bookmark lists with friends through unique links.
- Migrate the entire frontend to React.
- Migrate to a Kubernetes deployment

## Contribution 🤝

Contributions to this project are welcome. If you have ideas or want to help with its development, feel free to get involved.

---

Linkscibe aims to simplify link organization using NLP and machine learning. If you have any questions or need further information, please don't hesitate to ask. 📚
