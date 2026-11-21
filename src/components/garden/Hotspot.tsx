import type { ReactNode, KeyboardEvent } from 'react'

interface Props {
  label: string
  tag: string
  /** tag centre position */
  tx: number
  ty: number
  /** invisible hit area */
  hit: { x: number; y: number; w: number; h: number }
  active?: boolean
  onSelect: () => void
  children: ReactNode
}

export function Hotspot({ label, tag, tx, ty, hit, active, onSelect, children }: Props) {
  const w = tag.length * 8.4 + 34
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect()
    }
  }
  return (
    <g
      className={`hotspot ${active ? 'is-active' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={onSelect}
      onKeyDown={onKey}
    >
      <g className="lift">{children}</g>
      <rect
        className="hotspot-ring"
        x={hit.x - 4}
        y={hit.y - 4}
        width={hit.w + 8}
        height={hit.h + 8}
        rx={22}
        fill="none"
        stroke="#f6dc8a"
        strokeWidth={3}
        strokeDasharray="2 9"
        strokeLinecap="round"
      />
      <g className="tag" transform={`translate(${tx} ${ty})`} style={{ pointerEvents: 'none' }}>
        <rect x={-w / 2} y={-14} width={w} height={26} rx={13} fill="#1f2c1d" fillOpacity={0.74} stroke="#e9e4d4" strokeOpacity={0.35} strokeWidth={1} />
        <circle cx={-w / 2 + 12} cy={-1} r={2.2} fill="#d5c79d" />
        <text className="tag-text" textAnchor="middle" x={5} y={3.5}>
          {tag}
        </text>
      </g>
      <rect x={hit.x} y={hit.y} width={hit.w} height={hit.h} fill="transparent" />
    </g>
  )
}
