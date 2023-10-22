import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar, Navgation } from '../widget/pc.navbar'
import { ReduxProvider } from '../redux/storeProvider'
import RootStyleRegistry from '../context/emotion'
import { NavbarProvider } from '../context/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Talpx - Cutting-Edge Frontend Solutions',
  description: 'Talpx offers state-of-the-art frontend development services with a focus on exceptional UI/UX design. Elevate your brand with our expertise and drive user engagement like never before.',
  keywords: 'Talpx, Frontend Development, UI/UX Design, Web Solutions, Branding, User Engagement',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning >
        <body className={inter.className}>
          <ReduxProvider>
            <ThemeProvider 
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <RootStyleRegistry >
                  <NavbarProvider>
                    <Navgation />
                    {children}
                  </NavbarProvider>
              </RootStyleRegistry>
            </ThemeProvider>
          </ReduxProvider>
          </body>
    </html>
  )
}
