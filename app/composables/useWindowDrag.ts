import { ref } from 'vue'

export function useWindowDrag(
  onDrag: (x: number, y: number) => void,
  initialPosition: { x: number, y: number }
) {
  const isDragging = ref(false)
  let startPointerX = 0
  let startPointerY = 0
  let startWindowX = initialPosition.x
  let startWindowY = initialPosition.y
  let currentX = initialPosition.x
  let currentY = initialPosition.y
  let rafId: number | null = null

  function onPointerDown(e: PointerEvent) {
    // Only drag on primary mouse button
    if (e.button !== 0) return

    // Prevent text selection during drag
    e.preventDefault()

    const target = e.target as HTMLElement
    // Ignore drag if clicking titlebar control buttons
    if (target.closest('.window-control-btn') || target.closest('button')) {
      return
    }

    isDragging.value = true
    startPointerX = e.clientX
    startPointerY = e.clientY
    startWindowX = currentX
    startWindowY = currentY

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging.value) return

    const deltaX = e.clientX - startPointerX
    const deltaY = e.clientY - startPointerY

    currentX = Math.max(0, Math.min(window.innerWidth - 100, startWindowX + deltaX))
    currentY = Math.max(0, Math.min(window.innerHeight - 80, startWindowY + deltaY))

    if (rafId) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      onDrag(currentX, currentY)
    })
  }

  function onPointerUp() {
    if (!isDragging.value) return
    isDragging.value = false
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    onDrag(currentX, currentY)

    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointercancel', onPointerUp)
  }

  function setPosition(x: number, y: number) {
    currentX = x
    currentY = y
  }

  return {
    isDragging,
    onPointerDown,
    setPosition
  }
}
