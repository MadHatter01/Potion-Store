from fastapi import FastAPI

app = FastAPI()

INVENTORY_URL = "http://localhost:8001"


@app.get("/teststore")
def get_potions():
    return {"status":"OK"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8002)

