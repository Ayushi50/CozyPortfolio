import { useLayoutEffect, useMemo, useState } from 'react'
import { Beret, CharDefs } from './Characters'

export const PATH_MAIN =
  'M800 950 C 780 860 600 860 620 770 C 640 680 900 700 880 595 C 860 505 640 525 590 475 C 550 435 470 455 432 420'
export const PATH_GREENHOUSE = 'M880 596 C 900 520 1090 545 1132 424'
export const PATH_SHED = 'M880 596 C 1010 660 1180 710 1300 716'
export const PATH_MAILBOX = 'M770 848 C 830 856 880 860 920 862'

export interface Pt {
  x: number
  y: number
}

export function pointsOn(d: string, fractions: number[]): Pt[] {
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  p.setAttribute('d', d)
  const len = p.getTotalLength()
  return fractions.map((f) => {
    const pt = p.getPointAtLength(f * len)
    return { x: pt.x, y: pt.y }
  })
}

function spacedPoints(d: string, gap: number): Pt[] {
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  p.setAttribute('d', d)
  const len = p.getTotalLength()
  const out: Pt[] = []
  for (let l = gap; l < len - 10; l += gap) {
    const pt = p.getPointAtLength(l)
    out.push({ x: pt.x, y: pt.y })
  }
  return out
}

function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

export function Defs() {
  const leaf = [
    ['#bcd49b', '#7fa86a', '#456b40'],
    ['#c4d9a0', '#88b070', '#4a7244'],
    ['#b2cc92', '#76a062', '#3f6139'],
  ]
  return (
    <defs>
      <radialGradient id="gGrass" gradientUnits="userSpaceOnUse" cx="760" cy="400" r="1200">
        <stop offset="0" stopColor="#b6cc8f" />
        <stop offset="0.5" stopColor="#8fb072" />
        <stop offset="1" stopColor="#689060" />
      </radialGradient>
      <radialGradient id="gVignette" gradientUnits="userSpaceOnUse" cx="800" cy="450" r="1100">
        <stop offset="0.5" stopColor="#2b3a28" stopOpacity="0" />
        <stop offset="1" stopColor="#1f2c1d" stopOpacity="0.5" />
      </radialGradient>
      <linearGradient id="gSun" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="900" y2="700">
        <stop offset="0" stopColor="#f8e7b0" stopOpacity="0.3" />
        <stop offset="0.55" stopColor="#f8e7b0" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="gDusk" gradientUnits="userSpaceOnUse" x1="0" y1="-300" x2="0" y2="950">
        <stop offset="0" stopColor="#c9b8d6" stopOpacity="0.12" />
        <stop offset="0.5" stopColor="#e9c7a8" stopOpacity="0.05" />
        <stop offset="1" stopColor="#f3e2c4" stopOpacity="0.06" />
      </linearGradient>
      <radialGradient id="gGlowSun" gradientUnits="userSpaceOnUse" cx="1320" cy="40" r="620">
        <stop offset="0" stopColor="#fff1dc" stopOpacity="0.4" />
        <stop offset="1" stopColor="#fff1dc" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="gBeam" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff3c4" stopOpacity="0.5" />
        <stop offset="1" stopColor="#fff3c4" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="gSide" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff6d8" stopOpacity="0.2" />
        <stop offset="0.5" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#1f2a1c" stopOpacity="0.2" />
      </linearGradient>
      <radialGradient id="gShadow">
        <stop offset="0" stopColor="#1a2418" stopOpacity="0.5" />
        <stop offset="0.6" stopColor="#1a2418" stopOpacity="0.22" />
        <stop offset="1" stopColor="#1a2418" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="gPatchL">
        <stop offset="0" stopColor="#d4e6a8" stopOpacity="0.45" />
        <stop offset="1" stopColor="#c3d1a6" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="gPatchD">
        <stop offset="0" stopColor="#4a7a46" stopOpacity="0.4" />
        <stop offset="1" stopColor="#4f6a4a" stopOpacity="0" />
      </radialGradient>
      {leaf.map((c, i) => (
        <radialGradient key={i} id={`gLeaf${i}`} cx="35%" cy="28%" r="80%">
          <stop offset="0" stopColor={c[0]} />
          <stop offset="0.55" stopColor={c[1]} />
          <stop offset="1" stopColor={c[2]} />
        </radialGradient>
      ))}
      <linearGradient id="gTrunk" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#8d6a4c" />
        <stop offset="1" stopColor="#5e4330" />
      </linearGradient>
      <linearGradient id="gWall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f0eadb" />
        <stop offset="1" stopColor="#d6cdb2" />
      </linearGradient>
      <linearGradient id="gRoof" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#d6a58f" />
        <stop offset="1" stopColor="#b98068" />
      </linearGradient>
      <linearGradient id="gWood" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#b98f6c" />
        <stop offset="1" stopColor="#97704f" />
      </linearGradient>
      <linearGradient id="gGlass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#d6ebe3" stopOpacity="0.5" />
        <stop offset="1" stopColor="#9fc4ba" stopOpacity="0.28" />
      </linearGradient>
      <radialGradient id="gWater" cx="40%" cy="30%" r="85%">
        <stop offset="0" stopColor="#9dbdb6" />
        <stop offset="0.7" stopColor="#6d9490" />
        <stop offset="1" stopColor="#52787a" />
      </radialGradient>
      <radialGradient id="gCloud">
        <stop offset="0" stopColor="#1a2418" stopOpacity="0.2" />
        <stop offset="1" stopColor="#1a2418" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="gFly">
        <stop offset="0" stopColor="#fff6c2" />
        <stop offset="0.4" stopColor="#f6dc8a" stopOpacity="0.6" />
        <stop offset="1" stopColor="#f6dc8a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="gLamp">
        <stop offset="0" stopColor="#ffd98a" stopOpacity="0.85" />
        <stop offset="0.45" stopColor="#ffc46a" stopOpacity="0.32" />
        <stop offset="1" stopColor="#ffc46a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="gMoon" gradientUnits="userSpaceOnUse" cx="1180" cy="120" r="900">
        <stop offset="0" stopColor="#9db8ff" stopOpacity="0.26" />
        <stop offset="1" stopColor="#9db8ff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="gMoonWater">
        <stop offset="0" stopColor="#bfd4ff" stopOpacity="0.45" />
        <stop offset="1" stopColor="#bfd4ff" stopOpacity="0" />
      </radialGradient>
      <filter id="grain" x="-700" y="-500" width="3000" height="1900" filterUnits="userSpaceOnUse">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" result="n" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.12  0 0 0 0 0.08  0 0 0 0.55 -0.12" />
      </filter>
    </defs>
  )
}

export function Ground() {
  const patches = useMemo(() => {
    const r = rng(7)
    return Array.from({ length: 30 }).map(() => ({
      x: r() * 1600,
      y: 60 + r() * 840,
      rx: 120 + r() * 220,
      ry: 50 + r() * 90,
      light: r() > 0.45,
    }))
  }, [])
  const tufts = useMemo(() => {
    const r = rng(23)
    return Array.from({ length: 150 }).map(() => ({ x: r() * 1600, y: 70 + r() * 850, s: 0.6 + r() * 0.8, d: r() > 0.5 }))
  }, [])
  const specks = useMemo(() => {
    const r = rng(61)
    return Array.from({ length: 70 }).map(() => ({ x: r() * 1600, y: 90 + r() * 820, c: r() > 0.5 ? '#efe9d2' : '#e3cf8e', rad: 1 + r() * 1.3 }))
  }, [])
  return (
    <g>
      <rect x="-700" y="-500" width="3000" height="1900" fill="url(#gGrass)" />
      {patches.map((p, i) => (
        <ellipse key={i} cx={p.x} cy={p.y} rx={p.rx} ry={p.ry} fill={p.light ? 'url(#gPatchL)' : 'url(#gPatchD)'} />
      ))}
      {tufts.map((t, i) => (
        <path
          key={i}
          transform={`translate(${t.x} ${t.y}) scale(${t.s})`}
          d="M-7 0 Q-6 -8 -10 -12 M-2 0 Q-2 -11 -4 -16 M3 0 Q4 -12 7 -17 M8 0 Q8 -7 12 -10"
          stroke={t.d ? '#4f7a49' : '#c2dba0'}
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          opacity=".55"
        />
      ))}
      {specks.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.rad} fill={p.c} opacity=".7" />
      ))}
    </g>
  )
}

export function Overlay() {
  return (
    <g style={{ pointerEvents: 'none' }}>
      <rect x="-700" y="-500" width="3000" height="1900" fill="url(#gVignette)" />
      <g className="day-only">
        <rect x="-700" y="-500" width="3000" height="1900" fill="url(#gSun)" />
        <rect x="-700" y="-500" width="3000" height="1900" fill="url(#gDusk)" />
        <rect x="-700" y="-500" width="3000" height="1900" fill="url(#gGlowSun)" />
        <g style={{ mixBlendMode: 'screen' }} opacity=".16">
          <polygon points="120,-40 260,-40 700,980 520,980" fill="url(#gBeam)" />
          <polygon points="420,-40 520,-40 1000,980 880,980" fill="url(#gBeam)" />
          <polygon points="760,-40 830,-40 1260,980 1170,980" fill="url(#gBeam)" />
        </g>
      </g>
      <rect x="-700" y="-500" width="3000" height="1900" filter="url(#grain)" opacity=".15" style={{ mixBlendMode: 'multiply' }} />
    </g>
  )
}

/** Night: a deep-blue tint over the world (inside the camera so it moves with it). */
export function NightTint() {
  return (
    <g className="night-only" style={{ pointerEvents: 'none' }}>
      <rect x="-700" y="-500" width="3000" height="1900" fill="#16264e" fillOpacity="0.66" style={{ mixBlendMode: 'multiply' }} />
      <rect x="-700" y="-500" width="3000" height="1900" fill="url(#gMoon)" style={{ mixBlendMode: 'screen' }} />
    </g>
  )
}

/** Warm lights that sit above the night tint. */
export function NightLights() {
  const pools: [number, number, number][] = [
    [700, 826, 70], [640, 740, 64], [880, 600, 70], [1040, 640, 60], [560, 480, 64], [1250, 740, 60],
  ]
  return (
    <g className="night-only" style={{ pointerEvents: 'none' }}>
      {/* cottage windows + lantern */}
      {[352, 508].map((x) => (
        <g key={x}>
          <circle cx={x} cy={366} r="56" fill="url(#gLamp)" />
          <rect x={x - 17} y={358} width="34" height="42" rx="3" fill="#ffd98a" opacity=".95" />
          <path d={`M${x} 358V400M${x - 17} 379H${x + 17}`} stroke="#8a6445" strokeWidth="2.5" />
        </g>
      ))}
      <circle cx="482" cy="350" r="48" fill="url(#gLamp)" />
      <circle cx="430" cy="372" r="16" fill="#ffd98a" opacity=".5" />
      {/* greenhouse glows from within */}
      <path d="M998 384 V290 L1130 210 L1262 290 V384Z" fill="#ffe3a0" opacity=".34" />
      <circle cx="1130" cy="330" r="150" fill="url(#gLamp)" opacity=".7" />
      {/* shed window */}
      <circle cx="1345" cy="660" r="46" fill="url(#gLamp)" />
      <rect x="1330" y="640" width="30" height="28" rx="2" fill="#ffd98a" opacity=".95" />
      {/* garden lamp pools along the path */}
      {pools.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="url(#gLamp)" opacity=".75" />
          <circle cx={x} cy={y} r="3.4" fill="#fff1c4" />
        </g>
      ))}
      {/* moonlit pond */}
      <ellipse cx="270" cy="708" rx="110" ry="60" fill="url(#gMoonWater)" />
    </g>
  )
}

/* ---------------- trees, bushes, flowers ---------------- */
function Foliage({ clusters, tone, seed }: { clusters: [number, number, number][]; tone: number; seed: number }) {
  const g = `url(#gLeaf${tone % 3})`
  const dabs = useMemo(() => {
    const r = rng(seed)
    const out: { x: number; y: number; rx: number; a: number; l: boolean }[] = []
    clusters.forEach(([cx, cy, cr]) => {
      for (let i = 0; i < 9; i++) {
        const a = r() * Math.PI * 2
        const d = Math.sqrt(r()) * cr * 0.85
        const x = cx + Math.cos(a) * d
        const y = cy + Math.sin(a) * d
        out.push({ x, y, rx: 3 + r() * 4, a: r() * 180, l: x < cx + cr * 0.1 && y < cy + cr * 0.1 })
      }
    })
    return out
  }, [clusters, seed])
  return (
    <>
      {clusters.map(([x, y, r], i) => (
        <circle key={`d${i}`} cx={x + 3} cy={y + 5} r={r} fill="#2f4630" />
      ))}
      {clusters.map(([x, y, r], i) => (
        <circle key={`m${i}`} cx={x} cy={y} r={r} fill={g} />
      ))}
      {dabs.map((d, i) => (
        <ellipse key={`l${i}`} cx={d.x} cy={d.y} rx={d.rx} ry={d.rx * 0.5} transform={`rotate(${d.a} ${d.x} ${d.y})`} fill={d.l ? '#c9d8ae' : '#2f4630'} opacity={d.l ? 0.5 : 0.28} />
      ))}
    </>
  )
}

const TREE_CLUSTERS: [number, number, number][] = [
  [-38, -70, 34], [34, -74, 36], [0, -104, 42], [-52, -100, 28], [52, -100, 28], [-18, -128, 28], [22, -130, 26], [0, -80, 38],
]
const BUSH_CLUSTERS: [number, number, number][] = [[-18, -14, 15], [16, -14, 15], [0, -22, 18], [-30, -8, 10], [30, -8, 10]]

export function Tree({ x, y, s = 1, tone = 0, delay = 0 }: { x: number; y: number; s?: number; tone?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="34" cy="6" rx="90" ry="20" fill="url(#gShadow)" />
      <path d="M-9 4 Q-6 -30 -6 -62 H8 Q8 -30 11 4Z" fill="url(#gTrunk)" />
      <path d="M0 -50 Q-22 -66 -34 -84 M2 -56 Q22 -72 36 -88" stroke="#6b4b32" strokeWidth="4" fill="none" strokeLinecap="round" />
      <g className="sway" style={{ animationDelay: `${delay}s` }}>
        <Foliage clusters={TREE_CLUSTERS} tone={tone} seed={Math.round(x * 3 + y)} />
      </g>
    </g>
  )
}

export function Bush({ x, y, s = 1, tone = 0 }: { x: number; y: number; s?: number; tone?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="14" cy="4" rx="42" ry="9" fill="url(#gShadow)" />
      <g className="sway-soft">
        <Foliage clusters={BUSH_CLUSTERS} tone={tone + 1} seed={Math.round(x + y * 5)} />
      </g>
    </g>
  )
}

const PETALS = ['#e9e4d4', '#d9aa95', '#e4d199', '#c9a0a8', '#b4a7c9']

export function Flowers({ x, y, n = 5, seed = 1, s = 1 }: { x: number; y: number; n?: number; seed?: number; s?: number }) {
  const items = useMemo(() => {
    const r = rng(seed * 97)
    return Array.from({ length: n + 3 }).map(() => ({
      dx: (r() - 0.5) * 80,
      dy: (r() - 0.5) * 24,
      h: 14 + r() * 18,
      c: PETALS[Math.floor(r() * PETALS.length)],
      d: r() * 3,
      k: Math.floor(r() * 3),
    }))
  }, [n, seed])
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {items.map((f, i) => (
        <g key={i} transform={`translate(${f.dx} ${f.dy})`}>
          <ellipse cx="2" cy="1" rx="6" ry="2" fill="#1a2418" opacity=".18" />
          <g className="sway-soft" style={{ animationDelay: `${f.d}s` }}>
            <path d={`M0 0 Q1 ${-f.h / 2} 0 ${-f.h}`} stroke="#557050" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d={`M0 ${-f.h * 0.35} q-6 -4 -8 -1 q3 4 8 1z`} fill="#6f8f62" />
            <g transform={`translate(0 ${-f.h})`}>
              {f.k === 0 &&
                [0, 45, 90, 135, 180, 225, 270, 315].map((a) => <ellipse key={a} cx="0" cy="-3.6" rx="1.5" ry="3.6" fill={f.c} transform={`rotate(${a})`} />)}
              {f.k === 1 &&
                [0, 72, 144, 216, 288].map((a) => <circle key={a} cx="0" cy="-3" r="2.8" fill={f.c} transform={`rotate(${a})`} />)}
              {f.k === 2 && [0, 1, 2, 3].map((j) => <ellipse key={j} cx={j % 2 ? 1.2 : -1.2} cy={j * -3.6 - 1} rx="1.8" ry="2.6" fill={f.c} />)}
              {f.k !== 2 && <circle r="1.7" fill="#c9a24d" />}
            </g>
          </g>
        </g>
      ))}
    </g>
  )
}

const GLOW = ['#e7b1c0', '#f0cfa8', '#efe6c8', '#c9b6e0']
export function GlowBlooms() {
  const spots: [number, number, number][] = [
    [330, 560, 0], [560, 800, 1], [1060, 640, 3], [1250, 480, 0], [700, 330, 2], [1180, 840, 1], [250, 560, 3],
  ]
  return (
    <g style={{ pointerEvents: 'none' }}>
      {spots.map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle className="flower-glow" cy="-20" r="40" fill="url(#gFly)" style={{ animationDelay: `${i * 0.7}s` }} />
          <g className="sway-soft" style={{ animationDelay: `${i * 0.4}s` }}>
            <path d="M0 0 Q2 -12 0 -26" stroke="#5a7a52" strokeWidth="2" fill="none" strokeLinecap="round" />
            <g transform="translate(0 -28)">
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse key={a} cy="-5.5" rx="3.6" ry="6.4" fill={GLOW[c]} transform={`rotate(${a})`} />
              ))}
              <circle r="2.8" fill="#e3b94f" />
            </g>
          </g>
        </g>
      ))}
    </g>
  )
}

/* ---------------- pond ---------------- */
export function Pond() {
  const stones = [
    [166, 708], [180, 662], [214, 636], [262, 624], [322, 632], [372, 652], [404, 690], [398, 738],
    [366, 768], [316, 786], [262, 790], [212, 776], [178, 744],
  ]
  return (
    <g>
      <path d="M160 704 C146 636 270 606 352 636 C432 668 418 760 336 790 C250 818 172 782 160 704Z" fill="#6f8a63" />
      <path d="M170 704 C158 646 272 618 350 646 C422 674 408 756 332 780 C254 806 180 774 170 704Z" fill="url(#gWater)" />
      <path d="M200 668 C240 640 300 640 340 662" fill="none" stroke="#fff" strokeWidth="3" opacity=".3" strokeLinecap="round" />
      <ellipse cx="270" cy="716" rx="38" ry="16" fill="none" stroke="#fff" strokeWidth="1.5" className="ripple" />
      <ellipse cx="330" cy="690" rx="30" ry="12" fill="none" stroke="#fff" strokeWidth="1.5" className="ripple" style={{ animationDelay: '2.4s' }} />
      {/* lily pads */}
      {[[230, 700, 1], [296, 740, 0.8], [338, 704, 0.7]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <ellipse rx="20" ry="9" fill="#6b8f5e" />
          <path d="M0 0 L20 -3" stroke="#a9c4a0" strokeWidth="2" />
          {i === 0 && <circle cx="-4" cy="-4" r="5" fill="#e9e4d4" />}
          {i === 0 && <circle cx="-4" cy="-4" r="2" fill="#d5c79d" />}
        </g>
      ))}
      {/* koi */}
      <g className="bob" opacity=".9">
        <ellipse cx="300" cy="670" rx="12" ry="5" fill="#d5a28c" />
        <path d="M288 670 l-9 -5 v10z" fill="#d5a28c" />
      </g>
      {stones.map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={12 + (i % 3) * 3} ry={8 + (i % 2) * 2} fill={i % 2 ? '#b9b19a' : '#cfc7ae'} stroke="#8d836c" strokeWidth="1.5" />
      ))}
      {/* reeds */}
      <g className="sway-soft" transform="translate(396 740)">
        {[-8, 0, 8, 15].map((x, i) => (
          <g key={x}>
            <path d={`M${x} 0 Q${x + 3} -${28 + i * 6} ${x + 1} -${50 + i * 8}`} stroke="#5f7f55" strokeWidth="3" fill="none" strokeLinecap="round" />
            {i % 2 === 0 && <ellipse cx={x + 1} cy={-52 - i * 8} rx="3.5" ry="9" fill="#8a6445" />}
          </g>
        ))}
      </g>
      <Flowers x={190} y={790} n={4} seed={11} />
    </g>
  )
}

/* ---------------- path ---------------- */
function stonePath(cx: number, cy: number, rx: number, ry: number, seed: number) {
  const r = rng(seed * 131 + 7)
  const n = 8
  const pts = Array.from({ length: n }).map((_, i) => {
    const a = (i / n) * Math.PI * 2
    const j = 0.82 + r() * 0.28
    return [cx + Math.cos(a) * rx * j, cy + Math.sin(a) * ry * j]
  })
  return 'M' + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L') + 'Z'
}

const STONE_FILLS = ['#e0d6b5', '#d6cba9', '#e6dec2', '#cfc4a3']

export function PathLayer({ skip, onStones }: { skip: Pt[]; onStones?: (s: Pt[]) => void }) {
  const [stones, setStones] = useState<Pt[]>([])
  const [fringe, setFringe] = useState<Pt[]>([])
  useLayoutEffect(() => {
    const all = [
      ...spacedPoints(PATH_MAIN, 62),
      ...spacedPoints(PATH_GREENHOUSE, 62),
      ...spacedPoints(PATH_SHED, 62),
      ...spacedPoints(PATH_MAILBOX, 46),
    ]
    const filtered = all.filter((p) => skip.every((k) => Math.hypot(p.x - k.x, p.y - k.y) > 48))
    const r = rng(5)
    const edge = [...spacedPoints(PATH_MAIN, 34), ...spacedPoints(PATH_GREENHOUSE, 38), ...spacedPoints(PATH_SHED, 38)].map((p) => {
      const a = r() * Math.PI * 2
      return { x: p.x + Math.cos(a) * 38, y: p.y + Math.sin(a) * 30 }
    })
    setStones(filtered)
    setFringe(edge)
    onStones?.(filtered)
  }, [skip, onStones])
  const paths = [PATH_MAIN, PATH_GREENHOUSE, PATH_SHED, PATH_MAILBOX]
  return (
    <g strokeLinecap="round" fill="none">
      {paths.map((d, i) => (
        <path key={`o${i}`} d={d} stroke="#4f6649" strokeWidth={i === 3 ? 48 : 76} opacity=".35" />
      ))}
      {paths.map((d, i) => (
        <path key={`b${i}`} d={d} stroke="#bfb184" strokeWidth={i === 3 ? 36 : 60} />
      ))}
      {paths.map((d, i) => (
        <path key={`i${i}`} d={d} stroke="#d3c79f" strokeWidth={i === 3 ? 26 : 44} opacity=".85" />
      ))}
      {fringe.map((p, i) => (
        <path
          key={`f${i}`}
          transform={`translate(${p.x} ${p.y})`}
          d="M-6 0 Q-5 -9 -8 -13 M0 0 Q0 -12 2 -17 M6 0 Q6 -8 9 -12"
          stroke={i % 2 ? '#5f7a58' : '#7f9a6c'}
          strokeWidth="1.6"
          opacity=".8"
        />
      ))}
      {stones.map((p, i) => {
        const cx = p.x + ((i * 7) % 9) - 4
        const cy = p.y + ((i * 5) % 7) - 3
        return (
          <g key={i}>
            <path d={stonePath(cx + 2, cy + 3, 15, 9, i)} fill="#2d3a29" opacity=".25" />
            <path d={stonePath(cx, cy, 14 + (i % 3) * 2, 8.5 + (i % 2), i)} fill={STONE_FILLS[i % 4]} stroke="#a29770" strokeWidth="1" />
            <path d={stonePath(cx - 1, cy - 1.5, 9, 4.5, i + 3)} fill="#fff" opacity=".18" />
          </g>
        )
      })}
    </g>
  )
}

/* ---------------- ambient ---------------- */
export function Clouds() {
  return (
    <g style={{ pointerEvents: 'none' }}>
      {[
        { y: 230, d: 0, w: 260 },
        { y: 520, d: -45, w: 330 },
        { y: 760, d: -85, w: 220 },
      ].map((c, i) => (
        <g key={i} className="cloud-shadow" style={{ animationDelay: `${c.d}s`, animationDuration: `${110 + i * 18}s` }}>
          <ellipse cx="0" cy={c.y} rx={c.w} ry={c.w * 0.28} fill="url(#gCloud)" />
          <ellipse cx={c.w * 0.5} cy={c.y + 18} rx={c.w * 0.6} ry={c.w * 0.2} fill="url(#gCloud)" />
        </g>
      ))}
    </g>
  )
}

export function Fireflies() {
  const flies = useMemo(() => {
    const r = rng(41)
    return Array.from({ length: 30 }).map(() => ({ x: 120 + r() * 1360, y: 160 + r() * 700, d: r() * 14, dur: 8 + r() * 6 }))
  }, [])
  return (
    <g style={{ pointerEvents: 'none' }}>
      {flies.slice(0, 12).map((f, i) => (
        <g key={i} className="firefly" style={{ animationDelay: `${f.d}s`, animationDuration: `${f.dur}s` }}>
          <circle cx={f.x} cy={f.y} r="9" fill="url(#gFly)" />
        </g>
      ))}
      <g className="night-only">
        {flies.slice(12).map((f, i) => (
          <g key={i} className="firefly" style={{ animationDelay: `${f.d}s`, animationDuration: `${f.dur}s` }}>
            <circle cx={f.x} cy={f.y} r="12" fill="url(#gFly)" />
          </g>
        ))}
      </g>
    </g>
  )
}

/* ---------------- gardener ---------------- */
export function Gardener({ pos, bubble, onClick }: { pos: Pt; bubble: boolean; onClick: () => void }) {
  return (
    <g
      className="walker"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, cursor: 'pointer' }}
      onClick={onClick}
      role="img"
      aria-label="A tiny gardener"
    >
      <ellipse cx="2" cy="2" rx="17" ry="5" fill="#1f2a1c" opacity=".3" />
      <CharDefs />
      <circle className="night-only" cy="-30" r="60" fill="url(#gLamp)" style={{ pointerEvents: 'none' }} />
      <g className="bob" transform="scale(1.22)">
        <Beret />
      </g>
      {bubble && (
        <g transform="translate(0 -92)">
          <rect x="-72" y="-26" width="144" height="30" rx="15" fill="#ece7d7" stroke="#b68b68" strokeWidth="2" />
          <path d="M-5 4 l5 9 l5 -9" fill="#ece7d7" stroke="#b68b68" strokeWidth="2" />
          <rect x="-8" y="2" width="16" height="4" fill="#ece7d7" />
          <text textAnchor="middle" y="-6" fontSize="13" fontWeight="600" fill="#34472f" fontFamily="DM Sans, sans-serif">
            Welcome to my garden!
          </text>
        </g>
      )}
    </g>
  )
}
