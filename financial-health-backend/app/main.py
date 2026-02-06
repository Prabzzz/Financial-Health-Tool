# app/main.py

from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware   # ← add this import

from app.database import engine
from app.base import Base
from app.routers import users, financials

app = FastAPI()

# MUST be right after app = FastAPI() and BEFORE any routes/routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# After app.add_middleware(...)
@app.options("/{path:path}")
async def options():
    return {}

# Create tables (keep this)
Base.metadata.create_all(bind=engine)

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(financials.router, prefix="/financials", tags=["financials"])

@app.get("/")
def read_root():
    return {"message": "Financial Health Assessment Tool Backend"}