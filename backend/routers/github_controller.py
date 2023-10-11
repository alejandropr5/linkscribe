from typing import Annotated
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from fastapi import HTTPException, status, Request, Header, Cookie
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
import requests
import logging

logging.basicConfig(level=logging.DEBUG,
                    format="%(levelname)s:\t%(message)s")


class GitHubAPI():
    AUTH_ENDPOINT = "https://github.com/login/oauth/authorize"
    TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token"
    USER_ENDPOINT = "https://api.github.com/user"
    CLIENT_ID = "5b65a4ee4e9e984f6c1a"
    CLIENT_SECRET = "11a4beac2fa8c67e23a91da5bcb2d907914413bd"
    STATE = "id9jsg04598eut9w3tjr9et9e8sjr"


class GitHubAccessToken(BaseModel):
    access_token: str
    token_type: str
    scope: str


HeaderParam = Annotated[str | None, Header()]
CookieParam = Annotated[str | None, Cookie()]

router = InferringRouter()


@cbv(router)
class GitHubController:
    @router.get("/authorize")
    async def authorize(self, referer: HeaderParam = None):
        auth_url = (f"{GitHubAPI.AUTH_ENDPOINT}"
                    f"?client_id={GitHubAPI.CLIENT_ID}"
                    f"&state={referer}")

        return RedirectResponse(auth_url)

    @router.get("/access_token")
    async def access_token(self,
                           code: str | None = None,
                           state: str | None = None,
                           error: str | None = None,
                           error_description: str | None = None,
                           error_uri: str | None = None):
        if error is not None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail=(f"{error}: {error_description}."
                                        f"More info: {error_uri}"))

        token = await self.get_access_token(code)
        response = RedirectResponse(state)
        response.set_cookie(key="access_token",
                            value=token["access_token"],
                            httponly=True,
                            max_age=self.hours(8))
        return response

    @router.get("/user_info")
    async def user_info(
        self, request: Request, access_token: CookieParam = None
    ):
        logging.debug(f"HEADERS: {request.headers}")
        logging.debug(f"access_token: {access_token}")
        return {"response": "received"}

    @staticmethod
    async def get_access_token(code: str) -> dict:
        url_path = (f"{GitHubAPI.TOKEN_ENDPOINT}"
                    f"?client_id={GitHubAPI.CLIENT_ID}"
                    f"&client_secret={GitHubAPI.CLIENT_SECRET}"
                    f"&code={code}")
        headers = {
            "Accept": "application/json"
        }
        response = requests.request(method="POST",
                                    url=url_path,
                                    headers=headers)
        try:
            data = response.json()
        except requests.exceptions.JSONDecodeError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

        return data

    @staticmethod
    async def get_user_data(token: dict):
        headers = {
            "Authorization": f"{token['token_type']} {token['access_token']}"
        }
        response = requests.request(method="GET",
                                    url=GitHubAPI.USER_ENDPOINT,
                                    headers=headers)
        # try:
        data = response.json()
        # except requests.exceptions.JSONDecodeError:
        #     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

        return data

    @staticmethod
    def hours(hour: float):
        return hour * 3600
