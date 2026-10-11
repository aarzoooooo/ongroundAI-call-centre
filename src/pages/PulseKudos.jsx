import { useNavigate } from 'react-router-dom'
import { kudosList, kudosSummary } from '../data/pulse'
import './PulseExtras.css'

export default function PulseKudos() {
  const navigate = useNavigate()
  return (
    <section className="pk">
      <header className="pk-head">
        <button onClick={() => navigate('/pulse')} aria-label="Back to Pulse">←</button>
        <div>
          <h1>🏆 Kudos</h1>
          <p>Team recognition, sent by your leaders</p>
        </div>
      </header>

      <div className="pk-body">
        <p className="pk-note">You receive kudos — leaders send them to celebrate your wins 🎉</p>
        <p className="pk-label">📥 INCOMING KUDOS</p>

        {kudosList.map((k) => (
          <article key={k.id} className={`pk-card ${k.tone}`}>
            <div className="pk-card-top">
              <span className="pk-avatar">{k.initials}</span>
              <div>
                <strong>{k.from}</strong>
                <small>{k.when}</small>
              </div>
              <span className="pk-emoji">{k.emoji}</span>
            </div>
            <blockquote>{k.text}</blockquote>
          </article>
        ))}

        <p className="pk-total">Your all-time kudos: <b>{kudosSummary.total}</b> 🎉</p>
      </div>
    </section>
  )
}
