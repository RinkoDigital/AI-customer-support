# AI Document Support Agent

A portfolio-ready AI support system that answers user questions based on uploaded PDF documents.

Companies can upload contracts, manuals, policies, or internal documentation. Users ask questions in natural language, and the system responds using RAG with source references.

## Features

- PDF upload
- Text extraction from PDFs
- Document chunking
- OpenAI embeddings
- ChromaDB vector storage
- RAG question answering
- Source references with file name and page
- FastAPI backend
- Next.js + Tailwind frontend
- Docker backend setup

## Tech Stack

### Backend

- Python
- FastAPI
- OpenAI
- LangChain
- ChromaDB
- Docker

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

## Project Structure

```txt
ai-document-support-agent/
  backend/
    app/
      main.py
      routes/
        upload.py
        chat.py
      services/
        pdf_loader.py
        vector_store.py
        rag.py
      models/
        schemas.py
    Dockerfile
    requirements.txt
    .env.example

  frontend/
    app/
      page.tsx
      upload/page.tsx
      chat/page.tsx
    components/
      UploadBox.tsx
      ChatBox.tsx
```

## Backend Setup

```bash
cd backend
cp .env.example .env
```

Add your OpenAI API key to `.env`:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Run locally:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend URL:

```txt
http://localhost:8000
```

API docs:

```txt
http://localhost:8000/docs
```

## Backend with Docker

From the project root:

```bash
docker compose up --build
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```txt
http://localhost:3000
```

Optional frontend environment variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## How It Works

```txt
PDF Upload
   ↓
Text Extraction
   ↓
Chunking
   ↓
Embeddings
   ↓
Vector Database
   ↓
User Question
   ↓
Similarity Search
   ↓
LLM Response
   ↓
Answer + Sources
```



