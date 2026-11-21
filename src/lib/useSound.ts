import { useCallback, useEffect, useRef, useState } from 'react'

export type SoundKind = 'about' | 'projects' | 'experience' | 'skills' | 'contact' | 'close' | 'pick' | 'stone'

/**
 * Muted by default. Everything is synthesised (no audio files) and garden-themed:
 * wooden door creaks, glass clinks, gravel steps, tool clinks, a squeaky mailbox,
 * water drops and leaf rustles, over a breeze with birdsong by day or crickets by night.
 */
export function useSound(night: boolean) {
  const [muted, setMuted] = useState(true)
  const ctx = useRef<AudioContext | null>(null)
  const master = useRef<GainNode | null>(null)
  const noiseBuf = useRef<AudioBuffer | null>(null)

  const ensure = useCallback(() => {
    if (!ctx.current) {
      const c = new AudioContext()
      const g = c.createGain()
      g.gain.value = 0.9
      g.connect(c.destination)
      ctx.current = c
      master.current = g
      const buf = c.createBuffer(1, c.sampleRate, c.sampleRate)
      const d = buf.getChannelData(0)
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
      noiseBuf.current = buf
    }
    if (ctx.current.state === 'suspended') void ctx.current.resume()
    return ctx.current
  }, [])

  const out = () => master.current ?? ctx.current!.destination

  /** pitched blip with an optional glide */
  const tone = useCallback((c: AudioContext, f0: number, dur: number, vol: number, when = 0, type: OscillatorType = 'sine', f1?: number) => {
    const o = c.createOscillator()
    const g = c.createGain()
    const t = c.currentTime + when
    o.type = type
    o.frequency.setValueAtTime(f0, t)
    if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + dur)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(vol, t + 0.012)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g).connect(out())
    o.start(t)
    o.stop(t + dur + 0.05)
  }, [])

  /** filtered noise burst: rustles, steps, paper */
  const noise = useCallback((c: AudioContext, when: number, dur: number, type: BiquadFilterType, freq: number, q: number, vol: number, attack = 0.01) => {
    const src = c.createBufferSource()
    src.buffer = noiseBuf.current
    src.loop = true
    const f = c.createBiquadFilter()
    f.type = type
    f.frequency.value = freq
    f.Q.value = q
    const g = c.createGain()
    const t = c.currentTime + when
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(vol, t + attack)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    src.connect(f).connect(g).connect(out())
    src.start(t, Math.random() * 0.5)
    src.stop(t + dur + 0.05)
  }, [])

  // recipes
  const knock = useCallback((c: AudioContext, when: number, f = 160) => {
    tone(c, f, 0.14, 0.5, when, 'sine', f * 0.5)
    noise(c, when, 0.04, 'bandpass', 900, 1.2, 0.18, 0.004)
  }, [tone, noise])

  const clink = useCallback((c: AudioContext, when: number, f: number, vol = 0.1) => {
    ;[1, 2.76, 5.4].forEach((m, i) => tone(c, f * m, 0.5 - i * 0.12, vol / (i + 1), when))
  }, [tone])

  const creak = useCallback((c: AudioContext, when: number, dur = 0.6) => {
    const o = c.createOscillator()
    const lp = c.createBiquadFilter()
    const g = c.createGain()
    const t = c.currentTime + when
    o.type = 'sawtooth'
    o.frequency.setValueAtTime(150, t)
    o.frequency.linearRampToValueAtTime(240, t + dur * 0.5)
    o.frequency.linearRampToValueAtTime(170, t + dur)
    lp.type = 'lowpass'
    lp.frequency.value = 520
    lp.Q.value = 6
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.08)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(lp).connect(g).connect(out())
    o.start(t)
    o.stop(t + dur + 0.05)
  }, [])

  const step = useCallback((c: AudioContext, when: number) => {
    noise(c, when, 0.11, 'bandpass', 1900, 0.9, 0.2, 0.004)
    tone(c, 95, 0.09, 0.22, when, 'sine', 60)
  }, [noise, tone])

  const drop = useCallback((c: AudioContext, when: number, f = 1100) => {
    tone(c, f, 0.16, 0.2, when, 'sine', f * 0.38)
    tone(c, f * 1.6, 0.08, 0.06, when + 0.02, 'sine', f * 0.8)
  }, [tone])

  const tweet = useCallback((c: AudioContext, when: number) => {
    const base = 2200 + Math.random() * 1000
    tone(c, base, 0.1, 0.05, when, 'sine', base * 1.4)
    tone(c, base * 1.1, 0.09, 0.05, when + 0.13, 'sine', base * 1.5)
  }, [tone])

  const play = useCallback(
    (kind: SoundKind) => {
      if (muted) return
      try {
        const c = ensure()
        switch (kind) {
          case 'about': // cottage: two knocks, then the door creaks open
            knock(c, 0)
            knock(c, 0.17)
            creak(c, 0.42)
            noise(c, 0.42, 0.5, 'bandpass', 700, 0.8, 0.04, 0.1)
            break
          case 'projects': // greenhouse: glass door clink, leaves rustle, a bird
            clink(c, 0, 1760, 0.12)
            clink(c, 0.09, 2349, 0.08)
            noise(c, 0.1, 0.7, 'bandpass', 3600, 0.7, 0.07, 0.12)
            tweet(c, 0.45)
            break
          case 'experience': // garden path: crunchy footsteps
            step(c, 0)
            step(c, 0.22)
            step(c, 0.44)
            break
          case 'skills': // shed: wooden knock, tools clinking
            knock(c, 0, 120)
            clink(c, 0.16, 780, 0.1)
            clink(c, 0.3, 1100, 0.08)
            clink(c, 0.43, 640, 0.09)
            break
          case 'contact': // mailbox: squeaky flap, clank, paper
            tone(c, 1500, 0.22, 0.07, 0, 'triangle', 900)
            tone(c, 1350, 0.18, 0.05, 0.05, 'triangle', 850)
            clink(c, 0.24, 520, 0.12)
            noise(c, 0.34, 0.3, 'highpass', 3200, 0.7, 0.1, 0.03)
            noise(c, 0.5, 0.22, 'highpass', 3600, 0.7, 0.08, 0.03)
            break
          case 'pick': // plant a pick: water drops
            drop(c, 0, 1100)
            drop(c, 0.16, 820)
            break
          case 'stone': // one footstep
            step(c, 0)
            break
          case 'close': // back to the garden: leaves rustle
            noise(c, 0, 0.55, 'bandpass', 2600, 0.6, 0.09, 0.15)
            break
        }
      } catch {
        /* audio unavailable */
      }
    },
    [muted, ensure, knock, creak, clink, noise, tweet, step, drop],
  )

  const toggle = useCallback(() => {
    try {
      ensure() // created inside the click so the browser allows playback
    } catch {
      /* audio unavailable */
    }
    setMuted((m) => !m)
  }, [ensure])

  // ambience: breeze + birdsong (day) / crickets (night)
  useEffect(() => {
    if (muted || !ctx.current) return
    const c = ctx.current
    const dest = master.current ?? c.destination

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
    src.connect(bp).connect(gain).connect(dest)
    src.start()
    lfo.start()

    const chirp = () => {
      if (night) {
        for (let i = 0; i < 3; i++) tone(c, 4300 + Math.random() * 200, 0.05, 0.035, i * 0.07, 'square')
      } else {
        tweet(c, 0)
      }
    }
    let timer: number
    const schedule = () => {
      chirp()
      timer = window.setTimeout(schedule, night ? 700 + Math.random() * 900 : 2500 + Math.random() * 4500)
    }
    timer = window.setTimeout(schedule, 600)

    // greeting: a bird and a soft rustle
    if (!night) tweet(c, 0.05)
    noise(c, 0, 0.6, 'bandpass', 2800, 0.6, 0.06, 0.15)

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
  }, [muted, night, tone, tweet, noise])

  return { muted, toggle, play }
}
