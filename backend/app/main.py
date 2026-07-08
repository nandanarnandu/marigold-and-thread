from fastapi import FastAPI, Depends
from app.routers import auth
from app.core.deps import get_current_user
from app.models.user import User

app = FastAPI(title="Marigold & Thread API")

app.include_router(auth.router)


@app.get("/")
def read_root():
    return {"message": "Marigold & Thread API is running"}


@app.get("/me")
def read_current_user(current_user: User = Depends(get_current_user)):
    return {"id": current_user.id, "email": current_user.email, "name": current_user.name}