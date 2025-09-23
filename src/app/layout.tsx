import type { Metadata } from 'next'
import { Open_Sans, Montserrat } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const getOpenSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
})

const getMontserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Cupons',
  description: 'Teste Front End pleno Loyalme',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${getOpenSans.variable} ${getMontserrat.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
