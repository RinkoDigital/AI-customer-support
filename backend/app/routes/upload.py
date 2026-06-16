import os
from pathlib import Path
from fastapi import APIRouter, File, HTTPException, UploadFile
from app.services.pdf_loader import load_pdf
from app.services.vector_store import add_documents_to_store

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "./uploads"))
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    safe_name = Path(file.filename).name
    file_path = UPLOAD_DIR / safe_name

    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")

    file_path.write_bytes(content)

    documents = load_pdf(str(file_path))
    if not documents:
        raise HTTPException(status_code=400, detail="No readable text was found in this PDF.")

    chunks_count = add_documents_to_store(documents)

    return {
        "message": "PDF uploaded and indexed successfully.",
        "file_name": safe_name,
        "pages_indexed": len(documents),
        "chunks_created": chunks_count,
    }
