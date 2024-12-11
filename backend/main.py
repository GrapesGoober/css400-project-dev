import csv
import pickle
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

@app.post("/api/record/")
async def record(record: GamestateRecord):
    with open("./backend/dataset.csv", "a", newline='') as f:
        writer = csv.writer(f)
        writer.writerow(record.model_dump().values())

class Features(BaseModel):
    puck_x: float
    puck_y: float
    puck_vx: float
    puck_vy: float
    mallet_x: float 
    mallet_y : float

class Prediction(BaseModel):
    mallet_vx : float
    mallet_vy : float

with open("./backend/scaler_x.sav", "rb") as f:
    scaler_x = pickle.load(f)

with open("./backend/scaler_y.sav", "rb") as f:
    scaler_y = pickle.load(f)

with open("./backend/trained_mallet_model_new.sav", "rb") as f:
# with open("./backend/trained_mallet_model_pucknotreset.sav", "rb") as f:
    model = pickle.load(f) 
    
@app.post("/api/predict/")
async def record(features: Features):
    scaled_features = scaler_x.transform([list(features.model_dump().values())])
    predict = scaler_y.inverse_transform(model.predict(scaled_features))
    return Prediction(mallet_vx=predict[0][0], mallet_vy=predict[0][1])
        