from fastapi import HTTPException
import sqlalchemy
from sqlalchemy.orm import Session
from sqlapp import crud


async def validate_father_id(db: Session, user_id: int, father_id: int):
    if father_id is not None:
        father_category = crud.get_user_category_by_id(
            db, user_id=user_id, category_id=father_id
        )
        if father_category is None:
            raise HTTPException(
                status_code=400,
                detail="Category father id not in user categories.",
            )


async def get_user_category(db: Session, user_id: int, category_id: int):
    category_error = HTTPException(
        status_code=400, detail="Category id not in user categories."
    )

    try:
        category = crud.get_user_category_by_id(
            db, user_id=user_id, category_id=category_id
        )
    except sqlalchemy.exc.IntegrityError:
        raise category_error

    if category is None:
        raise category_error
    return category
