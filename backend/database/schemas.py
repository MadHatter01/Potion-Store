from pydantic import BaseModel

class PotionSchema(BaseModel):
    name: str
    price: int
    quantity: int
    effect: str