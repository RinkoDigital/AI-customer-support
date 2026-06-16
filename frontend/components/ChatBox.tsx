'use client'

import { useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

type Source = {
  file_name: string
  page?: number
  excerpt: string
}

type Message = {
  role: 'user' | 'assistant'
  text: string
  sources?: Source[]
}

export default function ChatBox() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  async function askQuestion() {
    const cleanQuestion = question.trim()
    if (!cleanQuestion) return

    setMessages((current) => [...current, { role: 'user', text: cleanQuestion }])
    setQuestion('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/chat/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: cleanQuestion }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Chat request failed.')
      }

      setMessages((current) => [
        ...current,
        { role: 'assistant', text: data.answer, sources: data.sources },
      ])
    } catch (error) {
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: error instanceof Error ? error.message : 'Unexpected chat error.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
      <h2 className="text-xl font-semibold">Ask your documents</h2>
      <p className="mt-2 text-sm text-slate-300">Example: What is the cancellation policy?</p>

      <div className="mt-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.role === 'user' ? 'rounded-xl bg-slate-800 p-4' : 'rounded-xl bg-slate-950 p-4'}
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">{message.role}</p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6">{message.text}</p>

            {message.sources && message.sources.length > 0 && (
              <div className="mt-4 border-t border-slate-800 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Sources</p>
                <div className="mt-2 space-y-2">
                  {message.sources.map((source, sourceIndex) => (
                    <div key={sourceIndex} className="rounded-lg border border-slate-800 p-3 text-xs text-slate-300">
                      <p className="font-medium">{source.file_name} {source.page ? `— page ${source.page}` : ''}</p>
                      <p className="mt-1 line-clamp-3">{source.excerpt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') askQuestion()
          }}
          placeholder="Ask a question..."
          className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none"
        />
        <button
          onClick={askQuestion}
          disabled={loading}
          className="rounded-lg bg-white px-5 py-3 font-medium text-slate-950 disabled:opacity-60"
        >
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </div>
    </div>
  )
}
