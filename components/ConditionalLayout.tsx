'use client'

import { usePathname } from 'next/navigation'
import Navbar from "./Navbar"
import Footer from "./Footer"
import FloatingButtons from "./FloatingButtons"

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  if (isDashboard) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
