'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LiveCard from '@/components/LiveCard'
import { event } from '@/content/site'

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

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault()
    localStorage.setItem(STORAGE_KEY, '1')
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      className="fixed left-4 right-4 z-30 sm:left-auto sm:right-4 sm:w-[300px]"
      style={{
        bottom: entered ? '1rem' : 'calc(1rem - 10px)',
        opacity: opacity * (entered ? 1 : 0),
        transition: 'opacity 400ms ease, bottom 400ms ease',
        pointerEvents: opacity < 0.05 ? 'none' : 'auto',
      }}
    >
      <Link
        href="/live"
        className="relative flex items-stretch bg-white overflow-hidden no-underline w-full"
        style={{ borderRadius: '10px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}
      >
        <LiveCard onDismiss={dismiss} />
      </Link>
    </div>
  )
}
