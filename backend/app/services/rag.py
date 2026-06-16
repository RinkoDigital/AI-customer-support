from typing import Dict, List
from langchain_openai import ChatOpenAI
from app.services.vector_store import get_vector_store


SYSTEM_PROMPT = """
You are an AI document support agent.
Answer only using the provided document excerpts.
If the answer is not in the documents, say clearly that the documents do not contain that information.
Be concise, professional, and include no invented facts.
"""


def answer_question(question: str) -> Dict:
    store = get_vector_store()
    docs = store.similarity_search(question, k=4)

    if not docs:
        return {
            "answer": "I could not find relevant information in the uploaded documents.",
            "sources": [],
        }

    context = "\n\n".join(
        [
            f"Source: {doc.metadata.get('source', 'unknown')} | Page: {doc.metadata.get('page', 'N/A')}\n{doc.page_content}"
            for doc in docs
        ]
    )

    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    response = llm.invoke(
        [
            ("system", SYSTEM_PROMPT),
            ("human", f"Question: {question}\n\nDocument excerpts:\n{context}"),
        ]
    )

    sources: List[Dict] = []
    for doc in docs:
        sources.append(
            {
                "file_name": doc.metadata.get("source", "unknown"),
                "page": doc.metadata.get("page"),
                "excerpt": doc.page_content[:350],
            }
        )

    return {"answer": response.content, "sources": sources}
