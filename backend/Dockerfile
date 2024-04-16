FROM python:3.11-buster

RUN pip install poetry==1.5.1

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1

WORKDIR /app

COPY pyproject.toml poetry.lock ./
RUN touch README.md

ENV PAPI_HTTP_TIMEOUT=300
RUN poetry install --without dev --no-root && rm -rf $POETRY_CACHE_DIR

COPY src ./src
COPY data ./data
COPY setup.py .

RUN poetry install --without dev
RUN ["poetry", "run", "python", "-m", "setup"]

ENTRYPOINT ["poetry", "run", "python", "-m", "src.app.main"]