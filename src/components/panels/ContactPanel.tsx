import { useState } from 'react'
import { profile } from '../../data/content'
import { Dialog, ExtLink } from '../ui/Dialog'

export function ContactPanel({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }
  return (
    <Dialog title="A letter for you" eyebrow="Contact · from the mailbox" onClose={onClose}>
      <div className="letter mx-auto max-w-xl rounded-md border border-wood/40 letter-paper p-6 shadow-[0_18px_40px_-18px_rgba(0,0,0,.4)] sm:p-9" style={{ backgroundImage: 'repeating-linear-gradient(transparent 0 31px, rgba(182,139,104,.18) 31px 32px)' }}>
        <p className="font-display text-xl italic text-forest-deep">Dear visitor,</p>
        <p className="mt-3 leading-8">
          Thanks for wandering through the garden. I’m open to interesting engineering opportunities and conversations about reliable, useful software.
        </p>
        <ul className="mt-5 space-y-3">
          <li className="flex flex-wrap items-center gap-3">
            <span className="w-24 text-xs font-bold uppercase tracking-widest text-wood-deep">Email</span>
            <a className="font-semibold text-forest underline decoration-peach decoration-2 underline-offset-4" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <button onClick={copy} className="rounded-full border border-wood/50 px-3 py-0.5 text-xs font-semibold text-forest-deep hover:bg-gold/60">
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-24 text-xs font-bold uppercase tracking-widest text-wood-deep">LinkedIn</span>
            <a className="font-semibold text-forest underline decoration-peach decoration-2 underline-offset-4" href={profile.linkedin} target="_blank" rel="noreferrer">
              in/itsayushi ↗
            </a>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-24 text-xs font-bold uppercase tracking-widest text-wood-deep">GitHub</span>
            <a className="font-semibold text-forest underline decoration-peach decoration-2 underline-offset-4" href={profile.github} target="_blank" rel="noreferrer">
              Ayushi50 ↗
            </a>
          </li>
        </ul>
        <p className="mt-6 font-display text-2xl italic text-forest-deep">There’s always room for a new adventure.</p>
        <p className="mt-1 text-right font-display text-lg text-wood-deep">— Ayushi</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ExtLink primary href={`mailto:${profile.email}`}>
            Write me a letter ✉
          </ExtLink>
          <ExtLink href={profile.resume}>Download resume ↓</ExtLink>
        </div>
      </div>
    </Dialog>
  )
}
