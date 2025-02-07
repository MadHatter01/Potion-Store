from fastapi import FastAPI, HTTPException
import json
from fastapi.middleware.cors import CORSMiddleware



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
def buy_potion(potion_id:int):
    potions = load_potions()
    print('triggered', potion_id, type(potion_id), potions)

    potion = next((p for p in potions if p["id"]== int(potion_id)), None)

    if not potion:
        raise HTTPException(status_code=404, detail="Potion not found")
    
    if potion["quantity"] <= 0:
        raise HTTPException(status_code=400, detail="Out of stock!")
    
    potion["quantity"] -=1
    save_potions(potions)
    return {"message": "Potion purchased!", "potion":potion}




if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8002)

