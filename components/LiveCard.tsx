'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { event } from '@/content/site'
import { img } from '@/lib/img'

interface Props {
  onDismiss?: (e: React.MouseEvent) => void
}

export default function LiveCard({ onDismiss }: Props) {
  const [isActuallyLive, setIsActuallyLive] = useState(false)

  useEffect(() => {
    const check = () => setIsActuallyLive(new Date() >= new Date(event.liveStartTime))
    check()
    const t = setInterval(check, 30_000)
    return () => clearInterval(t)
  }, [])

  const showLive = event.isLive && isActuallyLive

  return (
    <>
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 self-stretch bg-black w-[36%] sm:w-[120px]">
        {event.liveThumbUrl && (
          <Image
            src={img(event.liveThumbUrl)}
            alt="Live stream thumbnail"
            fill
            className="object-cover"
          />
        )}
        {showLive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center rounded-full border border-white/30 w-8 h-8 sm:w-7 sm:h-7">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 flex flex-col justify-center px-4 py-4 sm:px-3 sm:py-3 ${onDismiss ? 'pr-8 sm:pr-7' : ''}`}>
        {showLive ? (
          <>
            <p className="font-semibold text-bbd-black leading-tight text-[15px] sm:text-[13px]">Watch Live</p>
            <p className="mt-1 text-bbd-black/60 leading-snug text-[13px] sm:text-[11px]">Better By Design 2026 is live now.</p>
            <span className="mt-2 inline-flex items-center gap-1 font-medium text-bbd-black/70 text-[13px] sm:text-[11px]">
              Watch now
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </>
        ) : (
          <>
            <p className="font-semibold text-bbd-black leading-tight text-[15px] sm:text-[13px]">Live Stream</p>
            <p className="mt-1 text-bbd-black/60 leading-snug text-[13px] sm:text-[11px]">Starts {event.liveStartText}</p>
            <span className="mt-2 inline-flex items-center gap-1 font-medium text-bbd-black/70 text-[13px] sm:text-[11px]">
              Watch on the day
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </>
        )}
      </div>

      {/* Dismiss */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-2 right-2 flex items-center justify-center text-black/50 hover:text-black/80 transition-colors"
          style={{ width: '20px', height: '20px' }}
          aria-label="Dismiss"
        >
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </>
  )
}
