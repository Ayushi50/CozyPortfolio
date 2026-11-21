import { useCallback, useEffect, useRef, useState } from 'react'
import { roles, sections, type SectionId } from './data/content'
import { Garden } from './components/garden/Garden'
import { Hud } from './components/ui/Hud'
import { ClassicView } from './components/ClassicView'
import { AboutPanel } from './components/panels/AboutPanel'
import { ProjectsPanel } from './components/panels/ProjectsPanel'
import { ExperiencePanel } from './components/panels/ExperiencePanel'
import { SkillsPanel } from './components/panels/SkillsPanel'
import { ContactPanel } from './components/panels/ContactPanel'
import { useSound } from './lib/useSound'

function useWide() {
  const [w, setW] = useState(() => window.innerWidth / window.innerHeight >= 1.6)
  useEffect(() => {
    const h = () => setW(window.innerWidth / window.innerHeight >= 1.6)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return w
}

function useNarrow() {
  const [n, setN] = useState(() => window.innerWidth < 760 || window.innerHeight > window.innerWidth * 1.1)
  useEffect(() => {
    const h = () => setN(window.innerWidth < 760 || window.innerHeight > window.innerWidth * 1.1)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return n
}

export default function App() {
  const [focus, setFocus] = useState<SectionId | null>(null)
  const [dialog, setDialog] = useState<SectionId | null>(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [visited, setVisited] = useState<Set<SectionId>>(new Set())
  const [classic, setClassic] = useState(false)
  const narrow = useNarrow()
  const wide = useWide()
  const { muted, toggle, play } = useSound()
  const timer = useRef<number | undefined>(undefined)

  const open = useCallback(
    (id: SectionId, extra?: number) => {
      window.clearTimeout(timer.current)
      setClassic(false)
      setDialog(null)
      setFocus(id)
      if (id === 'experience') setRoleIndex(extra ?? 0)
      setVisited((v) => new Set(v).add(id))
      play(id === 'contact' ? 659.25 : 523.25)
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      timer.current = window.setTimeout(() => setDialog(id), reduce ? 0 : 950)
    },
    [play],
  )

  const home = useCallback(() => {
    window.clearTimeout(timer.current)
    setDialog(null)
    setFocus(null)
    play(392, 0.4)
  }, [play])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('input,textarea,select') || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'Escape') {
        if (classic) setClassic(false)
        else home()
        return
      }
      const s = sections.find((x) => x.key === e.key)
      if (s) open(s.id)
      if (e.key === '6') window.open('https://ayushi-dev.netlify.app/images/Ayushi_Resume.pdf', '_blank', 'noreferrer')
      if (e.key.toLowerCase() === 'm') toggle()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, home, toggle, classic])

  return (
    <div className="relative h-full w-full overflow-hidden bg-forest-deep">
      <h1 className="sr-only">Ayushi — Software Engineer. An interactive garden portfolio.</h1>
      <Garden focus={focus} roleIndex={roleIndex} narrow={narrow} wide={wide} onSelect={open} />
      <Hud
        focus={focus}
        visited={visited}
        muted={muted}
        classic={classic}
        onOpen={open}
        onHome={home}
        onToggleSound={toggle}
        onToggleClassic={() => {
          home()
          setClassic((c) => !c)
        }}
      />
      {dialog === 'about' && <AboutPanel onClose={home} />}
      {dialog === 'projects' && <ProjectsPanel onClose={home} onPick={() => play(587.33, 0.35)} />}
      {dialog === 'experience' && <ExperiencePanel index={roleIndex} setIndex={(n) => setRoleIndex(Math.max(0, Math.min(roles.length, n)))} onClose={home} />}
      {dialog === 'skills' && <SkillsPanel onClose={home} />}
      {dialog === 'contact' && <ContactPanel onClose={home} />}
      {classic && <ClassicView onExit={() => setClassic(false)} />}
    </div>
  )
}
