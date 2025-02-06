from fastapi import FastAPI, HTTPException
import json

app = FastAPI()

DB_FILE = "potions.json"

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


@app.get("/potions")
def get_potions():
    potions = load_potions()
    return {"potions":potions}


@app.post("/potions")
def add_potion(potion:dict):
    potions = load_potions()
    potion["id"] = max((p["id"] for p in potions), default=0) + 1
    potions.append(potion)
    save_potions(potions)
    return {"message": "Potion added!", "potions": potion}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)
