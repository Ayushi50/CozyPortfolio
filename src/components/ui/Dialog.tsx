import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  title: string
  eyebrow: string
  onClose: () => void
  children: ReactNode
  wide?: boolean
  footer?: ReactNode
}

export function Dialog({ title, eyebrow, onClose, children, wide, footer }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    ref.current?.focus()
    return () => prev?.focus?.()
  }, [])

  const trap = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return
    const f = ref.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')
    if (!f || !f.length) return
    const first = f[0]
    const last = f[f.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center p-0 sm:items-center sm:p-6" onKeyDown={trap}>
      <div className="dialog-backdrop absolute inset-0 bg-[#1f2a1c]/55 backdrop-blur-[3px]" onClick={onClose} />
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`dialog-card wood-frame relative flex max-h-[94svh] w-full flex-col rounded-t-[28px] p-[7px] outline-none sm:rounded-[28px] sm:p-[9px] ${
          wide ? 'sm:max-w-6xl' : 'sm:max-w-3xl'
        }`}
      >
        <div className="paper flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-[22px] sm:rounded-[20px]">
          <header className="flex items-start justify-between gap-4 border-b border-wood/30 px-5 pb-3 pt-5 sm:px-8">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-wood-deep">{eyebrow}</p>
              <h2 className="font-display text-3xl font-semibold leading-tight text-forest-deep sm:text-4xl">{title}</h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close and return to the garden"
              className="mt-1 flex shrink-0 items-center gap-2 rounded-full border border-wood/50 bg-cream px-3.5 py-2 text-sm font-semibold text-forest-deep transition hover:bg-gold/60"
            >
              <span aria-hidden>✕</span>
              <span className="hidden sm:inline">Back to garden</span>
              <kbd className="hidden rounded bg-forest/10 px-1.5 text-xs sm:inline">Esc</kbd>
            </button>
          </header>
          <div className="scroll-soft min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">{children}</div>
          {footer && <footer className="border-t border-wood/30 bg-cream-deep/60 px-5 py-3 sm:px-8">{footer}</footer>}
        </div>
      </div>
    </div>
  )
}

export function Chip({ children, tone = 'sage' }: { children: ReactNode; tone?: 'sage' | 'gold' | 'peach' }) {
  const t = {
    sage: 'bg-sage/25 text-forest-deep border-sage/50',
    gold: 'bg-gold/60 text-ink border-wood/30',
    peach: 'bg-peach/40 text-ink border-peach',
  }[tone]
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.82rem] font-medium ${t}`}>{children}</span>
}

export function ExtLink({ href, children, primary }: { href: string; children: ReactNode; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
        primary
          ? 'bg-forest text-cream shadow-[0_6px_0_#34472f] hover:-translate-y-0.5 hover:shadow-[0_8px_0_#34472f] active:translate-y-1 active:shadow-[0_2px_0_#34472f]'
          : 'border border-wood/60 bg-cream text-forest-deep hover:bg-gold/60'
      }`}
    >
      {children}
    </a>
  )
}
