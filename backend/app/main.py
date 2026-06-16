import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import upload, chat

load_dotenv()

app = FastAPI(
    title="AI Document Support Agent",
    description="RAG API for answering questions based on uploaded PDF documents.",
    version="1.0.0",
)

origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(chat.router)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "AI Document Support Agent"}
