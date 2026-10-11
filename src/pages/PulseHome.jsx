import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LcIcon } from '../components/LiveCall'
import {
  pulseStore,
  roleAgents,
  taskAgents,
  coachBots,
  generalChannels,
  teamChannels,
  directMessages,
  newMessageTargets,
  kudosSummary,
} from '../data/pulse'
import './PulseHome.css'

const AGENT_ICONS = {
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></>,
  cart: <><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M3 4h2.5l2.2 11h10.6l1.7-8H6.3" /></>,
  list: <><path d="M9 6h11M9 12h11M9 18h11" /><path d="m3.5 6 1 1 2-2M3.5 12l1 1 2-2M3.5 18l1 1 2-2" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  mic: <><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>,
}

function AgentIcon({ name, color }) {
  return (
    <span className="ph-agent-icon" style={{ color }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {AGENT_ICONS[name]}
      </svg>
    </span>
  )
}

const Pin = ({ n }) => <span className="ph-pin">📌 {n}</span>

function AgentRow({ agent, onOpen }) {
  return (
    <button className="ph-agent" style={{ '--accent': agent.color }} onClick={() => onOpen(agent.id)}>
      <AgentIcon name={agent.icon} color={agent.color} />
      <span className="ph-agent-text">
        <strong># {agent.name}</strong>
        <small>{agent.sub}</small>
      </span>
      <span className="ph-agent-meta">
        {agent.value && (
          <b className="ph-metric">{agent.value} <i>▲{agent.delta}</i></b>
        )}
        <Pin n={agent.pins} />
      </span>
    </button>
  )
}

function ChannelRow({ item, onOpen, glyph = '#' }) {
  return (
    <button className="ph-row" onClick={() => onOpen(item.id)}>
      <span className="ph-glyph" aria-hidden="true">
        {item.whatsapp ? <span className="ph-wa">✆</span> : item.spark ? <LcIcon name="sparkles" size={16} /> : glyph}
      </span>
      <span className="ph-row-text">
        <strong>{item.name}</strong>
        <small>{item.preview}</small>
      </span>
      <span className="ph-row-meta">
        {item.time && <time>{item.time}</time>}
        {item.mention && <span className="ph-at">@</span>}
        {item.pins && <span className="ph-pin solid">📌 {item.pins}</span>}
        {item.unread && <span className="ph-unread">{item.unread}</span>}
      </span>
    </button>
  )
}

export default function PulseHome() {
  const navigate = useNavigate()
  const [agentsOpen, setAgentsOpen] = useState(true)
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const open = (id) => navigate(`/pulse/${id}`)
  const askBot = (action) => navigate('/pulse/avanibot', { state: { action } })

  const submitSearch = (event) => {
    event.preventDefault()
    const text = query.trim()
    if (text) navigate('/pulse/avanibot', { state: { action: 'ask', text } })
  }

  return (
    <section className="ph">
      <header className="ph-head">
        <span className="ph-logo" aria-hidden="true"><i /><i /><i /><i /></span>
        <h1>Pulse</h1>
        <span className="ph-store">{pulseStore.name} · {pulseStore.place}</span>
        <button className="ph-plus" aria-label="New message" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>+</button>
        {menuOpen && (
          <div className="ph-menu" role="menu">
            <p>NEW MESSAGE</p>
            {newMessageTargets.map((t) => (
              <button key={t.id} role="menuitem" onClick={() => { setMenuOpen(false); open(t.id) }}>
                <span style={{ background: t.tint, color: t.ink }}>{t.initials}</span>
                {t.name}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="ph-body">
        <form className="ph-search" onSubmit={submitSearch}>
          <span className="ph-search-spark"><LcIcon name="sparkles" size={18} /></span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ask AvaniBot or search Pulse..."
            aria-label="Ask AvaniBot or search Pulse"
          />
          <button type="submit" aria-label="Search" className="ph-search-go">⌕</button>
          <Pin n={1} />
        </form>

        <div className="ph-bot">
          <div className="ph-bot-top">
            <span className="ph-bot-icon"><LcIcon name="sparkles" size={24} /></span>
            <div>
              <h2>AvaniBot <span className="ph-on">ALWAYS ON</span></h2>
              <p>Ask me about anything happening in Pulse — daily briefs, action items, quick answers</p>
            </div>
          </div>
          <div className="ph-bot-actions">
            <button onClick={() => askBot('brief')}><LcIcon name="sparkles" size={15} /> Daily Brief</button>
            <button onClick={() => askBot('ask')}><LcIcon name="chat" size={15} /> Ask a question</button>
          </div>
          <Pin n={1} />
        </div>

        <div className="ph-agents">
          <button className="ph-agents-head" onClick={() => setAgentsOpen(!agentsOpen)} aria-expanded={agentsOpen}>
            <span className="ph-agents-icon"><LcIcon name="sparkles" size={20} /></span>
            <span>
              <strong>Custom Agents</strong>
              <small>Set up by your manager — already live, tap to open</small>
            </span>
            <span className={`ph-caret ${agentsOpen ? 'open' : ''}`}>⌃</span>
          </button>

          {agentsOpen && (
            <div className="ph-agents-body">
              <p className="ph-label role">ROLE AGENTS <em>run a team</em></p>
              {roleAgents.map((a) => <AgentRow key={a.id} agent={a} onOpen={open} />)}
              <p className="ph-label task">TASK AGENTS <em>move one metric</em></p>
              {taskAgents.map((a) => <AgentRow key={a.id} agent={a} onOpen={open} />)}
            </div>
          )}
        </div>

        <div className="ph-coaches">
          {coachBots.map((b) => (
            <button key={b.id} className="ph-coach" onClick={() => open(b.id)}>
              <span className="ph-coach-icon" style={{ background: b.bg }}>{b.emoji}</span>
              <span className="ph-coach-text">
                <strong>{b.name}</strong>
                <small>{b.sub}</small>
              </span>
              <span className="ph-coach-go"><LcIcon name="chevron" size={18} /></span>
            </button>
          ))}
        </div>

        <p className="ph-section">GENERAL</p>
        <div className="ph-list">
          {generalChannels.map((c) => <ChannelRow key={c.id} item={c} onOpen={open} />)}
        </div>

        <button className="ph-kudos" onClick={() => open('kudos')}>
          <span className="ph-kudos-icon"><LcIcon name="trophy" size={26} /></span>
          <span className="ph-kudos-text">
            <strong>Kudos <b>{kudosSummary.fresh} NEW</b></strong>
            <small>{kudosSummary.latest}</small>
          </span>
          <span className="ph-kudos-total"><strong>{kudosSummary.total}</strong><small>ALL-TIME</small></span>
        </button>

        <p className="ph-section">CHANNELS</p>
        <div className="ph-list">
          {teamChannels.map((c) => <ChannelRow key={c.id} item={c} onOpen={open} />)}
        </div>

        <p className="ph-section">DIRECT MESSAGES</p>
        <div className="ph-list">
          {directMessages.map((d) => (
            <button key={d.id} className="ph-row" onClick={() => open(d.id)}>
              <span className="ph-glyph dm" style={{ background: d.tint, color: d.ink }}>{d.initials}</span>
              <span className="ph-row-text">
                <strong>{d.name}</strong>
                <small>{d.preview}</small>
              </span>
              <span className="ph-row-meta"><time>{d.time}</time></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
