import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Document Support Agent',
  description: 'Ask questions based on uploaded PDF documents.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
