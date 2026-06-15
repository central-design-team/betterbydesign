import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const siteUrl = process.env.GITHUB_ACTIONS
  ? 'https://betterbydesign.ie/'
  : 'http://localhost:3000/'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Better By Design 2026',
  appleWebApp: {
    title: 'Better By Design',
    statusBarStyle: 'default',
  },
  description:
    'A one-day conference and showcase bringing together public servants, designers, and policy makers to explore how design principles can transform public services. Thursday 18 June 2026 — The Lighthouse, Dublin.',
  openGraph: {
    title: 'Better By Design 2026',
    description:
      'A one-day conference bringing together public servants, designers, and policy makers to explore how design can transform public services. 18 June 2026 — The Lighthouse, Dublin.',
    type: 'website',
    images: [
      {
        url: 'images/betterbydesign-sharecard.png',
        width: 1200,
        height: 630,
        alt: 'Better By Design 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Better By Design 2026',
    description:
      'A one-day conference bringing together public servants, designers, and policy makers. 18 June 2026 — The Lighthouse, Dublin.',
    images: ['images/betterbydesign-sharecard.png'],
  },
}

const buildVersion = process.env.BUILD_VERSION ?? 'dev'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={ibmPlexSans.variable}>
      <head>
        <meta name="build-version" content={buildVersion} />
      </head>
      <body className="bg-white text-bbd-black antialiased font-sans">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <Script src="https://plausible.io/js/pa-J-QAB3TQGpZexSPd7iTSp.js" strategy="afterInteractive" />
        <Script id="plausible-init" strategy="afterInteractive">{`
          window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
          plausible.init()
        `}</Script>
      </body>
    </html>
  )
}
