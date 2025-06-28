import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "./components/theme-provider"
import Header from "./components/Header"
import type React from "react"
import { ConvexClientProvider } from "./components/ConvexClientProvider"

export const metadata: Metadata = {
  title: "AirWIND",
  description: "AI-powered development platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/logo-new.png" type="image/svg+xml" />
      </head>
      <body>
        <ConvexClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <Header />
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
