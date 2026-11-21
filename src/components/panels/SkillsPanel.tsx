import { useState } from 'react'
import { skillGroups, usedAtWork } from '../../data/content'
import { Dialog } from '../ui/Dialog'

const LIDS = ['#b68b68', '#4c6548', '#d5a28c', '#879b76', '#d5c79d']
const SHAPES = ['jar', 'book', 'tin'] as const

export function SkillsPanel({ onClose }: { onClose: () => void }) {
  const [workOnly, setWorkOnly] = useState(false)
  return (
    <Dialog
      title="The Tool Shed"
      eyebrow="Skills · the inventory"
      onClose={onClose}
      wide
      footer={
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs sm:text-sm">
          <p className="flex items-center gap-2 text-ink/80">
            <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full bg-peach ring-2 ring-peach/40" />
            Marked = used in my professional roles.
          </p>
          <label className="flex cursor-pointer items-center gap-2 font-semibold text-forest-deep">
            <input type="checkbox" checked={workOnly} onChange={(e) => setWorkOnly(e.target.checked)} className="h-4 w-4 accent-[#4c6548]" />
            Only what I use at work
          </label>
        </div>
      }
    >
      <div className="grid gap-x-10 gap-y-9 md:grid-cols-2">
        {skillGroups.map((g, gi) => {
          const items = workOnly ? g.items.filter((i) => usedAtWork.has(i)) : g.items
          if (!items.length) return null
          return (
            <section key={g.id} aria-labelledby={`sg-${g.id}`}>
              <div className="mb-3 flex items-baseline justify-between">
                <h3 id={`sg-${g.id}`} className="font-display text-2xl font-semibold text-forest-deep">
                  {g.title}
                </h3>
                <span className="text-xs italic text-wood-deep">{g.note}</span>
              </div>
              <ul className="flex flex-wrap items-end gap-x-3 gap-y-4 px-1 pt-3">
                {items.map((it, k) => {
                  const shape = SHAPES[(gi + k) % 3]
                  return (
                    <li
                      key={it}
                      className={`${shape} relative text-sm font-semibold text-ink transition hover:-translate-y-1`}
                      style={{ ['--lid' as string]: LIDS[(gi + k * 2) % LIDS.length] }}
                    >
                      {it}
                      {usedAtWork.has(it) && (
                        <span title="Used in my professional roles" className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-peach ring-2 ring-cream" />
                      )}
                    </li>
                  )
                })}
              </ul>
              <div className="shelf-board mt-1" />
            </section>
          )
        })}
      </div>
    </Dialog>
  )
}
