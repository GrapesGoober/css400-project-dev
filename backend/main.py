import csv
from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel

app = FastAPI()
dataset_file = "./backend/dataset.csv"

class GamestateRecord(BaseModel):
    puck_x: float
    puck_y: float
    puck_vx: float
    puck_vy: float
    mallet_x: float 
    mallet_y : float
    mallet_vx : float
    mallet_vy : float

@app.post("/api/record/")
async def record(record: GamestateRecord):
    with open(dataset_file, "a", newline='') as f:
        writer = csv.writer(f)
        writer.writerow(record.model_dump().values())

@app.get("/api/download")
async def clear_file():
    resp = FileResponse(dataset_file, media_type="text/csv", filename="dataset.csv")
    return resp

@app.get("/api/clear")
async def clear_file():
    open(dataset_file, 'w').close() # Clear existing data
    return