from app.webscrapping import get_text
from pydantic import BaseModel
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
# from fastapi import Depends, Request


class WebURL(BaseModel):
    url: str


router = InferringRouter()


# async def get_model(request: Request):
#     return request.app.state.model


@cbv(router)
class TextController:

    @router.get("/hi")
    def hi(self):
        return "Hi from the TextController"

    @router.post("/extract")
    def extract(self, url: WebURL):
        response = get_text("https://es.wikipedia.org/wiki/Colombia")

        return {"response": response}
