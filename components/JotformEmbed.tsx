'use client'

import { useEffect, useRef, useState } from 'react'

export default function JotformEmbed({ formId }: { formId: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Watch for the iframe Jotform injects, then listen for its load event
    const observer = new MutationObserver(() => {
      const iframe = el.querySelector('iframe')
      if (!iframe) return
      observer.disconnect()
      iframe.addEventListener('load', () => setLoaded(true), { once: true })
      // If it already loaded before we attached the listener
      if (iframe.contentDocument?.readyState === 'complete') setLoaded(true)
    })
    observer.observe(el, { childList: true, subtree: true })

    const script = document.createElement('script')
    script.src = `https://form.jotform.com/jsform/${formId}`
    script.type = 'text/javascript'
    el.appendChild(script)

    return () => observer.disconnect()
  }, [formId])

  return (
    <div className="relative flex-1 flex flex-col">
      {/* Loader */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full border-2 border-white/20 animate-spin"
            style={{ width: 28, height: 28, borderTopColor: 'white' }}
            aria-label="Loading"
          />
        </div>
      )}
      <div ref={ref} className={loaded ? '' : 'invisible'} />
    </div>
  )
}
