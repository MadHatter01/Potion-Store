from fastapi import FastAPI
from tempdb import potions_db

app = FastAPI()

@app.get("/potions")
def get_potions():
    return {"potions":potions_db}

@app.get("/potions/{potion_id}")
def get_potion(potion_id:int):
    potion = next((p for p in potions_db if p["id"]== potion_id), None)
    if potion:
        return potion
    
    return {"error": "Potion not found"}
