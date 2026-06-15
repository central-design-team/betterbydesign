let count = 0

export function lockScroll() {
  if (count === 0) {
    const scrollY = window.scrollY
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow             = 'hidden'
    document.body.style.position             = 'fixed'
    document.body.style.top                  = `-${scrollY}px`
    document.body.style.width                = '100%'
  }
  count++
}

export function unlockScroll() {
  count = Math.max(0, count - 1)
  if (count === 0) {
    const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10))
    document.documentElement.style.overflow = ''
    document.body.style.overflow             = ''
    document.body.style.position             = ''
    document.body.style.top                  = ''
    document.body.style.width                = ''
    window.scrollTo(0, scrollY)
  }
}
