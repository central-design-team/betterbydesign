'use client'

import { useState } from 'react'

interface Props {
  title?: string
  text?: string
}

export default function LiveShareButton({
  title = 'Better By Design 2026 — Live Stream',
  text  = 'Watch the Better By Design 2026 conference live — Public Service Design, The Lighthouse, Dublin.',
}: Props) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    const shareData = { title, text, url }

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData)
      } catch {
        // dismissed
      }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
      style={{ fontSize: '13px' }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
      {copied ? 'Link copied' : 'Share'}
    </button>
  )
}
