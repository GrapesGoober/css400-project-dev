import csv
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

class PingBody(BaseModel):
    text: str

@app.post("/api/ping/")
async def ping(body: PingBody):
    body.text = "got " + body.text
    return body

class GamestateRecord(BaseModel):
    puck_x: float
    puck_y: float
    puck_vx: float
    puck_vy: float

@app.post("/api/record/")
async def ping(record: GamestateRecord):
    with open("./dataset.csv", "a", newline='') as f:
        writer = csv.writer(f)
        writer.writerow(record.model_dump().values())
