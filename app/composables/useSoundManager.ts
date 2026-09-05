import { ref } from 'vue'

const isMuted = ref(false)
let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (!import.meta.client) return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function useSoundManager() {
  function toggleMute() {
    isMuted.value = !isMuted.value
    if (import.meta.client) {
      try {
        localStorage.setItem('usaidh:os_muted', String(isMuted.value))
      } catch {
        // ignore
      }
    }
  }

  function initSound() {
    if (import.meta.client) {
      try {
        const saved = localStorage.getItem('usaidh:os_muted')
        if (saved !== null) {
          isMuted.value = saved === 'true'
        }
      } catch {
        // ignore
      }
    }
  }

  // Tactile button click
  function playClick() {
    if (isMuted.value) return
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, now)
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.03)

    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.03)
  }

  // Window open chime
  function playOpen() {
    if (isMuted.value) return
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const notes = [523.25, 659.25, 783.99] // C5, E5, G5

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + i * 0.04)

      gain.gain.setValueAtTime(0.06, now + i * 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.18)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + i * 0.04)
      osc.stop(now + i * 0.04 + 0.18)
    })
  }

  // Window close tone
  function playClose() {
    if (isMuted.value) return
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(440, now)
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.08)

    gain.gain.setValueAtTime(0.07, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.08)
  }

  // Window minimize sound
  function playMinimize() {
    if (isMuted.value) return
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const notes = [659.25, 523.25, 392]

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, now + i * 0.03)

      gain.gain.setValueAtTime(0.05, now + i * 0.03)
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.03 + 0.1)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + i * 0.03)
      osc.stop(now + i * 0.03 + 0.1)
    })
  }

  // Nostalgic startup chord
  function playStartup() {
    if (isMuted.value) return
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const chord = [261.63, 329.63, 392.00, 523.25, 659.25] // C major sweep

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + i * 0.06)

      gain.gain.setValueAtTime(0.08, now + i * 0.06)
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.8)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + i * 0.06)
      osc.stop(now + i * 0.06 + 0.8)
    })
  }

  return {
    isMuted,
    toggleMute,
    initSound,
    playClick,
    playOpen,
    playClose,
    playMinimize,
    playStartup
  }
}
