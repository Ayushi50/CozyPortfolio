import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Muted by default. When enabled: soft UI chimes plus a gentle ambience
 * (breeze + birdsong by day, breeze + crickets by night). All synthesised, no assets.
 */
export function useSound(night: boolean) {
  const [muted, setMuted] = useState(true)
  const ctx = useRef<AudioContext | null>(null)
  const master = useRef<GainNode | null>(null)

  const ensure = useCallback(() => {
    if (!ctx.current) {
      const c = new AudioContext()
      const g = c.createGain()
      g.gain.value = 0.9
      g.connect(c.destination)
      ctx.current = c
      master.current = g
    }
    if (ctx.current.state === 'suspended') void ctx.current.resume()
    return ctx.current
  }, [])

  const tone = useCallback((c: AudioContext, freq: number, dur: number, vol: number, when = 0, type: OscillatorType = 'sine') => {
    const o = c.createOscillator()
    const g = c.createGain()
    const t = c.currentTime + when
    o.type = type
    o.frequency.setValueAtTime(freq, t)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(vol, t + 0.015)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g).connect(master.current ?? c.destination)
    o.start(t)
    o.stop(t + dur + 0.05)
  }, [])

  /** A soft two-partial chime. */
  const play = useCallback(
    (freq = 523.25, dur = 0.6) => {
      if (muted) return
      try {
        const c = ensure()
        tone(c, freq, dur, 0.22)
        tone(c, freq * 1.5, dur * 0.8, 0.1, 0.06, 'triangle')
        tone(c, freq * 2, dur * 0.6, 0.05, 0.12)
      } catch {
        /* audio unavailable */
      }
    },
    [muted, ensure, tone],
  )

  const toggle = useCallback(() => {
    try {
      ensure() // created inside the click so the browser allows playback
    } catch {
      /* audio unavailable */
    }
    setMuted((m) => !m)
  }, [ensure])

  // ambience
  useEffect(() => {
    if (muted || !ctx.current) return
    const c = ctx.current
    const out = master.current ?? c.destination

    // breeze: looped noise through a slowly moving band-pass
    const len = c.sampleRate * 2
    const buf = c.createBuffer(1, len, c.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
    const src = c.createBufferSource()
    src.buffer = buf
    src.loop = true
    const bp = c.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = night ? 380 : 620
    bp.Q.value = 0.7
    const gain = c.createGain()
    gain.gain.value = 0.05
    const lfo = c.createOscillator()
    const lfoGain = c.createGain()
    lfo.frequency.value = 0.13
    lfoGain.gain.value = 0.03
    lfo.connect(lfoGain).connect(gain.gain)
    src.connect(bp).connect(gain).connect(out)
    src.start()
    lfo.start()

    const chirp = () => {
      const t = c.currentTime
      if (night) {
        // crickets: quick triplet of high pulses
        for (let i = 0; i < 3; i++) tone(c, 4300 + Math.random() * 200, 0.05, 0.035, i * 0.07, 'square')
      } else {
        // bird: two short rising notes
        const base = 2000 + Math.random() * 1200
        for (let i = 0; i < 2; i++) {
          const o = c.createOscillator()
          const g = c.createGain()
          const s = t + i * 0.13
          o.frequency.setValueAtTime(base, s)
          o.frequency.exponentialRampToValueAtTime(base * 1.35, s + 0.09)
          g.gain.setValueAtTime(0.0001, s)
          g.gain.exponentialRampToValueAtTime(0.045, s + 0.02)
          g.gain.exponentialRampToValueAtTime(0.0001, s + 0.11)
          o.connect(g).connect(out)
          o.start(s)
          o.stop(s + 0.14)
        }
      }
    }
    let timer: number
    const schedule = () => {
      chirp()
      timer = window.setTimeout(schedule, night ? 700 + Math.random() * 900 : 2500 + Math.random() * 4500)
    }
    timer = window.setTimeout(schedule, 800)

    // welcome chime
    tone(c, 523.25, 0.7, 0.2)
    tone(c, 783.99, 0.7, 0.12, 0.12, 'triangle')

    return () => {
      window.clearTimeout(timer)
      try {
        src.stop()
        lfo.stop()
      } catch {
        /* already stopped */
      }
      src.disconnect()
      gain.disconnect()
    }
  }, [muted, night, tone])

  return { muted, toggle, play }
}
