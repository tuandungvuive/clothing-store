import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Nextgen - Modern Fashion Store",
  description: "Discover quality fashion that reflects your style and makes everyday enjoyable.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <CartProvider>{children}</CartProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
