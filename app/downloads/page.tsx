import type { Metadata } from 'next'
import Image from 'next/image'
import QRCode from 'qrcode'
import { event, siteUrl, navigation, partnerLogos } from '@/content/site'
import LiveHeader from '@/components/LiveHeader'
import QRDownload from '@/components/QRDownload'
import { img } from '@/lib/img'

export const metadata: Metadata = {
  title: `Downloads — ${event.name} ${event.year}`,
  robots: { index: false },
}

const pages = [
  { label: 'Conference Site',              url: siteUrl,                                                                                               filename: 'qr-betterbydesign-2026' },
  { label: 'Live Stream',                  url: `${siteUrl}/live`,                                                                                     filename: 'qr-betterbydesign-2026-live' },
  { label: 'Agenda',                       url: `${siteUrl}/agenda`,                                                                                   filename: 'qr-betterbydesign-2026-agenda' },
  { label: 'gov.ie',                       url: 'https://www.gov.ie',                                                                                  filename: 'qr-gov-ie' },
  { label: 'gov.ie/transformation',        url: 'https://www.gov.ie/transformation',                                                                   filename: 'qr-gov-ie-transformation' },
  { label: 'Community of Practice Sign-up', url: 'https://forms.uat.services.gov.ie/en/68ee7a67613633a346f27ee1-join-irelands-public-sector-de',       filename: 'qr-cop-signup' },
]

export default async function DownloadsPage() {
  const qrCodes = await Promise.all(
    pages.map(async (page) => {
      const svg = await QRCode.toString(page.url, {
        type: 'svg',
        margin: 2,
        color: { dark: '#1E1E1E', light: '#ffffff' },
        width: 200,
      })
      return { ...page, svg }
    })
  )

  const brochure = navigation.find((n) => n.href.endsWith('.pdf'))

  return (
    <div className="min-h-screen bg-bbd-black flex flex-col text-white">

      <LiveHeader />

      {/* Content */}
      <main className="flex-1 page-x py-12">
        <h1 className="font-semibold text-white leading-none mb-10" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
          Downloads
        </h1>

        {/* QR Codes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {qrCodes.map((qr) => (
            <div key={qr.url} className="flex flex-col">
              <div className="w-fit rounded overflow-hidden" dangerouslySetInnerHTML={{ __html: qr.svg }} />
              <p className="mt-4 font-semibold text-white" style={{ fontSize: '14px' }}>
                {qr.label}
              </p>
              <p className="mt-0.5 text-white/40 break-all" style={{ fontSize: '11px' }}>
                {qr.url}
              </p>
              <QRDownload svg={qr.svg} filename={qr.filename} />
            </div>
          ))}
        </div>

        {/* Brochure */}
        {brochure && (
          <div className="mt-16 pt-10 border-t border-white/10">
            <p className="font-semibold text-white mb-4" style={{ fontSize: '14px' }}>Brochure</p>
            <a
              href={brochure.href}
              download
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
              style={{ fontSize: '13px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>
          </div>
        )}

        <div style={{ height: '48px' }} />
      </main>

      {/* Footer */}
      <footer
        className="flex-shrink-0 page-x flex items-center justify-between border-t border-white/10 text-white/40"
        style={{ height: '48px', fontSize: '12px' }}
      >
        <span>{event.name} {event.year}</span>
        <div className="flex items-center gap-4">
          {partnerLogos.map((logo) => (
            <a
              key={logo.src}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={logo.alt}
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
            >
              <Image
                src={img(logo.src)}
                alt={logo.alt}
                width={80}
                height={20}
                className="w-auto object-contain invert"
                style={{ maxHeight: '20px', width: 'auto' }}
              />
            </a>
          ))}
        </div>
      </footer>

    </div>
  )
}
