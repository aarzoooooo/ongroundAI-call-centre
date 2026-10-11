import { useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { channels } from '../data/pulse'
import PulseKudos from './PulseKudos'
import AgentChannel from './AgentChannel'
import { agents } from '../data/agents'
import './PulseExtras.css'

const MENTION = '@You (Arvind R.)'

const timeNow = () =>
  new Date()
    .toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })
    .replace(/\s/g, '')
    .toLowerCase()

const DAILY_BRIEF = [
  '☀️ Here\'s today\'s brief',
  '• Avg Handle Time: 4m 12s ▼8% — nice improvement',
  '• Warranty score down 12% this week — worth a look in #avani-coaching',
  '• Greeting-in-first-10s at 71% — Sunita wants this pushed up',
  '• You\'ve got 3 new kudos waiting 🏆',
  '',
  'Want me to open avani-coaching, or pull up your kudos?',
].join('\n')

const botMessage = (text) => ({ id: Date.now() + Math.random(), from: 'AvaniBot', bot: true, initials: '✨', time: timeNow(), text })
const myMessage = (text) => ({ id: Date.now() + Math.random(), from: 'You', initials: 'AR', time: timeNow(), text, mine: true })

// What AvaniBot says back when Pulse opens it from the home screen buttons.
function startingMessages(channel, action, text) {
  if (channel.name !== 'avanibot') return channel.messages
  if (action === 'brief') {
    return [...channel.messages, myMessage('Give me my daily brief'), botMessage(DAILY_BRIEF)]
  }
  if (action === 'ask') {
    const asked = text ? [myMessage(text), botMessage('Looking into that for you… I\'ll flag anything that needs your attention in Pulse.')] : [botMessage('Sure — what would you like to know? Try "what are my action items from Sunita".')]
    return [...channel.messages, ...asked]
  }
  return channel.messages
}

function botReply(text) {
  if (/brief/i.test(text)) return DAILY_BRIEF
  if (/kudos/i.test(text)) return 'You have 3 new kudos and 12 all-time. Open Kudos in Pulse to read them 🏆'
  if (/action|sunita/i.test(text)) return 'Sunita\'s open action item: push greeting-in-first-10s from 71% to 85%. She\'ll check back Friday.'
  return 'Got it! I\'ll look into that and flag anything that needs your input.'
}

function renderText(text) {
  const [before, after] = text.split(MENTION)
  if (after === undefined) return text
  return (
    <>
      {before}
      <span className="pc-mention">{MENTION}</span>
      {after}
    </>
  )
}

function ChannelView({ channel, openLead }) {
  const navigate = useNavigate()
  const { state } = useLocation()
  const isBot = channel.name === 'avanibot'
  const [messages, setMessages] = useState(() => startingMessages(channel, state?.action, state?.text))
  const [cards, setCards] = useState(channel.needsInputs)
  const [cardsOpen, setCardsOpen] = useState(true)
  const [answers, setAnswers] = useState({})
  const [draft, setDraft] = useState('')
  const endRef = useRef(null)

  const scrollToEnd = () =>
    requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }))

  const addMine = (text) => {
    setMessages((prev) => [...prev, myMessage(text)])
    scrollToEnd()
  }

  const sendMessage = (event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    addMine(text)
    setDraft('')
    if (isBot) {
      window.setTimeout(() => {
        setMessages((prev) => [...prev, botMessage(botReply(text))])
        scrollToEnd()
      }, 600)
    }
  }

  const [toast, setToast] = useState('')

  // Buttons inside bot messages and info cards.
  const runAction = (action) => {
    if (action.to) return navigate(action.to)
    if (action.openLead) return openLead?.(0)
    if (action.share) {
      addMine('Sharing my practice attempt with Sunita and L&D for feedback 🙏')
      setMessages((prev) => [...prev, botMessage('📤 Sent to Sunita Rao (Store Manager) and Fahmy (L&D) — they will reply here with feedback.')])
      setToast('Shared for feedback')
      window.setTimeout(() => setToast(''), 2200)
      return
    }
    if (action.reply) {
      addMine(action.reply)
      setMessages((prev) => [...prev, botMessage('Done — I have taken care of that and will update this channel.')])
    }
  }

  const answerCard = (card, value) => {
    const text = value.trim()
    if (!text) return
    addMine(text)
    setCards((prev) => prev.filter((c) => c.id !== card.id))
    setAnswers((prev) => ({ ...prev, [card.id]: '' }))
    if (card.id === 'hot-leads' && text === 'Calling now') openLead?.(0)
  }

  return (
    <section className="pc">
      <header className="pc-head">
        <button className="pc-back" onClick={() => navigate('/pulse')} aria-label="Back to Pulse">←</button>
        <h1>{channel.title}</h1>
        <button className="pc-spark" aria-label="Ask AvaniBot" onClick={() => navigate('/pulse/avanibot', { state: { action: 'ask' } })}>✦</button>
      </header>

      {cards.length > 0 && (
        <div className="pc-needs">
          <button className="pc-needs-bar" onClick={() => setCardsOpen(!cardsOpen)} aria-expanded={cardsOpen}>
            <span>
              📌 <strong>Needs your input</strong> <b className="pc-badge">{cards.length}</b> <em>pinned</em>
            </span>
            <span>{cardsOpen ? '⌃' : '⌄'}</span>
          </button>

          {cardsOpen &&
            cards.map((card) => (
              <div className="pc-needs-card" key={card.id}>
                <strong>{card.title}</strong>
                <p>{card.detail}</p>
                <div className="pc-options">
                  {card.options.map((option) => (
                    <button key={option} onClick={() => answerCard(card, option)}>{option}</button>
                  ))}
                </div>
                <form
                  className="pc-answer"
                  onSubmit={(event) => {
                    event.preventDefault()
                    answerCard(card, answers[card.id] || '')
                  }}
                >
                  <input
                    value={answers[card.id] || ''}
                    onChange={(event) =>
                      setAnswers((prev) => ({ ...prev, [card.id]: event.target.value }))
                    }
                    placeholder="Or type your answer"
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            ))}
        </div>
      )}

      <div className="pc-feed">
        <p className="pc-day">{channel.day}</p>
        {messages.map((m) => (
          <div key={m.id} className={`pc-msg ${m.mine ? 'mine' : ''}`}>
            {!m.mine && <span className={`pc-avatar ${m.bot ? 'bot' : ''}`}>{m.initials}</span>}
            <div className="pc-msg-body">
              <div className="pc-meta">
                <strong>{m.from}</strong>
                {m.bot && <span className="pc-bot-tag">BOT</span>} <span>{m.time}</span>
              </div>
              <div className="pc-bubble" style={{ whiteSpace: 'pre-line' }}>
                {m.label && <strong>{m.icon} {m.label} </strong>}
                {m.text && renderText(m.text)}
                {m.clip && (
                  <div className="px-clip">
                    <span className="px-clip-play">▶</span>
                    <span><strong>{m.clip.title}</strong><small>{m.clip.sub}</small></span>
                  </div>
                )}
                {m.sent && (
                  <div className="px-sent">
                    <small>✅ SENT</small>
                    <strong>{m.sent.title}</strong>
                    <p>{m.sent.body}</p>
                  </div>
                )}
                {m.card && (
                  <div className="px-card">
                    <div className="px-card-head">
                      <span>{m.card.icon}</span>
                      <strong>{m.card.title}</strong>
                      {m.card.badge && <em>{m.card.badge}</em>}
                    </div>
                    <dl>
                      {m.card.fields.map(([k, v]) => (
                        <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                      ))}
                    </dl>
                    <div className="px-actions">
                      {m.card.actions.map((a) => (
                        <button key={a.label} className={a.primary ? 'primary' : ''} onClick={() => runAction(a)}>{a.label}</button>
                      ))}
                    </div>
                  </div>
                )}
                {m.actions && (
                  <div className="px-actions">
                    {m.actions.map((a) => (
                      <button key={a.label} className={a.primary ? 'primary' : ''} onClick={() => runAction(a)}>{a.label}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {m.mine && <span className="pc-avatar me">AR</span>}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {toast && <div className="px-toast" role="status">{toast}</div>}

      <form className="pc-composer" onSubmit={sendMessage}>
        <input
          autoFocus={state?.action === 'ask'}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={`Message ${channel.title}…`}
        />
        <button type="button" className="pc-emoji" aria-label="Add emoji" onClick={() => setDraft((d) => d + '😊')}>
          😊
        </button>
        <button type="submit" className="pc-send" aria-label="Send message">➤</button>
      </form>
    </section>
  )
}

export default function PulseChannel({ openLead }) {
  const { channelId } = useParams()
  if (channelId === 'kudos') return <PulseKudos />
  if (agents[channelId]) return <AgentChannel key={channelId} agent={agents[channelId]} />
  const channel = channels[channelId]
  if (!channel) return <Navigate to="/pulse" replace />
  return <ChannelView key={channelId} channel={channel} openLead={openLead} />
}