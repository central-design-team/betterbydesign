'use client'

import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { navigation, event } from '@/content/site'

import { lockScroll, unlockScroll } from '@/lib/scroll-lock'

function WatchLiveLink({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <Link href="/live" className={`inline-flex items-center gap-2 no-underline font-normal ${className ?? ''}`} style={style}>
      {event.isLive && (
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
      )}
      {event.isLive ? 'Watch Live' : 'Live Stream'}
    </Link>
  )
}

const isClientNav = (href: string) => href.startsWith('/?')

const SECTION_IDS = ['ministers', 'keynotes', 'themes', 'panellists']

// ─── Desktop nav (needs Suspense for useSearchParams) ─────────────────────────
function NavItems() {
  const searchParams = useSearchParams()
  const [activeId,    setActiveId]    = useState<string | null>(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const panelOpen = !!searchParams.get('panel')

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-56px 0px -50% 0px', threshold: 0 }
      )
      io.observe(el)
      observers.push(io)
    })
    return () => observers.forEach((io) => io.disconnect())
  }, [])

  const showActive = hasScrolled && !panelOpen

  return (
    <ul className="flex items-center gap-6 md:gap-8 list-none m-0 p-0">
      {navigation.map((item) => {
        const sectionId = item.href.replace('#', '')
        const isActive  = showActive && activeId === sectionId
        const cls = [
          'text-white no-underline font-normal transition-opacity duration-300 ease-out hover:opacity-100',
          showActive && activeId && !isActive ? 'opacity-30' : 'opacity-100',
        ].join(' ')

        return (
          <li key={item.label}>
            {isClientNav(item.href) ? (
              <Link href={item.href} scroll={false} className={cls} style={{ fontSize: '18px' }}>
                {item.label}
              </Link>
            ) : (
              <a href={item.href} className={cls} style={{ fontSize: '18px' }}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {item.label}
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )
}

// ─── Burger icon ──────────────────────────────────────────────────────────────
function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col gap-[5px] w-5" aria-hidden="true">
      <span className={`block h-[2px] w-full bg-white origin-center transition-transform duration-200 ease-out ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
      <span className={`block h-[2px] w-full bg-white ${open ? 'opacity-0' : 'opacity-100 transition-opacity duration-150 ease-out'}`} />
      <span className={`block h-[2px] w-full bg-white origin-center transition-transform duration-200 ease-out ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
    </span>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────
export default function Header() {
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [navVisible,  setNavVisible]  = useState(true)

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 640) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when menu is open — compensate for scrollbar width to prevent layout shift
  useEffect(() => {
    if (menuOpen) {
      const sw = window.innerWidth - document.documentElement.clientWidth
      document.body.style.paddingRight = sw ? `${sw}px` : ''
      lockScroll()
    } else {
      document.body.style.paddingRight = ''
      unlockScroll()
    }
    return () => {
      document.body.style.paddingRight = ''
    }
  }, [menuOpen])

  // Hide nav on scroll-down (mobile only), show on scroll-up or 3s idle
  useEffect(() => {
    let lastY = window.scrollY
    let idleTimer: ReturnType<typeof setTimeout>

    const onScroll = () => {
      const y = window.scrollY
      if (y < 80) {
        setNavVisible(true)
      } else if (y > lastY) {
        setNavVisible(false)
      } else {
        setNavVisible(true)
      }
      lastY = y
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => setNavVisible(true), 3000)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(idleTimer)
    }
  }, [])

  return (
    <>
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-50 bg-bbd-black transition-transform duration-300 ${!navVisible && !menuOpen ? '-translate-y-full sm:translate-y-0' : 'translate-y-0'}`}
        style={{ height: '56px' }}
        role="banner"
      >
        <div className="flex items-center justify-between h-full page-x">
          <Link
            href="/"
            className="text-white no-underline font-semibold tracking-tight"
            style={{ fontSize: '18px' }}
            aria-label={`${event.name} — return to top`}
          >
            {event.name} <span className="font-normal">{event.year}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6 md:gap-8" aria-label="Primary navigation">
            <Suspense fallback={null}>
              <NavItems />
            </Suspense>
            <WatchLiveLink className="text-white" style={{ fontSize: '18px' }} />
          </nav>

          {/* Mobile burger */}
          <button
            className="sm:hidden flex items-center justify-center p-1 -mr-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`sm:hidden fixed inset-0 z-40 bg-bbd-black flex flex-col page-x pb-safe transition-opacity duration-200 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ paddingTop: '56px' }}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col list-none m-0 p-0 pt-10 gap-1" role="list">
          {navigation.map((item) => (
            <li key={item.label}>
              {isClientNav(item.href) ? (
                <Link
                  href={item.href}
                  scroll={false}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white no-underline font-normal py-3"
                  style={{ fontSize: '24px' }}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white no-underline font-normal py-3"
                  style={{ fontSize: '24px' }}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6 pb-8">
          <Link
            href="/live"
            onClick={() => setMenuOpen(false)}
            className="flex items-stretch bg-white overflow-hidden no-underline"
            style={{ borderRadius: '10px' }}
          >
            <div className="relative flex-shrink-0 self-stretch bg-black" style={{ width: '100px' }}>
              {event.isLive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center justify-center rounded-full border border-white/30" style={{ width: '28px', height: '28px' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col justify-center px-3 py-3">
              {event.isLive ? (
                <>
                  <p className="font-semibold text-bbd-black leading-tight" style={{ fontSize: '13px' }}>Watch Live</p>
                  <p className="mt-1 text-bbd-black/60 leading-snug" style={{ fontSize: '11px' }}>Better By Design 2026 is live now.</p>
                  <span className="mt-2 inline-flex items-center gap-1 font-medium text-bbd-black/70" style={{ fontSize: '11px' }}>
                    Watch now
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
                  </span>
                </>
              ) : (
                <>
                  <p className="font-semibold text-bbd-black leading-tight" style={{ fontSize: '13px' }}>Live Stream</p>
                  <p className="mt-1 text-bbd-black/60 leading-snug" style={{ fontSize: '11px' }}>Starts {event.liveStartText}</p>
                  <span className="mt-2 inline-flex items-center gap-1 font-medium text-bbd-black/70" style={{ fontSize: '11px' }}>
                    Watch on the day
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
                  </span>
                </>
              )}
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
