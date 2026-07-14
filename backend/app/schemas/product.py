from pydantic import BaseModel
from typing import Optional


class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    image_url: Optional[str] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    stock: int = 0
    colour: Optional[str] = None
    rating: Optional[float] = 0.0



class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    stock: Optional[int] = None
    colour: Optional[str] = None
    rating: Optional[float] = 0.0



class ProductOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    image_url: Optional[str] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    stock: int
    colour: Optional[str] = None
    rating: Optional[float] = 0.0


    class Config:
        from_attributes = True