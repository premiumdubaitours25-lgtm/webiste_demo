import type { Metadata } from 'next'
import { Merriweather, Montserrat } from 'next/font/google'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${merriweather.variable} ${montserrat.variable}`}>
      {children}
    </div>
  )
}
