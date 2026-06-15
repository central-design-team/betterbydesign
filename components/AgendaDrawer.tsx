'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import AgendaList from '@/components/AgendaList'
import { lockScroll, unlockScroll } from '@/lib/scroll-lock'

// ─── Drawer ────────────────────────────────────────────────────────────────────
export default function AgendaDrawer() {
  const searchParams = useSearchParams()
  const pathname     = usePathname()
  const router       = useRouter()
  const panelRef    = useRef<HTMLDivElement>(null)

  const panel    = searchParams.get('panel')
  const isActive = panel === 'agenda'

  const [mounted, setMounted] = useState(false)
  const [open,    setOpen]    = useState(false)

  const handleClose = useCallback(() => {
    // /agenda exists purely to open the drawer — closing should return home
    const dest = pathname === '/agenda' ? '/' : pathname
    router.push(dest, { scroll: false })
  }, [router, pathname])

  useEffect(() => {
    if (isActive) {
      setMounted(true)
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))
      lockScroll()
      return () => cancelAnimationFrame(id)
    } else {
      setOpen(false)
      unlockScroll()
      const t = setTimeout(() => setMounted(false), 350)
      return () => clearTimeout(t)
    }
  }, [isActive])

  useEffect(() => () => { if (isActive) unlockScroll() }, [isActive])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, handleClose])

  useEffect(() => {
    if (open) panelRef.current?.focus({ preventScroll: true })
  }, [open])

  if (!mounted) return null

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={handleClose}
        className={`fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Conference Programme"
        className={`fixed inset-y-0 right-0 z-[110] flex flex-col w-full md:max-w-xl bg-[#1E1E1E] outline-none transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 md:px-8 border-b border-white/10 flex-shrink-0"
          style={{ height: '56px' }}
        >
          <span className="font-semibold text-white" style={{ fontSize: '15px' }}>
            Programme
          </span>
          <button
            onClick={handleClose}
            aria-label="Close programme"
            className="text-white/40 hover:text-white transition-colors p-1 -mr-1"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8">
          <AgendaList showImages />
          <div style={{ height: '48px' }} />
        </div>
      </div>
    </>
  )
}
