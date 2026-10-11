import { useState } from 'react'
import { LcIcon } from './LiveCall'
import './CalendarPage.css'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

// date is YYYY-MM-DD
const EVENTS = [
  {
    date: '2026-10-23',
    time: '11:00',
    ampm: 'AM',
    title: 'SOP coaching session',
    who: 'With Sunita Rao (Manager) · via #callcentre-team',
  },
  {
    date: '2026-10-26',
    time: '2:30',
    ampm: 'PM',
    title: 'Warranty pitch refresher',
    who: 'With L&D team · flagged from your last 3 calls',
  },
  {
    date: '2026-10-28',
    time: '10:00',
    ampm: 'AM',
    title: 'Weekly team huddle',
    who: 'With the whole team · via #callcentre-team',
  },
]

const pad = (n) => String(n).padStart(2, '0')
const iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`

export default function CalendarPage() {
  const now = new Date()
  const todayIso = iso(now.getFullYear(), now.getMonth(), now.getDate())

  const [view, setView] = useState({ y: now.getFullYear(), m: now.getMonth() })
  const [picked, setPicked] = useState(todayIso)
  const [notice, setNotice] = useState('')

  const monthLabel = new Date(view.y, view.m, 1).toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  })
  const lead = new Date(view.y, view.m, 1).getDay()
  const days = new Date(view.y, view.m + 1, 0).getDate()

  const eventDates = new Set(EVENTS.map((e) => e.date))
  const allUpcoming = EVENTS.filter((e) => e.date >= todayIso)
  // Clicking a date that has events narrows the list to that day; any other date shows everything upcoming.
  const dayEvents = allUpcoming.filter((e) => e.date === picked)
  const upcoming = dayEvents.length ? dayEvents : allUpcoming

  const shift = (by) => setView(({ y, m }) => {
    const d = new Date(y, m + by, 1)
    return { y: d.getFullYear(), m: d.getMonth() }
  })

  const goToday = () => {
    setView({ y: now.getFullYear(), m: now.getMonth() })
    setPicked(todayIso)
  }

  const share = (ev) => {
    setNotice(`“${ev.title}” sent to your mailbox`)
    window.setTimeout(() => setNotice(''), 3000)
  }

  const cells = [
    ...Array.from({ length: lead }, (_, i) => ({ blank: i })),
    ...Array.from({ length: days }, (_, i) => ({ day: i + 1 })),
  ]

  return (
    <div className="cal-page">
      <header className="cal-head">
        <span className="cal-head-icon"><LcIcon name="calendar" size={22} /></span>
        <div>
          <h1>Calendar</h1>
          <p>Reminders and your calls</p>
        </div>
      </header>

      <p className="cal-info">
        Callbacks, coaching sessions and meeting invites all show up here — and in your mailbox.
      </p>

      <section className="cal-card" aria-label={monthLabel}>
        <div className="cal-nav">
          <button aria-label="Previous month" onClick={() => shift(-1)}>
            <span className="flip"><LcIcon name="chevron" size={16} /></span>
          </button>
          <h2>{monthLabel}</h2>
          <button className="today" onClick={goToday}>Today</button>
          <button aria-label="Next month" onClick={() => shift(1)}>
            <LcIcon name="chevron" size={16} />
          </button>
        </div>

        <div className="cal-grid cal-weekdays" aria-hidden="true">
          {WEEKDAYS.map((d, i) => <span key={i}>{d}</span>)}
        </div>

        <div className="cal-grid">
          {cells.map((c) => {
            if (c.blank !== undefined) return <span key={`b${c.blank}`} />
            const id = iso(view.y, view.m, c.day)
            return (
              <button
                key={id}
                className={`cal-day ${id === todayIso ? 'today' : ''} ${id === picked ? 'picked' : ''}`}
                aria-label={`${c.day} ${monthLabel}${eventDates.has(id) ? ', has events' : ''}`}
                aria-pressed={id === picked}
                onClick={() => setPicked(id === picked ? todayIso : id)}
              >
                {c.day}
                {eventDates.has(id) && <i />}
              </button>
            )
          })}
        </div>
      </section>

      <h3 className="cal-upcoming-title">UPCOMING</h3>
      {upcoming.length === 0 ? (
        <p className="cal-empty">Nothing coming up.</p>
      ) : (
        <ul className="cal-events">
          {upcoming.map((ev) => (
            <li key={ev.date + ev.title} className={ev.date === picked ? 'on' : ''}>
              <span className="cal-time">
                <b>{ev.time}</b>
                <b>{ev.ampm}</b>
              </span>
              <div className="cal-ev-main">
                <p className="cal-ev-title">{ev.title}</p>
                <p className="cal-ev-who"><LcIcon name="users" size={15} /> {ev.who}</p>
              </div>
              <button className="cal-share" aria-label={`Share ${ev.title}`} onClick={() => share(ev)}>
                <LcIcon name="share" size={17} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {notice && <div className="cal-toast" role="status">{notice}</div>}
    </div>
  )
}
