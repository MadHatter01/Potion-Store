from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database.database import sessionLocal, Potion
from database.schemas import PotionSchema
import json


app = FastAPI()

DB_FILE = "potions.json"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", 'http://localhost:5174'],  
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
def add_potion(potion:PotionSchema, db:Session = Depends(get_db)):
    new_potion = Potion(**potion.dict())
    db.add(new_potion)
    db.commit()
    db.refresh(new_potion)
    return {"message": "Potion added!", "potion": new_potion}


@app.put("/api/potions/restock/{potion_id}")
def restock_potion(potion_id: int, db: Session = Depends(get_db)):
    potion = db.query(Potion).filter(Potion.id == potion_id).first()

    if not potion:
        raise HTTPException(status_code=404, detail="Potion not found")
    
    potion.quantity += 1
    db.commit()
    db.refresh(potion)
    return {"message":"Potion restocked!", "potion": {"id": potion.id, "name": potion.name, "quantity": potion.quantity}}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)
