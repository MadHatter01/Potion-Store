from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "http://localhost:5173"],  
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
async def get_potions():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{INVENTORY_SERVICE_URL}/api/potions")
        response.raise_for_status()
    return response.json()

@app.post("/api/buy/{potion_id}")
async def buy_potion(potion_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{STORE_SERVICE_URL}/buy/{potion_id}")
    if response.status_code !=200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    
    return response.json()

@app.put("/api/potions/restock/{potion_id}")
async def restock_potion(potion_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{INVENTORY_SERVICE_URL}/api/potions/restock/{potion_id}/1")
    if response.status_code !=200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    
    return response.json()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
