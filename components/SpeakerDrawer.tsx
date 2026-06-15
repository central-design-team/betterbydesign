'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import { speakerProfiles } from '@/content/site'
import { img } from '@/lib/img'
import { lockScroll, unlockScroll } from '@/lib/scroll-lock'

export default function SpeakerDrawer() {
  const searchParams = useSearchParams()
  const router       = useRouter()
  const pathname     = usePathname()
  const panelRef     = useRef<HTMLDivElement>(null)
  const [copied,     setCopied]     = useState(false)

  const panel = searchParams.get('panel')

  // Three ways a speaker can be active:
  //   1. /speakers/slug                 — clean URL (canonical)
  //   2. /?panel=speaker&id=slug        — legacy standalone
  //   3. /?panel=agenda&speaker=slug    — side-by-side alongside the agenda
  const pathSlug      = pathname?.match(/^\/speakers\/([^/]+)/)?.[1] ?? null
  const standaloneId  = panel === 'speaker' ? searchParams.get('id') : null
  const sideBySideId  = panel === 'agenda'  ? searchParams.get('speaker') : null
  const speakerId     = pathSlug ?? standaloneId ?? sideBySideId
  const isSideBySide  = !!sideBySideId

  const isActive = !!speakerId

  const [mounted,      setMounted]      = useState(false)
  const [open,         setOpen]         = useState(false)
  const [currentSlug,  setCurrentSlug]  = useState(speakerId)
  const [contentPhase, setContentPhase] = useState<'idle' | 'out' | 'in'>('idle')
  const isOpenRef = useRef(false)

  const handleClose = useCallback(() => {
    router.push('/', { scroll: false })
  }, [router])

  const handleShare = useCallback(async (profile: (typeof speakerProfiles)[string]) => {
    const slug = currentSlug
    if (!slug || !profile) return
    const url = `${window.location.origin}/speakers/${slug}/`
    const org = profile.organisation ? ` at ${profile.organisation}` : ''
    const shareData = {
      title: `${profile.name} — Better By Design 2026`,
      text: `Meet ${profile.name}, ${profile.role}${org}. Speaking at Better By Design 2026 — 18 June 2026, The Lighthouse, Dublin.`,
      url,
    }
    if (navigator.share && navigator.canShare?.(shareData)) {
      try { await navigator.share(shareData) } catch { /* dismissed */ }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [currentSlug])


  const handleBack = useCallback(() => {
    router.back()
  }, [router])

  // Sync open state to ref so the speakerId effect can read it without being in deps
  useEffect(() => { isOpenRef.current = open }, [open])

  // Handle drawer open / close
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

  // Handle speaker change — immediate on first open, animated while already open
  useEffect(() => {
    if (!speakerId) return
    if (!isOpenRef.current) {
      setCurrentSlug(speakerId)
      return
    }
    // Drawer already open: slide current content out, swap slug, slide new content in
    setContentPhase('out')
    const t = setTimeout(() => {
      setCurrentSlug(speakerId)
      setContentPhase('in')
      requestAnimationFrame(() => requestAnimationFrame(() => setContentPhase('idle')))
    }, 160)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speakerId])

  useEffect(() => () => { if (isActive) unlockScroll() }, [isActive])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, handleClose])

  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  if (!mounted) return null

  const profile = currentSlug ? speakerProfiles[currentSlug] : null
  if (!profile) return null

  const bioParagraphs = profile.bio ? profile.bio.split('\n\n') : []

  // In side-by-side mode the speaker slides out from behind the agenda (translate right → 0)
  // Lower z-index so the agenda panel sits on top
  return (
    <>
      {/* Backdrop — standalone always; side-by-side on mobile only */}
      <div
        aria-hidden="true"
        onClick={isSideBySide ? handleBack : handleClose}
        className={[
          'fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm transition-opacity duration-300',
          isSideBySide ? 'md:hidden' : '',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="speaker-drawer-name"
        className={[
          'fixed inset-y-0 flex flex-col w-full outline-none transition-transform duration-300 ease-out',
          isSideBySide
            ? 'right-0 md:right-[36rem] md:max-w-xs z-[130] md:z-[105] bg-[#161616]'
            : 'right-0 md:max-w-sm z-[130] bg-[#1E1E1E]',
          open ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Header — standalone always; side-by-side on mobile only */}
        <div
          className={[
            'flex items-center justify-between px-6 border-b border-white/10 flex-shrink-0',
            isSideBySide ? 'md:hidden' : '',
          ].join(' ')}
          style={{ height: '56px' }}
        >
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
            aria-label="Back"
            style={{ fontSize: '13px' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          <div className="flex items-center gap-3">
            {profile && (
              <button
                onClick={() => handleShare(profile)}
                aria-label="Share speaker"
                className="flex items-center gap-1.5 text-white/40 hover:text-white transition-colors"
                style={{ fontSize: '12px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                {copied ? 'Copied' : 'Share'}
              </button>
            )}
            <button
              onClick={handleClose}
              aria-label="Close"
              className="text-white/40 hover:text-white transition-colors p-1 -mr-1"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div
          className={[
            'flex-1 overflow-y-auto px-6 transition-[opacity,transform] duration-[160ms] ease-out',
            isSideBySide ? 'pt-[72px] pb-8' : 'py-8',
            contentPhase === 'out' ? 'opacity-0 translate-x-3'  : '',
            contentPhase === 'in'  ? 'opacity-0 -translate-x-3' : '',
            contentPhase === 'idle' ? 'opacity-100 translate-x-0' : '',
          ].join(' ')}
        >
          {/* Portrait image */}
          {profile.image && (
            <div
              className="overflow-hidden mb-6 flex-shrink-0"
              style={{ width: '96px', aspectRatio: '4 / 5', backgroundColor: '#2a2820' }}
            >
              <Image
                src={img(profile.image)}
                alt={profile.name}
                width={96}
                height={120}
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(100%) sepia(40%) brightness(85%)' }}
              />
            </div>
          )}

          {/* Name */}
          <h2
            id="speaker-drawer-name"
            className="font-semibold text-white leading-tight"
            style={{ fontSize: '20px' }}
          >
            {profile.name}
          </h2>

          {/* Role + org */}
          <p className="mt-1 text-white/70 leading-snug" style={{ fontSize: '13px' }}>
            {profile.role}
            {profile.organisation ? `, ${profile.organisation}` : ''}
          </p>

          {/* Bio */}
          {bioParagraphs.length > 0 && (
            <div className="mt-6 flex flex-col gap-4">
              {bioParagraphs.map((para, i) => (
                <p key={i} className="text-white/85 leading-relaxed" style={{ fontSize: '14px' }}>
                  {para}
                </p>
              ))}
            </div>
          )}

          {/* LinkedIn + Share */}
          <div className="mt-6 flex items-center gap-4">
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${profile.name} on LinkedIn`}
                className="text-white/40 hover:text-white transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
            <button
              onClick={() => handleShare(profile)}
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-white transition-colors duration-200"
              style={{ fontSize: '13px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              {copied ? 'Copied' : 'Share'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
