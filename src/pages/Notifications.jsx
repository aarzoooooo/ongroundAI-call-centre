import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { notifications, olderNotifications } from '../data/notifications'

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'action', label: 'Needs action' },
  { key: 'alert', label: 'Alerts' },
]

export default function Notifications() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('all')
  const [showOlder, setShowOlder] = useState(false)

  const items = showOlder ? [...notifications, ...olderNotifications] : notifications
  const visible = tab === 'all' ? items : items.filter((n) => n.kind === tab)
  const actionCount = items.filter((n) => n.kind === 'action').length
  const alertCount = items.length - actionCount

  return (
    <section className="np">
      <header className="np-head">
        <button className="np-back" onClick={() => navigate(-1)} aria-label="Go back">←</button>
        <div>
          <h1>Notifications</h1>
          <p>{actionCount} need action · {alertCount} alerts</p>
        </div>
      </header>

      <div className="np-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            className={tab === t.key ? 'active' : ''}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ul className="np-list">
        {visible.map((n) => (
          <li key={n.id} className={`np-item ${n.kind}`}>
            <span className="np-icon">{n.icon}</span>
            <div>
              <div className="np-meta">
                <span className="np-tag">{n.kind === 'action' ? 'ACTION NEEDED' : 'ALERT'}</span>
                <time>{n.time}</time>
              </div>
              <p>{n.text}</p>
              {n.link && (
                <button className="np-link" onClick={() => navigate(n.link.to)}>
                  {n.link.label} →
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {!showOlder && (
        <button className="np-more" onClick={() => setShowOlder(true)}>Load more ↓</button>
      )}
    </section>
  )
}