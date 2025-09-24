import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "../components/ui/toaster"
import { Toaster as Sonner } from "../components/ui/sonner"
import { TooltipProvider } from "../components/ui/tooltip"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FloatingButtons from "../components/FloatingButtons"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JJ & TIA Tours - Your Gateway to Nepal',
  description: 'Discover amazing tour packages in Nepal with JJ & TIA Tours and Travels',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingButtons />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </body>
    </html>
  )
}
