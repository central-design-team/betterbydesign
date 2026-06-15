import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { event, partnerLogos } from '@/content/site'
import AgendaList from '@/components/AgendaList'
import LiveHeader from '@/components/LiveHeader'
import Drawers from '@/components/Drawers'
import { img } from '@/lib/img'

export const metadata: Metadata = {
  title: `Programme — ${event.name} ${event.year}`,
  description: `Full programme for ${event.name} ${event.year}. ${event.date}, ${event.location}.`,
}

export default function AgendaPage() {
  return (
    <>
    <div className="min-h-screen bg-bbd-black flex flex-col text-white">

      <LiveHeader
        shareTitle="Better By Design 2026 — Programme"
        shareText="View the full programme for Better By Design 2026 — Public Service Design, The Lighthouse, Dublin, 18 June."
      />

      {/* Content */}
      <main className="flex-1 page-x py-8">
        <div className="text-[#00A432] uppercase tracking-widest mb-6" style={{ fontSize: '10px', fontWeight: 600 }}>
          Programme
        </div>
        <AgendaList showImages />
        <div style={{ height: '64px' }} />
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
    <Suspense>
      <Drawers />
    </Suspense>
    </>
  )
}
