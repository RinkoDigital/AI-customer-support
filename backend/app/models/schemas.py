from pydantic import BaseModel
from typing import List, Optional


class ChatRequest(BaseModel):
    question: str


class Source(BaseModel):
    file_name: str
    page: Optional[int] = None
    excerpt: str


class ChatResponse(BaseModel):
    answer: str
    sources: List[Source]
