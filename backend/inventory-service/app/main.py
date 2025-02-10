from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database.database import sessionLocal, Potion
import json


app = FastAPI()

DB_FILE = "potions.json"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

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
    except (FileNotFoundError, json.JSONDecodeError):
        return []

# Save potions
def save_potions(potions):
    with open(DB_FILE, "w") as file:
        json.dump(potions, file, indent=4)



@app.get("/api/potions")
def get_db_potions(db: Session = Depends(get_db)):
    return db.query(Potion).all()

# @app.get("/api/potions")
# def get_potions():
#     potions = load_potions()
#     return JSONResponse(content=potions)


@app.post("/api/potions")
def add_potion(potion:dict):
    potions = load_potions()
    potion["id"] = max((p["id"] for p in potions), default=0) + 1
    potions.append(potion)
    save_potions(potions)
    return {"message": "Potion added!", "potions": potion}

@app.post("/api/restock/{potion_id}/{amount}")
def restock_potion(potion_id: int, amount: int, db: Session = Depends(get_db)):
    potion = db.query(Potion).filter(Potion.id == potion_id).first()

    if not potion:
        raise HTTPException(status_code=404, detail="Potion not found")
    
    potion.quantity += amount
    db.commit()
    db.refresh(potion)
    return {"message":"Potion restocked!", "potion": {"id": potion.id, "name": potion.name, "quantity": potion.quantity}}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)
