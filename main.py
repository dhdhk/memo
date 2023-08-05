from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()


class Memo(BaseModel):
    id: int
    content: str


memos = []


@app.post("/memos")
async def create_memo(memo:Memo):
    memos.append(memo)
    return "성공했습니다"

@app.get("/memos")
async def read_memo():
    return memos

app.mount("/", StaticFiles(directory="static",html=True), name="static")