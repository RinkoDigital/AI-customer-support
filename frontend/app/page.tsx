import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl md:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">AI Support System</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            AI Document Support Agent
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Upload company PDFs such as contracts, manuals, policies, and documentation. Ask questions in natural language and receive answers grounded in the uploaded documents.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/upload" className="rounded-lg bg-white px-5 py-3 font-medium text-slate-950">
              Upload PDF
            </Link>
            <Link href="/chat" className="rounded-lg border border-slate-600 px-5 py-3 font-medium text-white">
              Ask Documents
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {['FastAPI Backend', 'RAG Pipeline', 'Source References'].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="font-semibold">{item}</h2>
              <p className="mt-2 text-sm text-slate-400">Built for realistic business AI support workflows.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
