let count = 0

export function lockScroll() {
  if (count === 0) {
    document.documentElement.style.setProperty('overflow', 'hidden')
  }
  count++
}

export function unlockScroll() {
  if (count <= 0) return
  count--
  if (count === 0) {
    document.documentElement.style.removeProperty('overflow')
  }
}
