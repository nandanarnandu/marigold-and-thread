from pydantic import BaseModel
from app.schemas.product import ProductOut


class WishlistItemCreate(BaseModel):
    product_id: int


class WishlistItemOut(BaseModel):
    id: int
    product_id: int
    product: ProductOut

    class Config:
        from_attributes = True
