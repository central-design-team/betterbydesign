'use client'

import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

// ─── Colours ──────────────────────────────────────────────────────────────────
const GREEN  = '#00A432'
const GOLD   = '#8D844E'
const BLACK  = '#1E1E1E'
const WHITE  = '#ffffff'

// ─── Layout variants ─────────────────────────────────────────────────────────
// Each block: [xFrac, yFrac, wFrac, hFrac, color]
// All values are fractions of canvas width/height (0–1).

type BlockDef = [number, number, number, number, string]
type Variant = BlockDef[]

const VARIANTS: Variant[] = [
  // ── Variant 1 — from the design reference (1512×453 SVG) ─────────────────
  [
    [0,      0,      0.2096, 0.3333, GOLD],
    [0.4444, 0,      0.2633, 0.3333, GOLD],
    [0.9113, 0,      0.0887, 0.3333, GREEN],
    [0.0998, 0.3333, 0.3447, 0.3333, GREEN],
    [0.7079, 0.3333, 0.2924, 0.3333, GREEN],
    [0,      0.6667, 0.0998, 0.3333, BLACK],
    [0.2804, 0.6667, 0.2639, 0.3333, GREEN],
  ],
  // ── Variant 2 ─────────────────────────────────────────────────────────────
  [
    [0,      0,      0.1984, 0.3333, GOLD],
    [0.3175, 0,      0.2646, 0.3333, WHITE],
    [0.6614, 0,      0.3386, 0.3333, GREEN],
    [0.0992, 0.3333, 0.3307, 0.3333, GREEN],
    [0.5039, 0.3333, 0.0992, 0.3333, BLACK],
    [0.6614, 0.3333, 0.2646, 0.3333, WHITE],
    [0,      0.6667, 0.0992, 0.3333, WHITE],
    [0.1984, 0.6667, 0.2646, 0.3333, GREEN],
    [0.5291, 0.6667, 0.1984, 0.3333, GOLD],
    [0.7937, 0.6667, 0.0992, 0.3333, GREEN],
  ],
]

// ─── Easing ───────────────────────────────────────────────────────────────────
const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4)

// ─── Rendered block (resolved to pixels) ─────────────────────────────────────
interface Block {
  x: number; y: number; w: number; h: number
  color: string
  from: 'top' | 'bottom' | 'left' | 'right'
  delay: number
  duration: number
}

function buildBlocks(variant: Variant, W: number, H: number): Block[] {
  return variant.map(([xf, yf, wf, hf, color]) => {
    const x = xf * W, y = yf * H
    const h = hf * H
    const w = Math.max(wf * W, h) // enforce minimum 1:1 aspect ratio per block
    const cx = x + w / 2, cy = y + h / 2
    const distL = cx, distR = W - cx, distT = cy, distB = H - cy
    const min = Math.min(distL, distR, distT, distB)
    const from = min === distL ? 'left' : min === distR ? 'right' : min === distT ? 'top' : 'bottom'
    return {
      x, y, w, h, color, from,
      delay:    (x / W) * 600 + Math.random() * 150,
      duration: 500 + Math.random() * 200,
    }
  })
}

// ─── Component ────────────────────────────────────────────────────────────────
interface Props { className?: string; style?: CSSProperties }

export default function BlockCanvas({ className, style }: Props) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap   = wrapRef.current!
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!

    let raf = 0
    let W = 0, H = 0
    let blocks: Block[] = []
    let hasTriggered = false

    const setup = () => {
      const dpr  = Math.min(window.devicePixelRatio || 1, 2)
      const rect = wrap.getBoundingClientRect()
      W = rect.width; H = rect.height
      if (W === 0 || H === 0) return

      canvas.width  = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width  = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const variant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)]
      blocks = buildBlocks(variant, W, H)
    }

    const drawFrame = (t: number) => {
      ctx.clearRect(0, 0, W, H)
      let active = false

      for (const b of blocks) {
        const localT = (t - b.delay) / b.duration
        if (localT <= 0) { active = true; continue }
        const p = localT >= 1 ? 1 : (active = true, easeOutQuart(localT))
        const clipW = b.w * p, clipH = b.h * p

        ctx.save()
        ctx.beginPath()
        if (b.from === 'left')        ctx.rect(b.x,               b.y, clipW, b.h)
        else if (b.from === 'right')  ctx.rect(b.x + b.w - clipW, b.y, clipW, b.h)
        else if (b.from === 'top')    ctx.rect(b.x, b.y,               b.w, clipH)
        else                          ctx.rect(b.x, b.y + b.h - clipH, b.w, clipH)
        ctx.clip()
        ctx.fillStyle = b.color
        ctx.fillRect(b.x, b.y, b.w, b.h)
        ctx.restore()
      }

      const maxEnd = blocks.reduce((m, b) => Math.max(m, b.delay + b.duration), 0)
      if (active || t < maxEnd) raf = requestAnimationFrame(n => drawFrame(n - start))
    }

    let start = 0
    const play = () => {
      cancelAnimationFrame(raf)
      start = performance.now()
      raf = requestAnimationFrame(n => drawFrame(n - start))
    }

    setup()

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasTriggered) {
        hasTriggered = true
        play()
        io.disconnect()
      }
    }, { threshold: 0.05 })
    io.observe(wrap)

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      setup()
      if (hasTriggered) play()
    })
    ro.observe(wrap)

    return () => {
      io.disconnect()
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className={`relative w-full h-full overflow-hidden bg-white${className ? ` ${className}` : ''}`}
      style={style}
    >
      <canvas ref={canvasRef} className="block" aria-hidden="true" />
    </div>
  )
}
