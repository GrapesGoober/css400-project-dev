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