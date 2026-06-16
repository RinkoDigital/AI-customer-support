from fastapi import APIRouter, HTTPException
from app.models.schemas import ChatRequest, ChatResponse
from app.services.rag import answer_question

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("/ask", response_model=ChatResponse)
def ask_question(payload: ChatRequest):
    question = payload.question.strip()
    if len(question) < 3:
        raise HTTPException(status_code=400, detail="Question is too short.")

    result = answer_question(question)
    return result
