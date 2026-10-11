import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { rank, compositeScore } from '../data/rank'
import './RankModal.css'

export default function RankModal({ onClose }) {
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const composite = compositeScore(rank.rows)

  return createPortal(
    <div className="rk-overlay" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section className="rk" role="dialog" aria-modal="true" aria-labelledby="rk-title">
        <span className="rk-handle" aria-hidden="true" />
        <button className="rk-close" onClick={onClose} aria-label="Close">×</button>

        <header className="rk-head">
          <p className="rk-kicker">YOUR RANK</p>
          <h2 id="rk-title">#{rank.position}</h2>
          <p className="rk-sub">within {rank.store} · {rank.staffRanked} staff ranked</p>
        </header>

        <p className="rk-note">
          Your rank is a weighted blend of the same numbers in <strong>My Progress</strong> above — not just one
          metric. Here's exactly how it adds up this period.
        </p>

        <ul className="rk-rows">
          {rank.rows.map((row) => (
            <li key={row.label}>
              <div className="rk-row-top">
                <span><i aria-hidden="true">{row.icon}</i> {row.label}</span>
                <span><strong>{row.display}</strong> · {row.weight}% weight</span>
              </div>
              <div className="rk-bar"><div style={{ width: `${row.score}%` }} /></div>
            </li>
          ))}
        </ul>

        <div className="rk-composite">
          <strong>Composite score</strong>
          <b>{composite} / 100</b>
        </div>

        <p className="rk-tip">
          <span aria-hidden="true">💡</span>
          <span>
            Closing 1 more lead this week would add ~4 points — enough to pass #2. <strong>Leads Called</strong> is
            your fastest lever right now.
          </span>
        </p>

        <p className="rk-foot">
          Weights are store defaults, set by your manager under Settings → Customer Interaction preferences.
        </p>
      </section>
    </div>,
    document.body,
  )
}
