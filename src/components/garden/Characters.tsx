export function CharDefs() {
  const hair = (id: string, a: string, b: string) => (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor={a} />
      <stop offset="1" stopColor={b} />
    </linearGradient>
  )
  const grad = (id: string, a: string, b: string) => hair(id, a, b)
  return (
    <defs>
      {hair('gcHair', '#5a3f31', '#2c1d16')}
      {hair('gcHairBlack', '#3a2e2c', '#16100f')}
      {hair('gcHairHoney', '#e0b672', '#b98a4a')}
      {hair('gcHairChestnut', '#9a5b3c', '#5e3220')}
      {grad('gcDress', '#97b186', '#5d7b55')}
      {grad('gcGold', '#e4d49f', '#c9b576')}
      {grad('gcForest', '#68866a', '#3e5a3e')}
      {grad('gcPeach', '#e3b5a0', '#c68f78')}
      {grad('gcDenim', '#93a9b2', '#657f8c')}
      <radialGradient id="gcSkin" cx="40%" cy="35%" r="75%">
        <stop offset="0" stopColor="#f3cfb2" />
        <stop offset="1" stopColor="#dca98a" />
      </radialGradient>
      <radialGradient id="gcSkin2" cx="40%" cy="35%" r="75%">
        <stop offset="0" stopColor="#c98f6a" />
        <stop offset="1" stopColor="#a56c4a" />
      </radialGradient>
    </defs>
  )
}

const Face = () => (
  <g>
    <ellipse cx="-3.8" cy="-54" rx="1.3" ry="1.7" fill="#2f2019" />
    <ellipse cx="3.8" cy="-54" rx="1.3" ry="1.7" fill="#2f2019" />
    <circle cx="-3.4" cy="-54.7" r=".5" fill="#fff" />
    <circle cx="4.2" cy="-54.7" r=".5" fill="#fff" />
    <circle cx="-6.6" cy="-50.6" r="2" fill="#e8908a" opacity=".4" />
    <circle cx="6.6" cy="-50.6" r="2" fill="#e8908a" opacity=".4" />
    <path d="M-2 -49.6 q2 1.8 4 0" stroke="#b9705e" strokeWidth="1" fill="none" strokeLinecap="round" />
  </g>
)

const Head = () => <circle cx="0" cy="-55" r="10.6" fill="url(#gcSkin)" />

const Legs = ({ shoe = '#4a3426' }: { shoe?: string }) => (
  <g>
    <rect x="-6" y="-14" width="4.4" height="10" rx="2.2" fill="url(#gcSkin)" />
    <rect x="1.6" y="-14" width="4.4" height="10" rx="2.2" fill="url(#gcSkin)" />
    <path d="M-8.4 -1.5 Q-4 -5 -1 -1.5 V0 H-8.4Z" fill={shoe} />
    <path d="M1 -1.5 Q4.4 -5 8.4 -1.5 V0 H1Z" fill={shoe} />
  </g>
)

const Flower = ({ x, y, c = '#e7b1c0', r = 1 }: { x: number; y: number; c?: string; r?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${r})`}>
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse key={a} cx="0" cy="-2.8" rx="1.9" ry="3" fill={c} transform={`rotate(${a})`} />
    ))}
    <circle r="1.5" fill="#e3b94f" />
  </g>
)

/** The gardener: chestnut bob, forest beret, wild bouquet. */
export function Beret() {
  return (
    <g>
      <path d="M-13.5 -56 Q-15 -70 0 -70 Q15 -70 13.5 -56 L13.8 -43 H-13.8Z" fill="url(#gcHairChestnut)" />
      <Legs />
      <path d="M-9 -34 H9 L18 -11 Q0 -5 -18 -11Z" fill="url(#gcPeach)" />
      <path d="M-7.5 -47 H7.5 L9 -34 H-9Z" fill="url(#gcPeach)" />
      <path d="M-6.5 -47 Q0 -41 6.5 -47 L4.5 -48.5 Q0 -45 -4.5 -48.5Z" fill="#f1ecdc" />
      <rect x="-9" y="-36" width="18" height="2.4" rx="1" fill="#f1ecdc" opacity=".85" />
      <path d="M-8.5 -43 Q-12 -37 -5 -30" stroke="url(#gcSkin)" strokeWidth="3.6" strokeLinecap="round" fill="none" />
      <path d="M8.5 -43 Q12 -37 5 -30" stroke="url(#gcSkin)" strokeWidth="3.6" strokeLinecap="round" fill="none" />
      <circle cx="-8.8" cy="-43" r="3.8" fill="#f1ecdc" />
      <circle cx="8.8" cy="-43" r="3.8" fill="#f1ecdc" />
      {/* bouquet */}
      <g transform="translate(0 -29)">
        <path d="M-6.5 -2 L0 -12 L6.5 -2 Q0 3 -6.5 -2Z" fill="#efe6c8" stroke="#cdbf93" strokeWidth=".6" />
        <path d="M0 -11 V-16 M-3 -10 L-6 -15 M3 -10 L6 -15" stroke="#5a7a52" strokeWidth="1" fill="none" />
        <Flower x={-6} y={-17} c="#efe6c8" r={0.95} />
        <Flower x={0} y={-19} c="#e7b1c0" r={1} />
        <Flower x={6} y={-17} c="#c9b6e0" r={0.95} />
        <Flower x={-2.8} y={-14} c="#e4d199" r={0.8} />
        <Flower x={3} y={-14} c="#efe6c8" r={0.8} />
      </g>
      <Head />
      <path d="M-11 -54 Q-12.6 -68 0 -68 Q12.6 -68 11 -54 Q9 -60 3 -62 Q-3 -58 -11 -54Z" fill="url(#gcHairChestnut)" />
      <path d="M-12.4 -57 Q-14.2 -47 -12.8 -42.5 Q-9.2 -42 -8.2 -47 L-9 -57Z" fill="url(#gcHairChestnut)" />
      <path d="M12.4 -57 Q14.2 -47 12.8 -42.5 Q9.2 -42 8.2 -47 L9 -57Z" fill="url(#gcHairChestnut)" />
      <path d="M-11 -56 Q-3 -61 3 -62 Q8 -60 11 -55 Q6 -58 0 -58 Q-6 -58 -11 -56Z" fill="#6f3f29" opacity=".55" />
      <Face />
      {/* beret */}
      <g transform="rotate(-10 0 -67)">
        <ellipse cx="2" cy="-67" rx="12.5" ry="4.8" fill="url(#gcForest)" />
        <path d="M-8 -68 Q2 -76 12 -68" fill="#4c6548" />
        <circle cx="2" cy="-72.2" r="1.2" fill="#3e5a3e" />
      </g>
    </g>
  )
}
