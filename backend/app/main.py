from fastapi import FastAPI

app = FastAPI(title="Marigold & Thread API")


@app.get("/")
def read_root():
    return {"message": "Marigold & Thread API is running"}