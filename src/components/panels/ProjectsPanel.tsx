import { useEffect, useState } from 'react'
import { projects } from '../../data/content'
import { Chip, Dialog, ExtLink } from '../ui/Dialog'
import { Plant } from './Plants'

export function ProjectsPanel({ onClose, onPick }: { onClose: () => void; onPick?: () => void }) {
  const [i, setI] = useState(0)
  const p = projects[i]
  const go = (n: number) => {
    setI((n + projects.length) % projects.length)
    onPick?.()
  }

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(i + 1)
      if (e.key === 'ArrowLeft') go(i - 1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  })

  const extra = [
    ['Problem being solved', p.problem],
    ['Technical approach', p.approach],
    ['My contribution', p.contribution],
    ['Technical challenges', p.challenges],
    ['Outcomes', p.outcomes],
  ].filter(([, v]) => v) as [string, string][]

  return (
    <Dialog title="The Greenhouse" eyebrow="Projects · each plant is a project" onClose={onClose} wide>
      {/* shelf */}
      <div role="tablist" aria-label="Projects" className="relative mb-6">
        <div className="grid grid-cols-2 items-end gap-2 sm:grid-cols-5 sm:gap-4">
          {projects.map((pr, k) => (
            <button
              key={pr.id}
              role="tab"
              aria-selected={k === i}
              aria-pressed={k === i}
              aria-label={`${pr.name} — ${pr.plantName}`}
              onClick={() => go(k)}
              className="plant-btn group flex flex-col items-center rounded-2xl px-1 pb-1 pt-2"
            >
              <span className="block h-24 w-20 sm:h-32 sm:w-28">
                <Plant kind={pr.plant} />
              </span>
              <span className={`mt-1 line-clamp-2 text-center text-[0.72rem] font-semibold leading-tight sm:text-sm ${k === i ? 'text-forest-deep' : 'text-wood-deep'}`}>
                {pr.name}
              </span>
              <span className={`mt-1 h-1 w-8 rounded-full transition ${k === i ? 'bg-peach' : 'bg-transparent'}`} />
            </button>
          ))}
        </div>
        <div className="shelf-board mt-1" />
      </div>

      <article aria-live="polite" key={p.id} className="dialog-card grid gap-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-wood-deep">{p.kind}</p>
          <h3 className="font-display text-3xl font-semibold text-forest-deep sm:text-[2.6rem] sm:leading-[1.05]">{p.name}</h3>
          <p className="mt-3 text-lg leading-relaxed text-ink/90">{p.overview}</p>

          {extra.map(([h, v]) => (
            <section key={h} className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-forest">{h}</h4>
              <p className="mt-1 leading-relaxed">{v}</p>
            </section>
          ))}

          <section className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-forest">Technologies</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <li key={t}>
                  <Chip>{t}</Chip>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-7 flex flex-wrap gap-3">
            {p.live && (
              <ExtLink primary href={p.live}>
                Visit live project ↗
              </ExtLink>
            )}
            {p.github && <ExtLink href={p.github}>View on GitHub ↗</ExtLink>}
            {!p.live && !p.github && <Chip tone="gold">Community project · no public link listed</Chip>}
          </div>
        </div>

        <aside className="rounded-2xl border border-wood/40 bg-cream/70 p-5">
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-forest">Stack at a glance</h4>
          {p.architecture ? (
            <ol className="mt-4 flex flex-col items-stretch">
              {p.architecture.map((n, k) => (
                <li key={n.label} className="flex flex-col items-center">
                  <div className="w-full rounded-xl border-2 border-forest/60 bg-sage/20 px-4 py-3 text-center">
                    <p className="font-display text-lg font-semibold text-forest-deep">{n.label}</p>
                    <p className="text-sm text-ink/80">{n.sub}</p>
                  </div>
                  {k < p.architecture!.length - 1 && (
                    <svg width="16" height="30" viewBox="0 0 16 30" aria-hidden className="my-0.5">
                      <path d="M8 0V24M2 18l6 8 6-8" stroke="#b68b68" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-3 text-sm text-ink/75">A front-end project built with {p.tech.join(', ')}.</p>
          )}
          <p className="mt-4 text-xs text-ink/60">Diagram reflects the technologies listed for this project.</p>
        </aside>
      </article>

      <div className="mt-7 flex items-center justify-between border-t border-wood/30 pt-4 text-sm">
        <button onClick={() => go(i - 1)} className="rounded-full border border-wood/50 bg-cream px-4 py-2 font-semibold text-forest-deep hover:bg-gold/60">
          ← Previous plant
        </button>
        <span className="text-ink/60">
          {i + 1} / {projects.length}
        </span>
        <button onClick={() => go(i + 1)} className="rounded-full border border-wood/50 bg-cream px-4 py-2 font-semibold text-forest-deep hover:bg-gold/60">
          Next plant →
        </button>
      </div>
    </Dialog>
  )
}
