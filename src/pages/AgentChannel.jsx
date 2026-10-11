import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LcIcon } from '../components/LiveCall'
import './AgentChannel.css'

const UPDATES = ['Done', 'Not yet', 'Need help']

const timeNow = () =>
  new Date()
    .toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })
    .replace(/\s/g, '')
    .toLowerCase()

export default function AgentChannel({ agent }) {
  const navigate = useNavigate()
  const [panelOpen, setPanelOpen] = useState(true)
  const [acked, setAcked] = useState(false)
  const [updates, setUpdates] = useState({})
  const [messages, setMessages] = useState(agent.feed)
  const [draft, setDraft] = useState('')
  const endRef = useRef(null)

  const pending = agent.tasks.filter((t) => !updates[t.id]).length

  const addMine = (text) => {
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), mine: true, time: timeNow(), text }])
    requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }))
  }

  const setUpdate = (task, value) => {
    setUpdates((prev) => ({ ...prev, [task.id]: value }))
    addMine(`${task.who}: ${value}`)
  }

  const send = (event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    addMine(text)
    setDraft('')
  }

  return (
    <section className="ax" style={{ '--agent': agent.color }}>
      <header className="ax-head">
        <button className="ax-back" onClick={() => navigate('/pulse')} aria-label="Back to Pulse">←</button>
        <div className="ax-title">
          <h1># {agent.name} <span>{agent.badge}</span></h1>
          <p>{agent.subtitle}</p>
        </div>
        {agent.metric && (
          <div className="ax-metric">
            {agent.metric.label} <b>{agent.metric.value}</b> <i>{agent.metric.delta}</i>
          </div>
        )}
        <span className="ax-members" aria-label={`${agent.members} members`}>
          <LcIcon name="users" size={14} /> {agent.members}
        </span>
      </header>

      <div className="ax-period">
        <p>📅 <strong>Period: MTD · 1–4 Oct 2026</strong> · conversations = count</p>
        <div className="ax-score">
          <span className="ax-scope">{agent.scope}</span>
          {agent.scorecard.map((s) => (
            <div key={s.label} className="ax-cell">
              <small>{s.label}</small>
              <span className={`ax-pill ${s.tone}`}>
                <b>{s.value}</b> {s.of} <strong>{s.pct}%</strong>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="ax-context">
        <button className="ax-context-bar" onClick={() => setPanelOpen(!panelOpen)} aria-expanded={panelOpen}>
          <span className="ax-context-title">My Context &amp; Tasks</span>
          <span className="ax-for-you">FOR YOU</span>
          <span className="ax-count">{pending}</span>
          <span className="ax-context-note">From your manager · {agent.tasks.length} tasks · {pending} to action</span>
          <span className={`ax-caret ${panelOpen ? 'open' : ''}`}>⌃</span>
        </button>

        {panelOpen && (
          <div className="ax-context-body">
            <p className="ax-kicker">INCOMING CONTEXT</p>
            <p className="ax-sent">{agent.contextSent}</p>
            {agent.big && (
              <p className="ax-big"><b className={agent.big.tone}>{agent.big.value}</b> {agent.big.text}</p>
            )}
            {agent.summary && <p className="ax-line">{agent.summary}</p>}
            <p className="ax-good">✓ Did well: {agent.didWell}</p>
            <p className="ax-improve">↗ Improve: {agent.improve}</p>

            <p className="ax-kicker">MY TASKS TODAY</p>
            <div className="ax-tasks">
              <div className="ax-ack">
                <strong>Acknowledge today's tasks</strong>
                <button onClick={() => setAcked(true)} disabled={acked}>{acked ? 'Got it ✓' : 'Got it'}</button>
              </div>
              <div className="ax-task-list">
                <span className="ax-type">{agent.taskType}</span>
                {agent.tasks.map((task) => (
                  <div className="ax-task" key={task.id}>
                    <p><strong>{task.who}</strong> · {task.detail}</p>
                    <div className="ax-update">
                      <span>Update:</span>
                      {UPDATES.map((u) => (
                        <button
                          key={u}
                          className={updates[task.id] === u ? 'on' : ''}
                          onClick={() => setUpdate(task, u)}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="ax-feed">
        <p className="ax-day">Today</p>
        {messages.map((m) =>
          m.mine ? (
            <div key={m.id} className="ax-msg mine">
              <div>
                <p className="ax-meta"><strong>You</strong> <time>{m.time}</time></p>
                <p className="ax-bubble">{m.text}</p>
              </div>
            </div>
          ) : (
            <div key={m.id} className="ax-msg">
              <span className="ax-bot"><LcIcon name="sparkles" size={16} /></span>
              <div>
                <p className="ax-meta">
                  <strong>AvaniBot</strong> <time>{m.time}</time>
                  {m.tag && <em className="ax-tag">{m.tag}</em>}
                </p>
                <p className="ax-text">
                  {m.bold ? (
                    <>
                      {m.text.split(m.bold)[0]}
                      <strong>{m.bold}</strong>
                      {m.text.split(m.bold)[1]}
                    </>
                  ) : m.text}
                </p>
              </div>
            </div>
          ),
        )}
        <div ref={endRef} />
      </div>

      <form className="ax-composer" onSubmit={send}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={`Message #${agent.name}`}
          aria-label={`Message #${agent.name}`}
        />
        <button type="submit" className="ax-send" aria-label="Send message"><LcIcon name="send" size={18} /></button>
      </form>
    </section>
  )
}
