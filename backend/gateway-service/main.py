from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

INVENTORY_SERVICE_URL = "http://localhost:8001"
STORE_SERVICE_URL = "http://localhost:8002"

@app.get("/test/apigateway")
def get_status():
    return {"status":"ok"}

@app.get("/api/potions")
def get_potions():
    response = requests.get(f"{INVENTORY_SERVICE_URL}/api/potions")
    print(response.json())
    return response.json()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
