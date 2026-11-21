import { Hotspot } from './Hotspot'

interface BProps {
  active?: boolean
  onSelect: () => void
}

/* ============================ COTTAGE ============================ */
export function Cottage({ active, onSelect }: BProps) {
  return (
    <Hotspot
      label="The cottage — About Ayushi"
      tag="The Cottage · About"
      tx={430}
      ty={178}
      hit={{ x: 270, y: 190, w: 330, h: 240 }}
      active={active}
      onSelect={onSelect}
    >
      <g transform="translate(430 418)">
        <ellipse cx="40" cy="8" rx="250" ry="34" fill="url(#gShadow)" />
        {/* foundation */}
        <rect x="-122" y="-24" width="244" height="26" rx="4" fill="#9b917a" />
        <g stroke="#7e755f" strokeWidth="1.5" opacity=".7">
          <path d="M-90 -24v26M-50 -24v26M-8 -24v26M36 -24v26M80 -24v26" />
        </g>
        {/* walls */}
        <rect x="-116" y="-118" width="232" height="96" fill="url(#gWall)" />
        <rect x="-116" y="-118" width="232" height="96" fill="url(#gSide)" />
        <rect x="-116" y="-118" width="232" height="96" fill="none" stroke="#b9ae92" strokeWidth="1.5" />
        {/* timber frame */}
        <g fill="#a47955">
          <rect x="-116" y="-118" width="9" height="96" />
          <rect x="107" y="-118" width="9" height="96" />
          <rect x="-116" y="-66" width="232" height="7" opacity=".85" />
          <path d="M-107 -59 L-70 -118 M107 -59 L70 -118" stroke="#a47955" strokeWidth="6" />
        </g>
        {/* roof */}
        <path d="M-158 -104 L-100 -196 H100 L158 -104 Z" fill="url(#gRoof)" />
        <path d="M-158 -104 L-100 -196 H100 L158 -104 Z" fill="url(#gSide)" />
        <path d="M-158 -104 L-100 -196 H100 L158 -104" fill="none" stroke="#a4705a" strokeWidth="3" strokeLinejoin="round" />
        <g stroke="#b88068" strokeWidth="2" opacity=".75" fill="none">
          <path d="M-143 -126 H143 M-129 -148 H129 M-114 -170 H114" />
          <path d="M-60 -196 L-72 -104 M-20 -196 L-24 -104 M20 -196 L24 -104 M60 -196 L72 -104 M-100 -196 L-118 -104 M100 -196 L118 -104" opacity=".5" />
        </g>
        <rect x="-104" y="-202" width="208" height="9" rx="4" fill="#b68b68" />
        {/* eave shadow */}
        <rect x="-116" y="-104" width="232" height="10" fill="#000" opacity=".1" />
        {/* dormer */}
        <g transform="translate(0 -134)">
          <rect x="-24" y="-18" width="48" height="36" fill="#e6dfc9" stroke="#b9ae92" strokeWidth="2" />
          <path d="M-32 -16 L0 -44 L32 -16 Z" fill="#c68f78" stroke="#a4705a" strokeWidth="2" strokeLinejoin="round" />
          <rect x="-13" y="-8" width="26" height="22" rx="13" fill="#a9c4c0" stroke="#8a6445" strokeWidth="3" />
          <path d="M0 -8 V14 M-13 3 H13" stroke="#8a6445" strokeWidth="2" />
        </g>
        {/* chimney */}
        <rect x="62" y="-232" width="34" height="62" fill="#a59a82" />
        <rect x="58" y="-238" width="42" height="10" rx="2" fill="#8d836c" />
        <g stroke="#867c66" strokeWidth="1.5"><path d="M62 -216h34M62 -198h34M79 -232v14M70 -216v18M88 -198v16" /></g>
        <g fill="#f2efe6">
          <circle className="smoke" cx="80" cy="-246" r="9" />
          <circle className="smoke" cx="80" cy="-246" r="9" style={{ animationDelay: '2s' }} />
          <circle className="smoke" cx="80" cy="-246" r="9" style={{ animationDelay: '4s' }} />
        </g>
        {/* door */}
        <path d="M-27 -22 V-72 A27 27 0 0 1 27 -72 V-22 Z" fill="#8a6445" stroke="#6b4b32" strokeWidth="3" />
        <path d="M-19 -22 V-70 A19 19 0 0 1 19 -70 V-22 Z" fill="#a67a55" />
        <path d="M0 -89 V-22 M-19 -50 H19" stroke="#7c5a3d" strokeWidth="2.5" />
        <circle cx="12" cy="-45" r="3" fill="#e2c26b" />
        <rect x="-33" y="-24" width="66" height="8" rx="2" fill="#a59a82" />
        <rect x="-40" y="-18" width="80" height="8" rx="2" fill="#988d76" />
        {/* windows */}
        {[-78, 78].map((x) => (
          <g key={x} transform={`translate(${x} -78)`}>
            <rect x="-34" y="-3" width="14" height="46" fill="#879b76" />
            <rect x="20" y="-3" width="14" height="46" fill="#879b76" />
            <rect x="-19" y="-4" width="38" height="46" rx="3" fill="#a9c4c0" stroke="#8a6445" strokeWidth="4" />
            <path d="M0 -4 V42 M-19 19 H19" stroke="#8a6445" strokeWidth="2.5" />
            <path d="M-15 0 L-4 0 L-15 14Z" fill="#fff" opacity=".35" />
            <rect x="-26" y="40" width="52" height="12" rx="3" fill="#9c7452" />
            <g className="sway-soft">
              <circle cx="-16" cy="38" r="6" fill="#d5a28c" />
              <circle cx="-4" cy="36" r="6" fill="#d5c79d" />
              <circle cx="8" cy="38" r="6" fill="#e9e4d4" />
              <circle cx="19" cy="36" r="5" fill="#d5a28c" />
            </g>
            <path d="M-26 44 q6 -8 12 0 t12 0 t12 0 t12 0" fill="#4c6548" opacity=".9" />
          </g>
        ))}
        {/* vines */}
        <g className="sway" style={{ animationDuration: '8s' }}>
          {[[-112, -40, 11], [-118, -62, 9], [-110, -84, 12], [-120, -102, 8], [-106, -22, 9]].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? '#4c6548' : '#6b8460'} />
          ))}
          {[[-114, -52], [-108, -94], [-120, -75]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.5" fill="#d5a28c" />
          ))}
        </g>
        {/* lantern */}
        <g transform="translate(52 -70)">
          <path d="M0 -14 V-6" stroke="#6b4b32" strokeWidth="2" />
          <rect x="-6" y="-6" width="12" height="16" rx="3" fill="#f6dc8a" stroke="#6b4b32" strokeWidth="2" />
          <circle cx="0" cy="2" r="14" fill="#f6dc8a" opacity=".25" />
        </g>
        {/* stoop pots */}
        <g transform="translate(-62 0)">
          <path d="M-12 -22 H12 L9 0 H-9Z" fill="#c68f78" />
          <g className="sway-soft"><ellipse cx="0" cy="-34" rx="14" ry="12" fill="#6b8460" /><circle cx="-5" cy="-40" r="5" fill="#d5c79d" /></g>
        </g>
      </g>
    </Hotspot>
  )
}

/* =========================== GREENHOUSE =========================== */
export function Greenhouse({ active, onSelect }: BProps) {
  const ribs = [-104, -78, -52, 52, 78, 104]
  return (
    <Hotspot
      label="The greenhouse — Projects"
      tag="The Greenhouse · Projects"
      tx={1130}
      ty={186}
      hit={{ x: 975, y: 195, w: 310, h: 240 }}
      active={active}
      onSelect={onSelect}
    >
      <g transform="translate(1130 418)">
        <ellipse cx="34" cy="8" rx="215" ry="28" fill="url(#gShadow)" />
        {/* interior dark */}
        <path d="M-132 -34 V-128 L0 -208 L132 -128 V-34 Z" fill="#35503a" />
        {/* plants inside */}
        <g>
          <g className="sway-soft"><ellipse cx="-96" cy="-70" rx="22" ry="34" fill="#6b8460" /><ellipse cx="-84" cy="-80" rx="14" ry="26" fill="#879b76" /></g>
          <g className="sway-soft" style={{ animationDelay: '1s' }}><ellipse cx="-62" cy="-56" rx="18" ry="22" fill="#879b76" /><circle cx="-62" cy="-82" r="7" fill="#d5a28c" /></g>
          <g className="sway-soft" style={{ animationDelay: '.5s' }}><ellipse cx="70" cy="-72" rx="24" ry="36" fill="#6b8460" /><circle cx="76" cy="-104" r="7" fill="#d5c79d" /></g>
          <g className="sway-soft" style={{ animationDelay: '1.6s' }}><ellipse cx="102" cy="-56" rx="16" ry="24" fill="#879b76" /></g>
          <rect x="-128" y="-48" width="82" height="9" fill="#8a6445" />
          <rect x="44" y="-48" width="84" height="9" fill="#8a6445" />
        </g>
        {/* door opening glow */}
        <rect x="-26" y="-100" width="52" height="66" fill="#f0e3b0" opacity=".85" />
        <g opacity=".9">
          <ellipse cx="0" cy="-52" rx="16" ry="12" fill="#879b76" />
          <circle cx="0" cy="-66" r="6" fill="#d5a28c" />
        </g>
        {/* glass */}
        <path d="M-132 -34 V-128 L0 -208 L132 -128 V-34 Z" fill="url(#gGlass)" />
        <g stroke="#e9e4d4" strokeWidth="2.5" opacity=".9" fill="none">
          {ribs.map((x) => (
            <path key={x} d={`M${x} -34 V${-128 - (132 - Math.abs(x)) * -0.0 + (Math.abs(x) > 0 ? -(132 - Math.abs(x)) * 0.6 : 0)}`} />
          ))}
          <path d="M-132 -82 H132" />
          <path d="M-132 -128 L0 -208 L132 -128" strokeWidth="5" stroke="#cdbf93" />
          <path d="M0 -208 V-128" />
          <path d="M-66 -168 V-128 M66 -168 V-128" />
          <path d="M-132 -128 H132" strokeWidth="2" />
        </g>
        <path d="M-120 -120 L-70 -120 L-120 -62Z" fill="#fff" opacity=".22" />
        <path d="M-40 -178 L10 -178 L-40 -140Z" fill="#fff" opacity=".2" />
        {/* base wall */}
        <rect x="-140" y="-36" width="280" height="38" rx="4" fill="#b68b68" />
        <rect x="-140" y="-36" width="280" height="38" rx="4" fill="url(#gSide)" />
        <rect x="-140" y="-36" width="280" height="8" rx="3" fill="#cfa684" />
        <g stroke="#8a6445" strokeWidth="1.5" opacity=".6"><path d="M-110 -28V0M-70 -28V0M-30 -28V0M30 -28V0M70 -28V0M110 -28V0" /></g>
        {/* door frame + door */}
        <rect x="-29" y="-103" width="58" height="69" fill="none" stroke="#8a6445" strokeWidth="5" />
        <g className="gh-door">
          <rect x="-26" y="-100" width="52" height="66" fill="#bcd5d0" opacity=".75" stroke="#8a6445" strokeWidth="3" />
          <path d="M0 -100V-34M-26 -66H26" stroke="#8a6445" strokeWidth="2.5" />
          <circle cx="17" cy="-62" r="2.8" fill="#e2c26b" />
        </g>
        <rect x="-36" y="-2" width="72" height="8" rx="2" fill="#a59a82" />
        {/* finial */}
        <path d="M0 -208 V-226" stroke="#8a6445" strokeWidth="3" />
        <circle cx="0" cy="-229" r="5" fill="#d5c79d" />
        {/* outside pots and watering can */}
        <g transform="translate(-170 0)">
          <path d="M-14 -26 H14 L10 0 H-10Z" fill="#c68f78" />
          <g className="sway-soft"><ellipse cx="0" cy="-40" rx="18" ry="16" fill="#6b8460" /><circle cx="6" cy="-50" r="6" fill="#d5a28c" /><circle cx="-8" cy="-46" r="5" fill="#d5c79d" /></g>
        </g>
        <g transform="translate(170 0)">
          <path d="M-12 -22 H12 L9 0 H-9Z" fill="#b68b68" />
          <g className="sway-soft" style={{ animationDelay: '.8s' }}><ellipse cx="0" cy="-34" rx="14" ry="14" fill="#879b76" /></g>
          <path d="M20 -14 h20 l-3 14 h-14z" fill="#8f9fa0" />
          <path d="M40 -12 l14 -10" stroke="#8f9fa0" strokeWidth="4" strokeLinecap="round" />
        </g>
      </g>
    </Hotspot>
  )
}

/* ============================== SHED ============================== */
export function Shed({ active, onSelect }: BProps) {
  return (
    <Hotspot
      label="The tool shed — Skills"
      tag="The Tool Shed · Skills"
      tx={1392}
      ty={540}
      hit={{ x: 1285, y: 560, w: 215, h: 160 }}
      active={active}
      onSelect={onSelect}
    >
      <g transform="translate(1392 716)">
        <ellipse cx="24" cy="6" rx="140" ry="20" fill="url(#gShadow)" />
        <rect x="-76" y="-96" width="152" height="94" fill="url(#gWood)" />
        <rect x="-76" y="-96" width="152" height="94" fill="url(#gSide)" />
        <g stroke="#8a6445" strokeWidth="2" opacity=".55">
          {Array.from({ length: 13 }).map((_, i) => (
            <path key={i} d={`M${-70 + i * 12} -96V-2`} />
          ))}
        </g>
        <path d="M-96 -92 L-84 -136 H96 L100 -92 Z" fill="#8a6445" />
        <path d="M-96 -92 L-84 -136 H96 L100 -92 Z" fill="url(#gRoof)" opacity=".5" />
        <path d="M-96 -92 H100" stroke="#6b4b32" strokeWidth="5" />
        <g stroke="#6b4b32" strokeWidth="1.5" opacity=".5"><path d="M-90 -110H98M-87 -122H96" /></g>
        {/* door */}
        <rect x="-18" y="-72" width="48" height="70" fill="#6f4e35" stroke="#53392a" strokeWidth="3" />
        <path d="M-18 -72 L30 -2 M30 -72 L-18 -2" stroke="#53392a" strokeWidth="3" />
        <circle cx="22" cy="-36" r="3" fill="#e2c26b" />
        {/* window */}
        <rect x="-62" y="-76" width="30" height="28" rx="2" fill="#a9c4c0" stroke="#53392a" strokeWidth="3" />
        <path d="M-47 -76V-48M-62 -62H-32" stroke="#53392a" strokeWidth="2" />
        {/* hanging tools */}
        <g transform="translate(60 -90)">
          <path d="M0 0 V70" stroke="#8a6445" strokeWidth="4" strokeLinecap="round" />
          <path d="M-9 70 h18 l-3 14 h-12z" fill="#9aa5a6" />
        </g>
        <g transform="translate(78 -90)">
          <path d="M0 0 V74" stroke="#8a6445" strokeWidth="4" strokeLinecap="round" />
          <path d="M-8 -2 h16 v12 h-16z" fill="#9aa5a6" transform="translate(0 66)" />
        </g>
        {/* barrel */}
        <g transform="translate(-100 0)">
          <path d="M-18 -42 q-6 20 0 42 h36 q6 -22 0 -42z" fill="#a47955" />
          <path d="M-18 -30h36M-17 -12h34" stroke="#6b4b32" strokeWidth="3" />
          <ellipse cx="0" cy="-42" rx="18" ry="5" fill="#cfa684" />
        </g>
        {/* pots stack */}
        <g transform="translate(112 0)">
          <path d="M-12 -22H12L9 0H-9Z" fill="#c68f78" />
          <path d="M-10 -40H10L8 -22H-8Z" fill="#d5a28c" />
        </g>
        <g className="sway-soft" transform="translate(112 -42)"><ellipse rx="10" ry="12" fill="#879b76" /></g>
      </g>
    </Hotspot>
  )
}

/* ============================= MAILBOX ============================= */
export function Mailbox({ active, onSelect }: BProps) {
  return (
    <Hotspot
      label="The mailbox — Contact"
      tag="The Mailbox · Contact"
      tx={935}
      ty={650}
      hit={{ x: 890, y: 685, w: 100, h: 160 }}
      active={active}
      onSelect={onSelect}
    >
      <g transform="translate(940 848)">
        <ellipse cx="10" cy="4" rx="46" ry="10" fill="url(#gShadow)" />
        <rect x="-5" y="-96" width="10" height="96" rx="3" fill="#a47955" />
        <rect x="-18" y="-24" width="36" height="6" rx="3" fill="#8a6445" />
        {/* box */}
        <path d="M-34 -92 V-122 A34 34 0 0 1 34 -122 V-92 Z" fill="#7f6a58" />
        {/* open interior + letter */}
        <path d="M-27 -94 V-122 A27 27 0 0 1 27 -122 V-94 Z" fill="#3b2f28" />
        <rect x="-16" y="-124" width="32" height="26" rx="2" fill="#f1ecdc" transform="rotate(-6)" />
        <path d="M-16 -124 L0 -112 L16 -124" fill="none" stroke="#c9bf9f" strokeWidth="1.5" transform="rotate(-6)" />
        <circle cx="2" cy="-114" r="3" fill="#d5a28c" transform="rotate(-6)" />
        {/* door flap */}
        <path className="mb-flap" d="M-34 -92 V-122 A34 34 0 0 1 34 -122 V-92 Z" fill="#d5a28c" stroke="#b3806a" strokeWidth="2.5" />
        <path d="M-22 -118 q22 -26 44 0" fill="none" stroke="#fff" strokeWidth="3" opacity=".3" strokeLinecap="round" />
        <circle cx="0" cy="-104" r="3" fill="#8a6445" />
        {/* flag */}
        <g className="mb-flag" transform="translate(34 -108)">
          <rect x="-2" y="-30" width="5" height="34" rx="2" fill="#8a6445" />
          <path d="M3 -30 h18 v12 h-18z" fill="#c07a6a" />
        </g>
        <g className="sway-soft"><circle cx="-26" cy="0" r="9" fill="#d5a28c" /><circle cx="-14" cy="-3" r="7" fill="#d5c79d" /><circle cx="26" cy="-1" r="8" fill="#e9e4d4" /></g>
      </g>
    </Hotspot>
  )
}
