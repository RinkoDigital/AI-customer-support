'use client'

import { useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleUpload() {
    if (!file) {
      setStatus('Select a PDF first.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    setLoading(true)
    setStatus('Uploading and indexing PDF...')

    try {
      const response = await fetch(`${API_URL}/upload/pdf`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Upload failed.')
      }

      setStatus(`Done. ${data.pages_indexed} pages indexed and ${data.chunks_created} chunks created.`)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unexpected upload error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
      <h2 className="text-xl font-semibold">Upload company PDF</h2>
      <p className="mt-2 text-sm text-slate-300">Contracts, manuals, policies, or internal documentation.</p>

      <input
        type="file"
        accept="application/pdf"
        onChange={(event) => setFile(event.target.files?.[0] || null)}
        className="mt-6 block w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-4 rounded-lg bg-white px-5 py-3 font-medium text-slate-950 disabled:opacity-60"
      >
        {loading ? 'Processing...' : 'Upload PDF'}
      </button>

      {status && <p className="mt-4 text-sm text-slate-300">{status}</p>}
    </div>
  )
}
