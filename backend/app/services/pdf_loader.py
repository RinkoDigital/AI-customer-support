from pathlib import Path
from typing import List
from langchain_core.documents import Document
from pypdf import PdfReader


def load_pdf(file_path: str) -> List[Document]:
    path = Path(file_path)
    reader = PdfReader(str(path))
    documents: List[Document] = []

    for index, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ""
        text = text.strip()
        if not text:
            continue

        documents.append(
            Document(
                page_content=text,
                metadata={
                    "source": path.name,
                    "page": index,
                },
            )
        )

    return documents
