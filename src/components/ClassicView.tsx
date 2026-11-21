import { about, certifications, profile, projects, roles, skillGroups } from '../data/content'

export function ClassicView({ onExit }: { onExit: () => void }) {
  const h2 = 'font-display text-3xl font-semibold text-forest-deep'
  return (
    <div className="paper scroll-soft absolute inset-0 z-50 overflow-y-auto">
      <div className="mx-auto max-w-3xl px-5 py-10">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-5xl font-semibold text-forest-deep">{profile.name}</h1>
            <p className="mt-1 text-lg">{profile.role} — {profile.tagline}</p>
          </div>
          <button onClick={onExit} className="rounded-full bg-forest px-4 py-2 text-sm font-semibold text-cream">
            ← Back to the garden
          </button>
        </header>
        <nav aria-label="Sections" className="mt-5 flex flex-wrap gap-4 text-sm font-semibold text-forest underline">
          <a href="#c-about">About</a><a href="#c-projects">Projects</a><a href="#c-exp">Experience</a>
          <a href="#c-skills">Skills</a><a href="#c-contact">Contact</a>
          <a href={profile.resume} target="_blank" rel="noreferrer">Resume ↗</a>
        </nav>
        <main className="mt-8 space-y-12">
          <section id="c-about"><h2 className={h2}>About</h2><p className="mt-2">{about.intro}</p><p className="mt-2">{about.background}</p></section>
          <section id="c-projects"><h2 className={h2}>Projects</h2>
            {projects.map((p) => (
              <article key={p.id} className="mt-5"><h3 className="text-xl font-bold">{p.name}</h3><p>{p.overview}</p>
                <p className="mt-1 text-sm">Tech: {p.tech.join(', ')}</p>
                <p className="mt-1 text-sm font-semibold text-forest">
                  {p.live && <a className="mr-4 underline" href={p.live}>Live ↗</a>}{p.github && <a className="underline" href={p.github}>GitHub ↗</a>}
                </p></article>
            ))}</section>
          <section id="c-exp"><h2 className={h2}>Experience</h2>
            {[...roles].reverse().map((r) => (
              <article key={r.id} className="mt-5"><h3 className="text-xl font-bold">{r.role} · {r.company}</h3><p className="text-sm">{r.dates}</p>
                <ul className="mt-1 list-disc pl-5">{r.work.map((w) => <li key={w}>{w}</li>)}</ul>
                <p className="mt-1 text-sm">Tech: {r.tech.join(', ')}</p></article>
            ))}
            <h3 className="mt-6 text-xl font-bold">Certifications</h3>
            <ul className="list-disc pl-5">{certifications.map((c) => <li key={c.title}><a className="underline" href={c.href}>{c.title}</a> — {c.issuer}</li>)}</ul></section>
          <section id="c-skills"><h2 className={h2}>Skills</h2>
            {skillGroups.map((g) => <p key={g.id} className="mt-2"><b>{g.title}:</b> {g.items.join(' · ')}</p>)}</section>
          <section id="c-contact"><h2 className={h2}>Contact</h2>
            <p className="mt-2">There’s always room for a new adventure.</p>
            <ul className="mt-2 list-disc pl-5">
              <li><a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li><a className="underline" href={profile.linkedin}>LinkedIn</a></li>
              <li><a className="underline" href={profile.github}>GitHub</a></li></ul></section>
        </main>
      </div>
    </div>
  )
}
