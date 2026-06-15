'use client'

import { useState } from 'react'
import Link from 'next/link'
import { navigation } from '@/content/site'

import LiveShareButton from '@/components/LiveShareButton'

// Anchor links need / prefix to reach home page; query-string links strip the leading /
const resolveHref = (href: string) => {
  if (href.startsWith('#'))  return `/${href}`      // #ministers  → /#ministers
  if (href.startsWith('/?')) return href.slice(1)   // /?panel=... → ?panel=...
  return href
}
const isQueryNav = (href: string) => href.startsWith('/?')

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col gap-[5px] w-5" aria-hidden="true">
      <span className={`block h-[2px] w-full bg-white origin-center transition-transform duration-200 ease-out ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
      <span className={`block h-[2px] w-full bg-white ${open ? 'opacity-0' : 'opacity-100 transition-opacity duration-150 ease-out'}`} />
      <span className={`block h-[2px] w-full bg-white origin-center transition-transform duration-200 ease-out ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
    </span>
  )
}

interface Props {
  shareTitle?: string
  shareText?: string
}

export default function LiveHeader({ shareTitle, shareText }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header
        className="relative z-50 page-x flex items-center justify-between flex-shrink-0 border-b border-white/10"
        style={{ height: '56px' }}
      >
        <Link href="/" className="font-semibold text-white no-underline tracking-tight" style={{ fontSize: '18px' }}>
          Better By Design <span className="font-normal">2026</span>
        </Link>
        <div className="flex items-center gap-5">
          <LiveShareButton title={shareTitle} text={shareText} />
          <button
            className="flex items-center justify-center p-1 -mr-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </div>
      </header>

      {/* Mobile: full-screen overlay */}
      <div
        className={`sm:hidden fixed inset-0 z-40 bg-bbd-black flex flex-col page-x transition-opacity duration-200 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ paddingTop: '56px' }}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col list-none m-0 p-0 pt-10 gap-1" role="list">
          {navigation.map((item) => (
            <li key={item.label}>
              {isQueryNav(item.href) ? (
                <Link
                  href={resolveHref(item.href)}
                  scroll={false}
                  onClick={() => setTimeout(() => setMenuOpen(false), 350)}
                  className="block text-white no-underline font-normal py-3"
                  style={{ fontSize: '24px' }}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={resolveHref(item.href)}
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
      </div>

      {/* Desktop: slide-in drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        aria-hidden={!menuOpen}
        className={`hidden sm:flex fixed inset-y-0 right-0 z-50 flex-col w-64 bg-bbd-black transition-transform duration-300 ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-end px-6 flex-shrink-0" style={{ height: '56px' }}>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="text-white/40 hover:text-white transition-colors p-1 -mr-1"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col list-none m-0 p-0 px-6 pt-2" role="list">
          {navigation.map((item) => (
            <li key={item.label}>
              {isQueryNav(item.href) ? (
                <Link
                  href={resolveHref(item.href)}
                  scroll={false}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white no-underline font-normal py-4"
                  style={{ fontSize: '18px' }}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={resolveHref(item.href)}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white no-underline font-normal py-4"
                  style={{ fontSize: '18px' }}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`hidden sm:block fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  )
}
