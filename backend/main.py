import csv
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class GamestateRecord(BaseModel):
    puck_x: float
    puck_y: float
    puck_vx: float
    puck_vy: float

@app.post("/api/record/")
async def ping(record: GamestateRecord):
    with open("./backend/dataset.csv", "a", newline='') as f:
        writer = csv.writer(f)
        writer.writerow(record.model_dump().values())