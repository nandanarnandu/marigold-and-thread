from pydantic import BaseModel
from datetime import datetime
from app.schemas.product import ProductOut


class OrderItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    price_at_purchase: float
    product: ProductOut

    class Config:
        from_attributes = True


class OrderOut(BaseModel):
    id: int
    total: float
    status: str
    created_at: datetime
    items: list[OrderItemOut]

    class Config:
        from_attributes = True