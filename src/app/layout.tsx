import type { Metadata } from 'next'
import type { ReactNode } from 'react'
// import { Inter } from 'next/font/google'

import Layout from '@/components/layout/Layout'

import './globals.css'

// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
// })

export const metadata: Metadata = {
  title: 'Lumeflo Solutions Limited — Creative & Digital Agency',

  description:
    "Africa's trusted creative, branding, website development, and digital growth agency. We build brands that inspire and digital experiences that convert.",

  openGraph: {
    title: 'Lumeflo Solutions Limited — Creative & Digital Agency',

    description:
      "Africa's trusted creative, branding, website development, and digital growth agency. We build brands that inspire and digital experiences that convert.",

    type: 'website',
    siteName: 'Lumeflo Solutions Limited',
    locale: 'en_NG',

    images: [
      {
        url: 'https://YOUR-DOMAIN.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lumeflo Solutions Limited — Creative & Digital Agency',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Lumeflo Solutions Limited — Creative & Digital Agency',

    description:
      "Africa's trusted creative, branding, website development, and digital growth agency. We build brands that inspire and digital experiences that convert.",

    images: ['https://YOUR-DOMAIN.com/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
        <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
 
