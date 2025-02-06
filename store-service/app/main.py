from fastapi import FastAPI

app = FastAPI()

INVENTORY_URL = "http://localhost:8001"


@app.get("/teststore")
def get_potions():
    return {"status":"OK"}

