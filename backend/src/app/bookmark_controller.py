from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from fastapi import Depends

from model.page_categorizer import PageCategorizer
from model.scrap_tool import ScrapTool
from utils import bookmarks_models as models


router = InferringRouter()


@cbv(router)
class BookmarkController:
    categorizer: PageCategorizer = Depends(models.get_categorizer)
    scrap: ScrapTool = Depends(models.get_scrap_tool)

    @router.post("/predict")
    def predict(self, web: models.PredictRequestBody):
        web_content = self.scrap.get_web_content(web.url)
        prediction = self.categorizer.predict([web_content["text"]])

        words_list = web_content["words"].split()
        del web_content["text"]
        del web_content["words"]

        print(f"{len(words_list)=}")

        return models.PredictResponseBody(
            **web_content,
            category=prediction,
            words=words_list
        )

    # @router.post("/{username}", response_model=schemas.Bookmark)
    # def create_bookmark_for_user(
    #     self,
    #     username: str,
    #     bookmark: schemas.BookmarkCreate,
    #     db: Session = Depends(get_db),
    # ):
    #     return crud.create_user_bookmark(
    #         db=db, bookmark=bookmark, username=username
    #     )

    # @router.get("/", response_model=list[schemas.Bookmark])
    # def read_bookmarks(
    #     self, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
    # ):
    #     items = crud.get_bookmarks(db, skip=skip, limit=limit)
    #     return items

    # @router.get("/{username}", response_model=list[schemas.Bookmark])
    # def get_bookmarks_by_username(
    #     self, username: str, db: Session = Depends(get_db)
    # ):
    #     items = crud.get_bookmarks_by_username(db, username=username)
    #     return items
