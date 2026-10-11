import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'

const score = 76
const skills = [
  { name: 'Follow-up', value: 80 },
  { name: 'Greeting', value: 76 },
  { name: 'Product Knowledge', value: 74 },
  { name: 'Warranty', value: 70 },
  { name: 'Objections', value: 65 },
  { name: 'Closing', value: 58 },
]

function Radar({ data }) {
  const size = 300
  const c = size / 2
  const r = 72
  const point = (i, pct) => {
    const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2
    const d = (r * pct) / 100
    return [c + d * Math.cos(angle), c + d * Math.sin(angle)]
  }
  const ring = (scale) => data.map((_, i) => point(i, 100 * scale).join(',')).join(' ')
  const shape = data.map((d, i) => point(i, d.value).join(',')).join(' ')

  return (
    <svg viewBox={`0 ${c - 112} ${size} 224`} className="sm-radar" role="img" aria-label="Skill breakdown">
      {[0.33, 0.66, 1].map((s) => (
        <polygon key={s} points={ring(s)} className="sm-grid" />
      ))}
      {data.map((d, i) => {
        const [x, y] = point(i, 100)
        return <line key={d.name} x1={c} y1={c} x2={x} y2={y} className="sm-spoke" />
      })}
      <polygon points={shape} className="sm-shape" />
      {data.map((d, i) => {
        const [x, y] = point(i, d.value)
        return <circle key={d.name} cx={x} cy={y} r="3.5" className="sm-dot" />
      })}
      {data.map((d, i) => {
        const [x, y] = point(i, 122)
        const dx = x - c
        const anchor = Math.abs(dx) < 4 ? 'middle' : dx > 0 ? 'start' : 'end'
        return (
          <text key={d.name} x={x} y={y} textAnchor={anchor} dominantBaseline="middle" className="sm-label">
            {d.name}
          </text>
        )
      })}
    </svg>
  )
}

export default function ScoreModal({ onClose }) {
  const navigate = useNavigate()
  const [share, setShare] = useState(null) // null | 'compose' | 'posted'
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const R = 52
  const C = 2 * Math.PI * R

  return createPortal(
    <div className="sm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <section className="sm" role="dialog" aria-modal="true" aria-labelledby="sm-title">
        <button className="sm-close" onClick={onClose} aria-label="Close">×</button>

        <p id="sm-title" className="sm-kicker">OG SCORE™</p>

        <svg viewBox="0 0 120 120" className="sm-ring" aria-hidden="true">
          <circle cx="60" cy="60" r={R} className="sm-ring-track" />
          <circle
            cx="60" cy="60" r={R}
            className="sm-ring-value"
            transform="rotate(-90 60 60)"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - score / 100)}
          />
          <text x="60" y="64" textAnchor="middle" className="sm-ring-num">{score}</text>
          <text x="60" y="80" textAnchor="middle" className="sm-ring-den">/ 100</text>
        </svg>

        <p className="sm-delta">▲ +13 since period start</p>
        <p className="sm-sub">72nd percentile across all staff</p>

        <Radar data={skills} />

        <div className="sm-banner">
          <strong>Top 28%</strong> on OG Score™ · +5pts unlocks <strong>+4% earning potential</strong>
          <div className="sm-meter"><span style={{ left: '72%' }} /></div>
          <p>OG Score™ is the number most closely tied to what you earn, so check it every week.</p>
        </div>

        <div className="sm-lever">
          <h3>Your biggest lever right now</h3>
          <p><strong>Closing (58)</strong> — good rapport, but the sale is rarely asked for.</p>
          <p><strong>Objections (65)</strong> — EMI and price pushback stall too many calls.</p>
        </div>
              <button className="sm-cta sm-cta-green" onClick={() => { onClose(); navigate('/pulse/avani-coaching') }}>
          🎓 Practise these 2 skills →
        </button>
        <button className="sm-cta sm-cta-blue" onClick={() => setShare('compose')}>
          in Announce this on LinkedIn
        </button>

        {share && (
          <div className="sm-sheet-wrap" onClick={(e) => e.target === e.currentTarget && setShare(null)}>
            <div className="sm-sheet" role="dialog" aria-modal="true" aria-label="Share on LinkedIn">
              <span className="sm-grab" />
              <button className="sm-sheet-close" onClick={() => setShare(null)} aria-label="Close">×</button>
              {share === 'compose' ? (
                <>
                  <h3 className="sm-sheet-title"><span className="sm-li">in</span> Share your OG Score™ milestone</h3>
                  <p className="sm-draft">
                    Hit a new OG Score™ milestone this month — <strong>76 and climbing</strong> 🚀 Proud of the growth,
                    especially in closing and handling objections with more confidence. Onward and upward!
                    #Sales #GrowthMindset #OnGroundAI
                  </p>
                  <p className="sm-hint">Posts to your LinkedIn profile</p>
                  <button className="sm-cta sm-cta-blue" onClick={() => setShare('posted')}>in Post to LinkedIn</button>
                </>
              ) : (
                <div className="sm-posted">
                  <span className="sm-posted-icon">✓</span>
                  <h3>Posted to LinkedIn</h3>
                  <p>Your OG Score™ milestone is live on your profile.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>,
    document.body
  )
}