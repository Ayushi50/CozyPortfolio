import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { SectionId } from '../../data/content'
import { roles } from '../../data/content'
import { Cottage, Greenhouse, Mailbox, Shed } from './Buildings'
import { Hotspot } from './Hotspot'
import {
  Bush,
  Clouds,
  Defs,
  Fireflies,
  GlowBlooms,
  Flowers,
  Gardener,
  NightLights,
  NightTint,
  Ground,
  Overlay,
  PATH_MAIN,
  PathLayer,
  Pond,
  Tree,
  pointsOn,
  type Pt,
} from './Scenery'

interface Props {
  focus: SectionId | null
  roleIndex: number
  narrow: boolean
  wide?: boolean
  onSelect: (id: SectionId, extra?: number) => void
}

const TARGETS: Record<SectionId, { o: Pt; zoom: number; stand: Pt }> = {
  about: { o: { x: 430, y: 320 }, zoom: 2.0, stand: { x: 432, y: 448 } },
  projects: { o: { x: 1130, y: 310 }, zoom: 2.0, stand: { x: 1132, y: 448 } },
  experience: { o: { x: 760, y: 680 }, zoom: 1.5, stand: { x: 760, y: 735 } },
  skills: { o: { x: 1390, y: 640 }, zoom: 2.2, stand: { x: 1390, y: 748 } },
  contact: { o: { x: 940, y: 770 }, zoom: 2.4, stand: { x: 905, y: 872 } },
}

const ROLE_FRACTIONS = [0.2, 0.4, 0.6, 0.78]
const HOME: Pt = { x: 720, y: 790 }

export function Garden({ focus, roleIndex, narrow, wide, onSelect }: Props) {
  const [pan, setPan] = useState(-70)
  const drag = useRef<{ x: number; moved: boolean; pan: number } | null>(null)
  const vb = narrow ? { x: 365 + pan, y: 60, w: 870, h: 940 } : { x: 0, y: 0, w: 1600, h: 900 }
  const [bubble, setBubble] = useState(false)
  const [stones, setStones] = useState<Pt[]>([])
  const [milestones, setMilestones] = useState<Pt[]>([])

  useEffect(() => {
    setMilestones(pointsOn(PATH_MAIN, ROLE_FRACTIONS))
  }, [])

  const handleStones = useCallback((s: Pt[]) => setStones(s), [])
  void stones

  const camera = useMemo(() => {
    if (!focus) return { s: 1, tx: 0, ty: 0 }
    const t = TARGETS[focus]
    const o = focus === 'experience' && milestones[roleIndex] ? milestones[roleIndex] : t.o
    const z = narrow ? t.zoom * 0.8 : t.zoom
    const cx = vb.x + vb.w / 2
    const cy = vb.y + vb.h / 2
    return { s: z, tx: cx - z * o.x, ty: cy - z * o.y }
  }, [focus, roleIndex, milestones, narrow, vb.x, vb.y, vb.w, vb.h])

  let gardener = HOME
  if (focus === 'experience' && milestones[roleIndex]) {
    gardener = { x: milestones[roleIndex].x + 34, y: milestones[roleIndex].y + 6 }
  } else if (focus) gardener = TARGETS[focus].stand

  useEffect(() => {
    if (!bubble) return
    const t = setTimeout(() => setBubble(false), 3200)
    return () => clearTimeout(t)
  }, [bubble])

  return (
    <svg
      className={`absolute inset-0 h-full w-full ${focus ? 'is-focused' : ''}`}
      viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
      preserveAspectRatio={narrow || !wide ? 'xMidYMid meet' : 'xMidYMid slice'}
      role="group"
      style={narrow ? { touchAction: 'pan-y', cursor: focus ? 'default' : 'grab' } : undefined}
      onPointerDown={(e) => {
        if (narrow && !focus) drag.current = { x: e.clientX, moved: false, pan }
      }}
      onPointerMove={(e) => {
        const d = drag.current
        if (!d) return
        const dx = e.clientX - d.x
        if (Math.abs(dx) > 6) d.moved = true
        if (d.moved) setPan(Math.max(-300, Math.min(330, d.pan - dx * 2.6)))
      }}
      onPointerUp={() => setTimeout(() => (drag.current = null), 0)}
      onPointerCancel={() => (drag.current = null)}
      onClickCapture={(e) => {
        if (drag.current?.moved) {
          e.stopPropagation()
          e.preventDefault()
        }
      }}
      aria-label="Interactive miniature garden. Each building opens a section of the portfolio."
    >
      <Defs />
      <rect x="-1000" y="-1000" width="4000" height="3000" fill="#4c6548" />
      <g
        className="camera"
        style={{ transform: `translate(${camera.tx}px, ${camera.ty}px) scale(${camera.s})`, transformOrigin: '0 0' }}
      >
        <Ground />
        <Pond />
        <PathLayer skip={milestones} onStones={handleStones} />

        {/* back row of trees & hedges */}
        <Tree x={100} y={190} s={1.15} tone={0} />
        <Tree x={250} y={130} s={1.0} tone={1} delay={1.2} />
        <Tree x={700} y={120} s={1.05} tone={2} delay={.6} />
        <Tree x={830} y={150} s={0.9} tone={0} delay={2} />
        <Tree x={1345} y={150} s={1.1} tone={1} delay={.3} />
        <Tree x={1490} y={230} s={1.2} tone={0} delay={1.6} />
        <Tree x={70} y={470} s={1.05} tone={2} delay={.9} />
        <Tree x={1530} y={470} s={1.0} tone={1} delay={2.4} />
        <Tree x={90} y={900} s={1.1} tone={0} delay={1.1} />
        <Tree x={1510} y={880} s={1.15} tone={2} delay={.2} />
        <Bush x={560} y={150} s={1.1} />
        <Bush x={1000} y={140} s={1.0} tone={1} />
        <Bush x={1250} y={190} s={.9} />
        <Bush x={250} y={470} s={1.1} tone={1} />
        <Bush x={1280} y={800} s={1} />
        <Bush x={620} y={870} s={.9} tone={1} />
        <Bush x={1180} y={560} s={0.95} />

        <Flowers x={300} y={455} n={7} seed={2} />
        <Flowers x={560} y={440} n={6} seed={3} />
        <Flowers x={960} y={450} n={6} seed={4} />
        <Flowers x={1330} y={450} n={7} seed={5} />
        <Flowers x={1060} y={720} n={6} seed={6} />
        <Flowers x={540} y={650} n={5} seed={8} />
        <Flowers x={470} y={790} n={5} seed={9} />
        <Flowers x={1220} y={880} n={6} seed={10} />
        <Flowers x={1450} y={560} n={5} seed={12} />

        <Cottage active={focus === 'about'} onSelect={() => onSelect('about')} />
        <Greenhouse active={focus === 'projects'} onSelect={() => onSelect('projects')} />
        <Shed active={focus === 'skills'} onSelect={() => onSelect('skills')} />
        <Mailbox active={focus === 'contact'} onSelect={() => onSelect('contact')} />

        {/* experience milestone stones */}
        {milestones.map((p, i) => {
          const label = i < roles.length ? `${roles[i].role}, ${roles[i].dates}` : 'Certifications'
          const tag = i < roles.length ? roles[i].start : 'Credentials'
          return (
            <Hotspot
              key={i}
              label={`Path stone: ${label}`}
              tag={tag}
              tx={p.x - 62}
              ty={p.y - 4}
              hit={{ x: p.x - 36, y: p.y - 26, w: 72, h: 52 }}
              active={focus === 'experience' && roleIndex === i}
              onSelect={() => onSelect('experience', i)}
            >
              <ellipse cx={p.x + 4} cy={p.y + 9} rx="36" ry="13" fill="url(#gShadow)" />
              <path d={`M${p.x - 30} ${p.y + 2} L${p.x - 22} ${p.y - 15} L${p.x + 12} ${p.y - 18} L${p.x + 31} ${p.y - 4} L${p.x + 24} ${p.y + 13} L${p.x - 14} ${p.y + 16}Z`} fill="#b9b08f" />
              <path d={`M${p.x - 30} ${p.y - 1} L${p.x - 22} ${p.y - 18} L${p.x + 12} ${p.y - 21} L${p.x + 31} ${p.y - 7} L${p.x + 24} ${p.y + 9} L${p.x - 14} ${p.y + 12}Z`} fill="#dfd6b8" stroke="#a29770" strokeWidth="1.2" />
              <path d={`M${p.x - 20} ${p.y - 14} L${p.x + 10} ${p.y - 17} L${p.x - 8} ${p.y - 2}Z`} fill="#fff" opacity=".22" />
              <text x={p.x + 0.8} y={p.y + 0.8} textAnchor="middle" fontSize="17" fontWeight="600" fill="#fff" opacity=".5" fontFamily="Fraunces, serif">{i + 1}</text>
              <text x={p.x} y={p.y} textAnchor="middle" fontSize="17" fontWeight="600" fill="#6a5d3f" fontFamily="Fraunces, serif">{i + 1}</text>
            </Hotspot>
          )
        })}

        <NightTint />
        <Gardener pos={gardener} bubble={bubble} onClick={() => setBubble(true)} />
        <GlowBlooms />
        <NightLights />
        <Fireflies />
      </g>
      <Clouds />
      <Overlay />
    </svg>
  )
}
