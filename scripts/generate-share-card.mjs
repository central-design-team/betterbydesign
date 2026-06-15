/**
 * Generates a 1200×630 share card PNG for a speaker.
 * Usage: node scripts/generate-share-card.mjs
 */

import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT      = join(__dirname, '..')

// ── Fonts ─────────────────────────────────────────────────────────────
GlobalFonts.registerFromPath(join(__dirname, 'fonts/IBMPlexSans-Regular.ttf'),  'IBMPlex')
GlobalFonts.registerFromPath(join(__dirname, 'fonts/IBMPlexSans-SemiBold.ttf'), 'IBMPlexBold')

// ── Speaker data (one test) ───────────────────────────────────────────
const speaker = {
  name:        'Jack Chambers TD',
  role:        'Minister for Public Expenditure, Infrastructure,\nPublic Service Reform and Digitalisation',
  time:        '9:30',
  sessionType: 'Opening Address',
  image:       join(ROOT, 'public/images/jack-chambers.jpg'),
  filename:    'jack-chambers-td.png',
}

// ── Palette ───────────────────────────────────────────────────────────
const GREEN = '#00A432'
const GOLD  = '#8D844E'
const DARK  = '#1E1E1E'

// ── Canvas ────────────────────────────────────────────────────────────
const W = 1200
const H = 630
const canvas = createCanvas(W, H)
const ctx    = canvas.getContext('2d')

// White background
ctx.fillStyle = '#FFFFFF'
ctx.fillRect(0, 0, W, H)

// ── Right-side geometric blocks ───────────────────────────────────────
const BX = 740  // where blocks start

// Large green square (top-left of block area)
ctx.fillStyle = GREEN
ctx.fillRect(BX, 110, 255, 235)

// Dark block (right — sits behind photo)
ctx.fillStyle = DARK
ctx.fillRect(1050, 215, W - 1050, 345)

// Small green block (bottom-left)
ctx.fillStyle = GREEN
ctx.fillRect(BX + 95, 490, 145, 145)

// Dark medium block (bottom-centre)
ctx.fillStyle = DARK
ctx.fillRect(BX + 245, 505, 255, 130)

// Gold block (bottom-right, bleeds off edge)
ctx.fillStyle = GOLD
ctx.fillRect(1070, 545, W - 1070, H - 545)

// ── Gold corner block (top-right) ────────────────────────────────────
ctx.fillStyle = GOLD
ctx.fillRect(940, 0, W - 940, 92)

// "Better By Design" in the gold block
ctx.fillStyle = '#FFFFFF'
ctx.font      = 'bold 20px IBMPlexBold'
ctx.textBaseline = 'top'
ctx.fillText('Better', 960, 14)
ctx.fillText('By Design', 960, 38)

ctx.font = '14px IBMPlex'
ctx.fillText('Public Service',    1080, 14)
ctx.fillText('Design Showcase',   1080, 32)
ctx.fillText('& Conference',      1080, 50)

// ── Speaker photo (grayscale) ─────────────────────────────────────────
const img    = await loadImage(speaker.image)
const PX     = 990
const PY     = 170
const PW     = 295
const PH     = 400

ctx.save()
ctx.beginPath()
ctx.rect(PX, PY, PW, PH)
ctx.clip()
ctx.drawImage(img, PX, PY, PW, PH)

// Grayscale pixel manipulation
const id   = ctx.getImageData(PX, PY, PW, PH)
const data = id.data
for (let i = 0; i < data.length; i += 4) {
  const lum = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
  data[i] = data[i + 1] = data[i + 2] = lum
}
ctx.putImageData(id, PX, PY)
ctx.restore()

// ── Left text ─────────────────────────────────────────────────────────

// Time + session type
ctx.fillStyle    = GREEN
ctx.font         = '600 22px IBMPlexBold'
ctx.textBaseline = 'alphabetic'
ctx.letterSpacing = '0.08em'
ctx.fillText(
  `${speaker.time} | ${speaker.sessionType.toUpperCase()}`,
  80, 250
)
ctx.letterSpacing = '0'

// Name — fit to available width (~640px)
const maxNameWidth = 630
let nameFontSize   = 86
ctx.font = `bold ${nameFontSize}px IBMPlexBold`
while (ctx.measureText(speaker.name).width > maxNameWidth && nameFontSize > 48) {
  nameFontSize -= 2
  ctx.font = `bold ${nameFontSize}px IBMPlexBold`
}
ctx.fillStyle = DARK
ctx.fillText(speaker.name, 80, 365)

// Role (pre-split on \n)
ctx.fillStyle = '#666666'
ctx.font      = '400 24px IBMPlex'
const roleLines = speaker.role.split('\n')
roleLines.forEach((line, i) => {
  ctx.fillText(line, 80, 435 + i * 36)
})

// ── Save ──────────────────────────────────────────────────────────────
const outPath = join(ROOT, 'public/images/share-cards', speaker.filename)
writeFileSync(outPath, canvas.toBuffer('image/png'))
console.log(`✓  ${outPath}`)
