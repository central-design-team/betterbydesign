'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { event } from '@/content/site'
import { img } from '@/lib/img'

// Separate storage keys so dismissing the pre-live banner doesn't suppress the live one
const STORAGE_KEY = event.isLive ? 'bbd-banner-live' : 'bbd-banner-pre'

export default function LiveBanner() {
  const [show,    setShow]    = useState(false)
  const [entered, setEntered] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setShow(true)
      setTimeout(() => setEntered(true), 1200)
    }
  }, [])

  useEffect(() => {
    if (!show) return
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [show])

  const opacity = Math.max(0, 1 - scrollY / 240)

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setShow(false)
  }

  if (!show) return null

  return (
    <Link
      href="/live"
      className="fixed bottom-4 left-[5vw] right-[5vw] z-30 flex items-stretch bg-white overflow-hidden no-underline sm:left-auto sm:right-4 sm:w-[300px]"
      style={{
        borderRadius: '10px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        opacity: opacity * (entered ? 1 : 0),
        transform: `translateY(${entered ? 0 : 8}px)`,
        transition: 'opacity 400ms ease, transform 400ms ease',
        pointerEvents: opacity < 0.05 ? 'none' : 'auto',
      }}
    >
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
        {event.isLive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="flex items-center justify-center rounded-full border border-white/30"
              style={{ width: '28px', height: '28px' }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-3 py-3 pr-7">
        {event.isLive ? (
          <>
            <p className="font-semibold text-bbd-black leading-tight" style={{ fontSize: '13px' }}>
              Watch Live
            </p>
            <p className="mt-1 text-bbd-black/60 leading-snug" style={{ fontSize: '11px' }}>
              Better By Design 2026 is live now.
            </p>
            <span className="mt-2 inline-flex items-center gap-1 font-medium text-bbd-black/70" style={{ fontSize: '11px' }}>
              Watch now
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </>
        ) : (
          <>
            <p className="font-semibold text-bbd-black leading-tight" style={{ fontSize: '13px' }}>
              Live Stream
            </p>
            <p className="mt-1 text-bbd-black/60 leading-snug" style={{ fontSize: '11px' }}>
              Starts {event.liveStartText}
            </p>
            <span className="mt-2 inline-flex items-center gap-1 font-medium text-bbd-black/70" style={{ fontSize: '11px' }}>
              Watch on the day
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </>
        )}
      </div>

      {/* Dismiss */}
      <button
        onClick={(e) => { e.preventDefault(); dismiss() }}
        className="absolute top-2 right-2 flex items-center justify-center text-black/50 hover:text-black/80 transition-colors"
        style={{ width: '20px', height: '20px' }}
        aria-label="Dismiss"
      >
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </Link>
  )
}
