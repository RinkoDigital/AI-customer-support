import Link from 'next/link'
import UploadBox from '@/components/UploadBox'

export default function UploadPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <section className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-slate-400">← Back</Link>
        <div className="mt-6">
          <UploadBox />
        </div>
      </section>
    </main>
  )
}
