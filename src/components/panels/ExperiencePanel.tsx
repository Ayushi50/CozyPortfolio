import { useEffect } from 'react'
import { certifications, roles } from '../../data/content'
import { Chip, Dialog, ExtLink } from '../ui/Dialog'

export function ExperiencePanel({ index, setIndex, onClose }: { index: number; setIndex: (n: number) => void; onClose: () => void }) {
  const total = roles.length + 1
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex(Math.min(total - 1, index + 1))
      if (e.key === 'ArrowLeft') setIndex(Math.max(0, index - 1))
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [index, setIndex, total])

  const role = roles[index]
  return (
    <Dialog title="The Garden Path" eyebrow="Experience · follow the stones" onClose={onClose}>
      <ol className="mb-6 flex items-center gap-1 sm:gap-2" aria-label="Career stones">
        {Array.from({ length: total }).map((_, k) => (
          <li key={k} className="flex flex-1 items-center">
            <button
              onClick={() => setIndex(k)}
              aria-current={k === index ? 'step' : undefined}
              className={`flex w-full flex-col items-center rounded-[50%/42%] border-2 px-2 py-2 text-center transition ${
                k === index ? 'border-wood-deep bg-gold shadow-md' : 'border-wood/50 bg-cream hover:bg-gold/50'
              }`}
            >
              <span className="font-display text-lg font-semibold text-wood-deep">{k + 1}</span>
              <span className="text-[0.65rem] font-semibold leading-tight text-forest-deep sm:text-xs">
                {k < roles.length ? roles[k].start : 'Credentials'}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div key={index} className="dialog-card">
        {role ? (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-wood-deep">{role.dates}</p>
            <h3 className="font-display text-3xl font-semibold text-forest-deep">{role.role}</h3>
            <p className="mt-1 text-lg font-medium text-ink/80">{role.company}</p>
            <h4 className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-forest">What I worked on</h4>
            <ul className="mt-2 space-y-3">
              {role.work.map((w) => (
                <li key={w} className="flex gap-3 text-[1.02rem] leading-relaxed">
                  <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" className="mt-1 shrink-0">
                    <path d="M3 15C3 7 8 3 15 3c0 7-4 12-12 12z" fill="#879b76" />
                    <path d="M3 15L11 7" stroke="#4c6548" strokeWidth="1.5" />
                  </svg>
                  {w}
                </li>
              ))}
            </ul>
            <h4 className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-forest">Technologies</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {role.tech.map((t) => (
                <li key={t}>
                  <Chip>{t}</Chip>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-wood-deep">Always learning</p>
            <h3 className="font-display text-3xl font-semibold text-forest-deep">Credentials</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-1">
              {certifications.map((c) => (
                <li key={c.title} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-wood/40 bg-cream/70 p-4">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-wood-deep">{c.issuer}</p>
                    <p className="font-display text-xl font-semibold text-forest-deep">{c.title}</p>
                    <p className="text-sm text-ink/80">{c.blurb}</p>
                  </div>
                  <ExtLink href={c.href}>View ↗</ExtLink>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-wood/30 pt-4 text-sm">
        <button disabled={index === 0} onClick={() => setIndex(index - 1)} className="rounded-full border border-wood/50 bg-cream px-4 py-2 font-semibold text-forest-deep enabled:hover:bg-gold/60 disabled:opacity-40">
          ← Earlier
        </button>
        <button disabled={index === total - 1} onClick={() => setIndex(index + 1)} className="rounded-full border border-wood/50 bg-cream px-4 py-2 font-semibold text-forest-deep enabled:hover:bg-gold/60 disabled:opacity-40">
          Further along →
        </button>
      </div>
    </Dialog>
  )
}
