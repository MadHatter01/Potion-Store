from fastapi import FastAPI, HTTPException, Depends
import json
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from database.database import sessionLocal, Potion



app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

INVENTORY_URL = "http://localhost:8001"

DB_FILE = "potions.json"
def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

# Load potions
def load_potions():
    try:
        with open(DB_FILE, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        print('file not found')
        return []
    except json.JSONDecodeError:
        print('json decode error')
        return []

# Save potions
def save_potions(potions):
    with open(DB_FILE, "w") as file:
        json.dump(potions, file, indent=4)

@app.get("/teststore")
def get_potions():
    return {"status":"OK"}

# @app.get("/buy/{potion_id}")
# def get_potion_id(potion_id):
#     potions = load_potions()
#     potion = next((p for p in potions if p["id"]== potion_id), None)
#     return {"potion":potion_id}

@app.post("/buy/{potion_id}")
def buy_potion(potion_id:int, db:Session = Depends(get_db)):
    # this is for the json file
    # potions = load_potions()
    # potion = next((p for p in potions if p["id"]== int(potion_id)), None)

    # this is for the db
    potion =db.query(Potion).filter(Potion.id == potion_id).first()

    if not potion:
        raise HTTPException(status_code=404, detail="Potion not found")
    
    if potion.quantity <= 0:
        raise HTTPException(status_code=400, detail="Out of stock!")

    potion.quantity -=1
    db.commit()
    return {"message": "Potion purchased!", "potion_price":potion.price}




if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8002)

