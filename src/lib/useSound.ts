import { useCallback, useRef, useState } from 'react'

/** Tiny, muted-by-default sound: soft plucked notes generated with WebAudio (no assets). */
export function useSound() {
  const [muted, setMuted] = useState(true)
  const ctx = useRef<AudioContext | null>(null)

  const play = useCallback(
    (freq = 523.25, dur = 0.5) => {
      if (muted) return
      try {
        ctx.current ??= new AudioContext()
        const c = ctx.current
        const o = c.createOscillator()
        const g = c.createGain()
        o.type = 'sine'
        o.frequency.value = freq
        g.gain.setValueAtTime(0.0001, c.currentTime)
        g.gain.exponentialRampToValueAtTime(0.06, c.currentTime + 0.02)
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur)
        o.connect(g).connect(c.destination)
        o.start()
        o.stop(c.currentTime + dur)
      } catch {
        /* audio unavailable */
      }
    },
    [muted],
  )

  const toggle = useCallback(() => {
    setMuted((m) => {
      if (m) {
        // first user gesture unlocks audio; play a gentle confirmation
        try {
          ctx.current ??= new AudioContext()
          void ctx.current.resume()
        } catch {
          /* noop */
        }
      }
      return !m
    })
  }, [])

  return { muted, toggle, play }
}
