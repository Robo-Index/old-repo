import type { Metadata } from 'next'
import Header from '@/components/Header'
import './globals.css'

export const metadata: Metadata = {
  title: 'RoboIndex',
  description: 'Structured robotics research paper data',
}

// Inline script to prevent flash of wrong theme
const themeScript = `
(function() {
  var t = localStorage.getItem('theme');
  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {process.env.NEXT_PUBLIC_GOATCOUNTER_ID && (
          // eslint-disable-next-line @next/next/no-before-interactive-script-component
          <script
            data-goatcounter={`https://${process.env.NEXT_PUBLIC_GOATCOUNTER_ID}.goatcounter.com/count`}
            async={true}
            src="//gc.zgo.at/count.js"
          />
        )}
      </head>
      <body className="font-sans">
        <Header />
        {children}
      </body>
    </html>
  )
}
