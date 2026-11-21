import { about, profile } from '../../data/content'
import { Chip, Dialog, ExtLink } from '../ui/Dialog'

function Nook() {
  return (
    <svg viewBox="0 0 360 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="A cozy cottage nook with a window, lamp, books and a plant">
      <rect width="360" height="300" fill="#d8cfb4" />
      <rect y="232" width="360" height="68" fill="#b68b68" />
      <path d="M0 232 H360" stroke="#8a6445" strokeWidth="3" />
      {/* window */}
      <rect x="40" y="36" width="150" height="150" rx="75" ry="14" fill="#b6d0cc" stroke="#8a6445" strokeWidth="9" />
      <path d="M115 36V186M40 111H190" stroke="#8a6445" strokeWidth="5" />
      <path d="M56 70 Q90 50 120 60" stroke="#fff" strokeWidth="6" opacity=".35" fill="none" strokeLinecap="round" />
      <ellipse cx="80" cy="160" rx="32" ry="14" fill="#879b76" opacity=".7" />
      <ellipse cx="160" cy="165" rx="26" ry="12" fill="#6b8460" opacity=".7" />
      <rect x="30" y="186" width="170" height="12" rx="3" fill="#8a6445" />
      {/* curtains */}
      <path d="M26 30 Q50 90 30 190 H12 V30Z" fill="#d5a28c" opacity=".9" />
      <path d="M204 30 Q180 90 200 190 H218 V30Z" fill="#d5a28c" opacity=".9" />
      {/* shelf with books */}
      <rect x="232" y="90" width="100" height="8" rx="2" fill="#8a6445" />
      {[['#4c6548', 40], ['#d5a28c', 32], ['#d5c79d', 44], ['#879b76', 36]].map(([c, h], i) => (
        <rect key={i} x={238 + i * 14} y={90 - (h as number)} width="12" height={h as number} rx="2" fill={c as string} />
      ))}
      <g transform="translate(300 90)">
        <path d="M-6 0 l-4 -18 h20 l-4 18Z" fill="#c68f78" />
        <g className="sway-soft"><circle cx="0" cy="-26" r="10" fill="#6b8460" /><circle cx="8" cy="-32" r="6" fill="#879b76" /></g>
      </g>
      {/* lamp */}
      <g transform="translate(262 232)">
        <rect x="-3" y="-80" width="6" height="80" fill="#8a6445" />
        <ellipse cx="0" cy="0" rx="18" ry="5" fill="#8a6445" />
        <path d="M-22 -80 L-12 -108 H12 L22 -80Z" fill="#f3d98a" />
        <circle cx="0" cy="-80" r="46" fill="#f6dc8a" opacity=".16" />
      </g>
      {/* armchair */}
      <g transform="translate(110 232)">
        <rect x="-50" y="-70" width="100" height="70" rx="18" fill="#d5a28c" />
        <rect x="-64" y="-40" width="26" height="40" rx="10" fill="#c68f78" />
        <rect x="38" y="-40" width="26" height="40" rx="10" fill="#c68f78" />
        <rect x="-40" y="-36" width="80" height="26" rx="10" fill="#e3b9a4" />
      </g>
      {/* rug */}
      <ellipse cx="170" cy="274" rx="120" ry="14" fill="#879b76" opacity=".7" />
    </svg>
  )
}

export function AboutPanel({ onClose }: { onClose: () => void }) {
  return (
    <Dialog title="Inside the cottage" eyebrow="About" onClose={onClose}>
      <div className="grid gap-7 md:grid-cols-[1fr_1.25fr]">
        <div className="h-44 overflow-hidden rounded-2xl border-4 border-wood shadow-lg md:h-auto">
          <Nook />
        </div>
        <div>
          <p className="font-display text-2xl italic leading-snug text-forest-deep">“{profile.summary}”</p>
          <p className="mt-4 leading-relaxed">{about.intro}</p>
          <p className="mt-3 leading-relaxed">{about.background}</p>

          <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-forest">What I care about</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {about.focus.map((f) => (
              <li key={f}>
                <Chip>{f}</Chip>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-forest">Off the clock</h3>
          <ul className="mt-2 space-y-1.5">
            {about.sideQuests.map((s) => (
              <li key={s} className="flex gap-2">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-peach" />
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <ExtLink primary href={profile.resume}>
              Download resume ↓
            </ExtLink>
            <ExtLink href={profile.linkedin}>LinkedIn ↗</ExtLink>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
