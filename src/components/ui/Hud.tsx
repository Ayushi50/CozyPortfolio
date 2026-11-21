import { useState } from 'react'
import { profile, sections, type SectionId } from '../../data/content'

interface Props {
  focus: SectionId | null
  visited: Set<SectionId>
  muted: boolean
  classic: boolean
  onOpen: (id: SectionId) => void
  onHome: () => void
  onToggleSound: () => void
  onToggleClassic: () => void
}

const glass = 'border border-cream/20 bg-[#1b281a]/60 backdrop-blur-md'

function Speaker({ off }: { off: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 6h2.5L8 3v10L4.5 10H2z" />
      {off ? <path d="M11 6l3 4M14 6l-3 4" /> : <path d="M10.5 5.5a3.5 3.5 0 010 5M12.5 3.5a6.5 6.5 0 010 9" />}
    </svg>
  )
}

export function Hud({ focus, visited, muted, classic, onOpen, onHome, onToggleSound, onToggleClassic }: Props) {
  const [menu, setMenu] = useState(false)
  const btn = 'rounded-full px-3.5 py-2 text-[0.8rem] font-medium tracking-wide transition'
  return (
    <>
      {/* soft scrim for legibility */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-700 ${focus ? 'opacity-0' : 'opacity-100'}`}
        style={{ background: 'radial-gradient(60rem 28rem at 0% 0%, rgba(20,30,18,.62), transparent 70%), linear-gradient(to top, rgba(20,30,18,.7), transparent 14rem)' }}
      />

      {/* intro */}
      <div
        className={`pointer-events-none absolute left-5 top-[4.6rem] z-20 max-w-[18rem] text-cream transition-all duration-700 sm:left-10 sm:top-9 sm:max-w-sm ${
          focus ? '-translate-y-3 opacity-0' : 'opacity-100'
        }`}
        style={{ textShadow: '0 2px 18px rgba(15,24,14,.55)' }}
      >
        <span aria-hidden className="mb-3 block h-px w-12 bg-gold/80" />
        <p className="font-display text-[2rem] font-light leading-[1.02] tracking-tight sm:text-[3.3rem]" style={{ fontVariationSettings: '"opsz" 144' }}>Hi, I’m Ayushi.</p>
        <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-gold">Software Engineer</p>
        <p className="mt-1.5 font-display text-lg italic text-cream/90 sm:text-xl">Building things that grow.</p>
      </div>

      {/* nav */}
      <nav
        aria-label="Garden navigation"
        className={`${glass} absolute right-3 top-3 z-30 flex items-center gap-0.5 rounded-full p-1 shadow-2xl sm:right-6 sm:top-6`}
      >
        <div className="hidden items-center md:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => onOpen(s.id)}
              aria-current={focus === s.id ? 'page' : undefined}
              title={`${s.object} (${s.key})`}
              className={`${btn} ${focus === s.id ? 'bg-cream text-forest-deep' : 'text-cream/90 hover:bg-cream/15'}`}
            >
              {s.label}
              {visited.has(s.id) && focus !== s.id && <span aria-label="visited" className="ml-1.5 inline-block h-1 w-1 rounded-full bg-gold align-middle" />}
            </button>
          ))}
        </div>
        <a href={profile.resume} target="_blank" rel="noreferrer" className={`${btn} bg-gold/90 font-semibold text-ink hover:bg-gold`}>
          Resume ↓
        </a>
        <button className={`${btn} text-cream md:hidden`} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu((m) => !m)}>
          {menu ? 'Close' : 'Menu'}
        </button>
        {menu && (
          <ul id="mobile-menu" className={`${glass} absolute right-0 top-full mt-2 w-60 rounded-2xl p-2 shadow-2xl md:hidden`}>
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => {
                    setMenu(false)
                    onOpen(s.id)
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left font-medium text-cream hover:bg-cream/15"
                >
                  {s.label}
                  <span className="text-xs font-normal text-cream/60">{s.object}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* bottom bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex items-end justify-between gap-3 px-3 sm:bottom-6 sm:px-8">
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={onToggleSound}
            aria-pressed={!muted}
            aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
            className={`${glass} flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium text-cream hover:bg-[#1b281a]/80`}
          >
            <Speaker off={muted} />
            <span className="hidden sm:inline">{muted ? 'Sound off' : 'Sound on'}</span>
          </button>
          <button
            onClick={onToggleClassic}
            aria-pressed={classic}
            className={`${glass} whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium text-cream hover:bg-[#1b281a]/80`}
          >
            {classic ? 'Back to garden' : 'Text version'}
          </button>
        </div>

        <div className="pointer-events-auto flex flex-col items-center gap-2 text-cream">
          {focus ? (
            <button onClick={onHome} className={`${glass} whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]`}>
              ← Return to the garden
            </button>
          ) : (
            <p className="flex items-center gap-3 whitespace-nowrap font-display text-base italic text-cream/95 sm:text-lg" style={{ textShadow: '0 2px 14px rgba(15,24,14,.7)' }}>
              <span aria-hidden className="h-px w-6 bg-gold/70" />
              Explore the garden
              <span aria-hidden className="h-px w-6 bg-gold/70" />
            </p>
          )}
          <div className="flex items-center gap-2.5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-cream/80" aria-label={`Explored ${visited.size} of ${sections.length} places`}>
            <span className="flex gap-1.5">
              {sections.map((s) => (
                <span key={s.id} className={`h-1.5 w-1.5 rounded-full border border-gold ${visited.has(s.id) ? 'bg-gold' : 'bg-transparent'}`} />
              ))}
            </span>
            <span className="hidden sm:inline">{visited.size}/{sections.length} explored</span>
          </div>
        </div>

        <p className={`${glass} hidden rounded-full px-3.5 py-2 text-[0.7rem] text-cream/85 lg:block`}>
          Keys <b className="text-gold">1–5</b> jump · <b className="text-gold">Esc</b> back · <b className="text-gold">←/→</b> browse
        </p>
        <span className="w-10 lg:hidden" aria-hidden />
      </div>
    </>
  )
}
