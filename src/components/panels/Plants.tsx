import type { Project } from '../../data/content'

const Pot = ({ c = '#c68f78' }: { c?: string }) => (
  <g>
    <path d="M-26 0 H26 L20 38 Q0 44 -20 38 Z" fill={c} />
    <rect x="-29" y="-6" width="58" height="12" rx="4" fill={c} />
    <rect x="-29" y="-6" width="58" height="5" rx="3" fill="#fff" opacity=".18" />
  </g>
)

export function Plant({ kind }: { kind: Project['plant'] }) {
  return (
    <svg viewBox="-70 -130 140 190" className="h-full w-full" aria-hidden>
      <ellipse cx="0" cy="44" rx="40" ry="6" fill="#1f2a1c" opacity=".18" />
      {kind === 'fern' && (
        <g className="sway-soft">
          {[-62, -38, -14, 14, 38, 62].map((a, i) => (
            <g key={a} transform={`rotate(${a})`}>
              <path d={`M0 -4 Q${a < 0 ? -6 : 6} -${60 + (i % 2) * 14} 0 -${96 - (i % 3) * 8}`} stroke="#5f7f55" strokeWidth="3" fill="none" />
              {Array.from({ length: 7 }).map((_, k) => (
                <g key={k} transform={`translate(0 ${-14 - k * 11})`}>
                  <ellipse cx="-9" cy="0" rx="9" ry="3" fill={k % 2 ? '#7a9a68' : '#879b76'} transform="rotate(-24)" />
                  <ellipse cx="9" cy="0" rx="9" ry="3" fill={k % 2 ? '#879b76' : '#7a9a68'} transform="rotate(24)" />
                </g>
              ))}
            </g>
          ))}
        </g>
      )}
      {kind === 'cactus' && (
        <g className="sway-soft">
          <rect x="-15" y="-96" width="30" height="100" rx="15" fill="#6b9068" />
          <rect x="-4" y="-96" width="8" height="100" rx="4" fill="#82a87c" opacity=".7" />
          <path d="M-15 -42 H-30 Q-40 -42 -40 -52 V-72 Q-40 -82 -30 -82 Q-22 -82 -22 -72 V-56 H-15Z" fill="#6b9068" />
          <path d="M15 -30 H28 Q38 -30 38 -40 V-58 Q38 -66 30 -66 Q22 -66 22 -58 V-44 H15Z" fill="#6b9068" />
          <circle cx="0" cy="-100" r="6" fill="#d5a28c" />
          <circle cx="-3" cy="-103" r="2.5" fill="#e9e4d4" />
          <g stroke="#e9e4d4" strokeWidth="1.5" opacity=".8">
            <path d="M-9 -70l-5 -3M9 -60l5 -3M-8 -40l-5 -3M8 -30l5 -3M-9 -14l-5 -3" />
          </g>
        </g>
      )}
      {kind === 'bonsai' && (
        <g className="sway-soft">
          <path d="M0 0 C-6 -30 14 -40 4 -64 C-2 -78 -18 -74 -26 -84" stroke="#7e5a3f" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M6 -56 C24 -60 36 -70 44 -84" stroke="#7e5a3f" strokeWidth="6" fill="none" strokeLinecap="round" />
          {[[-30, -92, 24], [-6, -104, 22], [30, -96, 22], [46, -88, 18], [-44, -78, 15]].map(([x, y, r], i) => (
            <g key={i}>
              <ellipse cx={x} cy={y} rx={r} ry={r * 0.62} fill={i % 2 ? '#6f9065' : '#587a58'} />
              <ellipse cx={x - 4} cy={y - 4} rx={r * 0.6} ry={r * 0.32} fill="#8aa87c" opacity=".8" />
            </g>
          ))}
        </g>
      )}
      {kind === 'orchid' && (
        <g className="sway-soft">
          {[-30, 30].map((x) => (
            <path key={x} d={`M${x * 0.4} 0 Q${x} -30 ${x * 0.7} -50`} stroke="#6b9068" strokeWidth="0" fill="none" />
          ))}
          <path d="M-22 -2 Q-44 -20 -36 -40 Q-22 -26 -12 -2Z" fill="#6b9068" />
          <path d="M22 -2 Q44 -20 36 -40 Q22 -26 12 -2Z" fill="#7a9a68" />
          <path d="M0 -4 C-4 -50 6 -80 22 -108" stroke="#5f7f55" strokeWidth="4" fill="none" strokeLinecap="round" />
          {[[-4, -50, 0.8], [8, -74, 0.9], [22, -102, 1]].map(([x, y, s], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse key={a} cx="0" cy="-10" rx="7" ry="11" fill={i % 2 ? '#e9e4d4' : '#d5a28c'} transform={`rotate(${a})`} stroke="#fff" strokeOpacity=".3" />
              ))}
              <circle r="4.5" fill="#d5c79d" />
            </g>
          ))}
        </g>
      )}
      <Pot c={kind === 'cactus' ? '#d5c79d' : kind === 'bonsai' ? '#8f9fa0' : kind === 'orchid' ? '#e9e4d4' : '#c68f78'} />
    </svg>
  )
}
