import csv
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class GamestateRecord(BaseModel):
    puck_x: float
    puck_y: float
    puck_vx: float
    puck_vy: float
    mallet_x: float 
    mallet_y : float
    mallet_vx : float
    mallet_vy : float

    mallet_opponent_x: float 
    mallet_opponent_y : float
    mallet_opponent_vx : float
    mallet_opponent_vy : float

@app.post("/api/record/")
async def record(record: GamestateRecord):
    with open("./backend/dataset.csv", "a", newline='') as f:
        writer = csv.writer(f)
        writer.writerow(record.model_dump().values())