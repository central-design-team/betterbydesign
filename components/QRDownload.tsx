'use client'

interface Props {
  svg: string
  filename: string
}

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

export default function QRDownload({ svg, filename }: Props) {
  const downloadSvg = () => {
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `${filename}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadPng = () => {
    const SIZE = 600
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url  = URL.createObjectURL(blob)
    const img  = new window.Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width  = SIZE
      canvas.height = SIZE
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, SIZE, SIZE)
      const a    = document.createElement('a')
      a.download = `${filename}.png`
      a.href     = canvas.toDataURL('image/png')
      a.click()
      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  return (
    <div className="mt-4 flex items-center gap-4">
      <button
        onClick={downloadSvg}
        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
        style={{ fontSize: '13px' }}
      >
        <DownloadIcon />
        SVG
      </button>
      <button
        onClick={downloadPng}
        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
        style={{ fontSize: '13px' }}
      >
        <DownloadIcon />
        PNG
      </button>
    </div>
  )
}
