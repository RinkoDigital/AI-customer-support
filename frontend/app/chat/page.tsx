import Link from 'next/link'
import ChatBox from '@/components/ChatBox'

export default function ChatPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <section className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-slate-400">← Back</Link>
        <div className="mt-6">
          <ChatBox />
        </div>
      </section>
    </main>
  )
}
