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
  title: 'Premium Dubai Tours - Your Gateway to Dubai',
  description: 'Discover amazing tour packages in Dubai with Premium Dubai Tours',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <TooltipProvider>
          <Navbar />
          <main className="min-h-screen bg-white">
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
