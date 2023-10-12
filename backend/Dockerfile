FROM python:3.10 as build-stage
WORKDIR /tmp
RUN pip3 install poetry
COPY ./pyproject.toml /tmp/
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM python:3.10-slim
RUN apt-get update -y && apt-get install build-essential -y

WORKDIR /app
COPY --from=build-stage /tmp/requirements.txt /app/requirements.txt
RUN pip3 install --no-cache-dir --upgrade -r requirements.txt
RUN pwd
COPY . .

RUN pwd && ls -la

CMD ["uvicorn", "--host", "0.0.0.0", "--reload", "--reload-dir", "/app", "api:app", "--port", "8000"]