import type { Metadata } from 'next'
import { event, partnerLogos } from '@/content/site'
import Image from 'next/image'
import { Suspense } from 'react'
import LiveHeader from '@/components/LiveHeader'
import Drawers from '@/components/Drawers'
import AgendaList from '@/components/AgendaList'
import { img } from '@/lib/img'

export const metadata: Metadata = {
  title: 'Better By Design 2026 — Live Stream',
  description: 'Watch the Better By Design 2026 conference live. Public Service Design — The Lighthouse, Dublin, 18 June 2026.',
  openGraph: {
    title: 'Better By Design 2026 — Live Stream',
    description: 'Watch the Better By Design 2026 conference live. Public Service Design — The Lighthouse, Dublin.',
    images: [{ url: 'images/betterbydesign-sharecard.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Better By Design 2026 — Live Stream',
    description: 'Watch the Better By Design 2026 conference live. Public Service Design — The Lighthouse, Dublin.',
    images: ['images/betterbydesign-sharecard.png'],
  },
}

export default function LivePage() {
  return (
    <>
    <div className="min-h-screen bg-bbd-black flex flex-col text-white">

      <LiveHeader />

      {/* Video area */}
      <main id="main-content" className="flex-1 flex flex-col page-x pt-5 pb-6 sm:pb-24 gap-6 sm:gap-10">
        {event.isLive ? (
          <div className="relative w-full aspect-video">
            <iframe
              src={event.liveStreamUrl}
              title="Better By Design 2026 — Live Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ) : (
          <div
            className="w-full flex-shrink-0 flex items-center justify-center bg-white/10 rounded-sm"
            style={{ aspectRatio: '16 / 9' }}
          >
            <div className="text-center">
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/30 translate-x-[2px]" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white/60" style={{ fontSize: '13px' }}>
                Live stream starts {event.liveStartText}
              </p>
            </div>
          </div>
        )}

        {/* Below video */}
        <div className="flex-shrink-0">
          <p className="text-white/80" style={{ fontSize: '13px' }}>{event.date}</p>
          <p className="text-white/60" style={{ fontSize: '12px' }}>{event.location}</p>
        </div>

        {/* Programme */}
        <div className="flex-shrink-0 pt-4 border-t border-white/10">
          <div className="text-[#00A432] uppercase tracking-widest mb-6" style={{ fontSize: '10px', fontWeight: 600 }}>
            Programme
          </div>
          <AgendaList />
          <div style={{ height: '48px' }} />
        </div>
      </main>

      {/* Footer bar */}
      <div
        className="page-x flex items-center justify-between border-t border-white/10 text-white/60 flex-shrink-0"
        style={{ height: '48px', fontSize: '12px' }}
      >
        <span>Better By Design 2026</span>
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
      </div>

    </div>
    <Suspense>
      <Drawers />
    </Suspense>
    </>
  )
}
