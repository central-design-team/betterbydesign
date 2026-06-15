'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { img } from '@/lib/img'

const IMAGES = [
  {
    src: img('/images/gallery-1.webp'),
    alt: 'Workshop participants collaborating with sticky notes on a board',
    caption: null,
  },
  {
    src: img('/images/gallery-2.webp'),
    alt: 'Students working at a table during NCAD MA Service Design programme',
    caption: 'NCAD MA Service Design',
  },
]

const INTERVAL = 4000

export default function MediaSection() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const id = setInterval(() => setActive(i => (i + 1) % IMAGES.length), INTERVAL)
    return () => clearInterval(id)
  }, [started])

  return (
    <div id="media" ref={sectionRef} className="px-4 pb-4">
    <div className="relative w-full overflow-hidden aspect-[4/3] sm:aspect-[6/4] lg:aspect-[16/9] lg:max-h-[80vh]">
      {IMAGES.map((image, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={i !== active}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={i === 0}
          />
          {image.caption && (
            <span
              className="absolute bottom-2 right-3 text-white/80 select-none pointer-events-none"
              style={{ fontSize: '10px' }}
            >
              {image.caption}
            </span>
          )}
        </div>
      ))}
    </div>
    </div>
  )
}
