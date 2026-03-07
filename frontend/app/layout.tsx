import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HR Portal - CLINGY API',
  description: 'HR Management Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  )
}
