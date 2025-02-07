import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mach9 Video Gallery',
  description: 'Mach9 Video Gallery',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
