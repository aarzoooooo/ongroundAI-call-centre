import { createContext, useContext, useEffect, useState } from 'react'
import './LiveCall.css'

/* ---------------------------------------------------------------- icons */

const PHONE =
  'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'

const PATHS = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  phone: <path d={PHONE} />,
  phoneout: (
    <>
      <polyline points="22 8 22 2 16 2" />
      <line x1="16" x2="22" y1="8" y2="2" />
      <path d={PHONE} />
    </>
  ),
  phonein: (
    <>
      <polyline points="16 2 16 8 22 8" />
      <line x1="22" x2="16" y1="2" y2="8" />
      <path d={PHONE} />
    </>
  ),
  phonecall: (
    <>
      <path d={PHONE} />
      <path d="M14.05 2a9 9 0 0 1 8 7.94" />
      <path d="M14.05 6A5 5 0 0 1 18 10" />
    </>
  ),
  phoneoff: (
    <>
      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
      <path d="m2 2 20 20" />
    </>
  ),
  phonemissed: (
    <>
      <line x1="22" x2="16" y1="2" y2="8" />
      <line x1="16" x2="22" y1="2" y2="8" />
      <path d={PHONE} />
    </>
  ),
  history: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  pulse: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 9h8M8 13h5" />
    </>
  ),
  mic: (
    <>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
    </>
  ),
  micoff: (
    <>
      <path d="m2 2 20 20" />
      <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
      <path d="M5 10v2a7 7 0 0 0 12 5" />
      <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
      <path d="M12 19v3" />
    </>
  ),
  pause: (
    <>
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </>
  ),
  play: <polygon points="6 3 20 12 6 21 6 3" />,
  sparkles: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z" />
    </>
  ),
  trophy: (
    <>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  clipboard: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  chat: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  card: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </>
  ),
  addbox: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 12h8M12 8v8" />
    </>
  ),
  send: (
    <>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7z" />
    </>
  ),
  x: <path d="M18 6 6 18M6 6l12 12" />,
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  chevron: <path d="m9 6 6 6-6 6" />,
  check: <path d="m5 12 5 5 9-10" />,
  dots: (
    <>
      {[5, 12, 19].flatMap((cx) =>
        [5, 12, 19].map((cy) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" fill="currentColor" />
        )),
      )}
    </>
  ),
}

export function LcIcon({ name, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}

/* ---------------------------------------------------------- call content */

const ASSISTS = {
  'Faizan A.': {
    product: 'Tranquo Massager Chair',
    price: '₹24,990',
    interested: 'Interested: Tranquo Massager Chair · ₹24,990',
    crossSell: 'Ergo Seat Cushion · ₹1,299',
    emi: 'Confirmed he wants the 6-month no-cost EMI plan',
    chips: ['Financing Related', 'Warranty Related'],
    unlock: '₹24,990',
    tip: 'Confirmed Monday as the day he’ll decide — call back then, don’t let this go quiet.',
  },
  'Sameer Q.': {
    product: 'Cloud Comfort Mattress',
    price: '₹18,490',
    interested: 'Interested: Cloud Comfort Mattress · ₹18,490',
    crossSell: 'Cooling Pillow Set · ₹2,199',
    emi: 'Asked about the 3-month no-cost EMI plan',
    chips: ['Pricing Related', 'Delivery Related'],
    unlock: '₹18,490',
    tip: 'Caller’s intent is unknown — ask what prompted the call before you offer anything.',
  },
}

function assistFor(name) {
  return (
    ASSISTS[name] || {
      product: 'Tranquo Massager Chair',
      price: '₹24,990',
      interested: 'Interested: Tranquo Massager Chair · ₹24,990',
      crossSell: 'Ergo Seat Cushion · ₹1,299',
      emi: 'Offer the 6-month no-cost EMI plan',
      chips: ['Financing Related', 'Warranty Related'],
      unlock: '₹24,990',
      tip: 'Practice call — open with a greeting, then ask what they are looking for.',
    }
  )
}

// SOP is shared sample data; kept here next to the call UI that uses it.
// eslint-disable-next-line react-refresh/only-export-components
export const SOP = [
  'Greet and verify the customer’s name',
  'Ask for recording consent',
  'Confirm the product they are interested in',
  'Explain the EMI and warranty options',
  'Offer the cross-sell',
  'Confirm the next step and log the outcome',
]

const QUICK_ACTIONS = [
  'Send on WhatsApp',
  'Offer callback slot',
  'Explain warranty terms',
  'Escalate to manager',
]

function answerFor(question) {
  const q = question.toLowerCase()
  if (q.includes('return') || q.includes('refund')) {
    return 'Unused products can be returned within 30 days. Refunds reach the original payment method in 5–7 working days.'
  }
  if (q.includes('warranty')) {
    return 'The chair carries a 3-year warranty on the frame and motor, and 1 year on the upholstery.'
  }
  if (q.includes('emi') || q.includes('finance')) {
    return 'No-cost EMI is available for 3, 6 and 9 months on most cards. 6 months is the one he asked about.'
  }
  if (q.includes('budget') || q.includes('price')) {
    return 'He has not named a budget yet. He did react well to the 6-month EMI, so lead with the monthly amount.'
  }
  return 'Based on this call so far: he is interested and positive. Confirm the next step and the callback time before you hang up.'
}

const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

/* ------------------------------------------------------------ call state */

function useCallSession() {
  const [call, setCall] = useState({
    name: '',
    status: 'idle', // idle | live
    seconds: 0,
    muted: false,
    held: false,
  })

  useEffect(() => {
    if (call.status !== 'live') return undefined
    const id = setInterval(() => {
      setCall((c) => (c.status === 'live' ? { ...c, seconds: c.seconds + 1 } : c))
    }, 1000)
    return () => clearInterval(id)
  }, [call.status, call.name])

  return {
    call,
    begin: (who) =>
      setCall({ name: who, status: 'live', seconds: 0, muted: false, held: false }),
    toggleMute: () => setCall((c) => ({ ...c, muted: !c.muted })),
    toggleHold: () => setCall((c) => ({ ...c, held: !c.held })),
    end: () =>
      setCall({ name: '', status: 'idle', seconds: 0, muted: false, held: false }),
  }
}

const CallContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export function useCall() {
  return useContext(CallContext)
}

/**
 * One call for the whole app, so the red incoming banner and the live call
 * follow you from page to page.
 */
export function CallProvider({ children }) {
  const session = useCallSession()
  const [incoming, setIncoming] = useState(null)

  const value = {
    ...session,
    incoming,
    // a practice call (or any customer) starts ringing everywhere
    ring: (caller) => setIncoming(caller),
    accept: () => {
      if (incoming) session.begin(incoming.name)
      setIncoming(null)
    },
    decline: () => setIncoming(null),
    startCall: (who) => session.begin(who),
  }

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>
}

/* ----------------------------------------------------------- UI pieces */

function IncomingBanner({ incoming, onAccept, onDecline }) {
  return (
    <section className="lc-incoming" aria-live="assertive" aria-label="Incoming call">
      <p className="lc-incoming-kicker">INCOMING CALL</p>
      <p className="lc-incoming-name">{incoming.name}</p>
      <p className="lc-incoming-line">
        <span aria-hidden="true">🎯</span> Intent — · {incoming.line}
      </p>
      <div className="lc-incoming-actions">
        <button className="lc-round decline" aria-label="Decline call" onClick={onDecline}>
          <LcIcon name="phonemissed" size={26} />
        </button>
        <button className="lc-round accept" aria-label="Accept call" onClick={onAccept}>
          <LcIcon name="phone" size={26} />
        </button>
      </div>
    </section>
  )
}

function CallCard({ session }) {
  const { call, toggleMute, toggleHold, end } = session

  return (
    <section className="lc-callcard live" aria-label="Current call">
      <p className="lc-call-kicker">{call.held ? 'CALL ON HOLD' : 'CALL IN PROGRESS'}</p>
      <p className="lc-call-name">{call.name}</p>
      <p className="lc-call-time">{fmt(call.seconds)}</p>

      <p className="lc-sentiment">
        <span>Sentiment</span>
        <b>Positive</b>
      </p>

      <div className="lc-controls">
        <button
          className={`lc-ctl ${call.muted ? 'on' : ''}`}
          aria-label={call.muted ? 'Unmute' : 'Mute'}
          aria-pressed={call.muted}
          onClick={toggleMute}
        >
          <LcIcon name={call.muted ? 'micoff' : 'mic'} size={20} />
        </button>
        <button
          className={`lc-ctl ${call.held ? 'on' : ''}`}
          aria-label={call.held ? 'Resume' : 'Hold'}
          aria-pressed={call.held}
          onClick={toggleHold}
        >
          <LcIcon name={call.held ? 'play' : 'pause'} size={20} />
        </button>
        <button className="lc-ctl end" aria-label="End call" onClick={end}>
          <LcIcon name="phoneoff" size={20} />
        </button>
      </div>
    </section>
  )
}

function AssistPanel({ callName, status }) {
  const a = assistFor(callName)
  const [sopOpen, setSopOpen] = useState(false)
  const [done, setDone] = useState([])
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState(null)
  const [logged, setLogged] = useState([])

  const ask = (e) => {
    e.preventDefault()
    const q = question.trim()
    if (!q) return
    setAnswer({ q, a: answerFor(q) })
    setQuestion('')
  }

  const toggleStep = (i) =>
    setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))

  const logAction = (label) =>
    setLogged((l) => (l.includes(label) ? l.filter((x) => x !== label) : [...l, label]))

  return (
    <section className="lc-assist" aria-label="AI Assist">
      <header className="lc-assist-head">
        <span className="lc-assist-icon"><LcIcon name="sparkles" size={18} /></span>
        <h2>AI Assist</h2>
        <span className={`lc-live ${status}`}>
          <i />
          {status === 'live' ? 'LIVE' : status === 'ended' ? 'ENDED' : 'READY'}
        </span>
      </header>

      <div className="lc-reward">
        <span className="lc-trophy"><LcIcon name="trophy" size={20} /></span>
        <p><b>{a.unlock}</b> unlock</p>
        <p><b className="gold">+7 pts</b> OG Score™</p>
        <p><b>#1</b> rank if closed</p>
      </div>

      <div className="lc-assist-body">
        <h3 className="lc-sec amber">
          <LcIcon name="target" size={17} /> MAIN OBJECTIVE — WHAT TO OFFER
        </h3>
        <div className="lc-product">
          <span className="lc-thumb" aria-hidden="true">🛋️</span>
          <div>
            <p className="lc-product-name">{a.product} · {a.price}</p>
            <p className="lc-product-sub">{a.interested}</p>
          </div>
        </div>

        <div className="lc-offers">
          <div className="lc-offer">
            <p className="lc-offer-kicker">
              <LcIcon name="addbox" size={13} /> CROSS-SELL THIS
            </p>
            <p>{a.crossSell}</p>
          </div>
          <div className="lc-offer">
            <p className="lc-offer-kicker">
              <LcIcon name="card" size={13} /> EMI TO OFFER
            </p>
            <p>{a.emi}</p>
          </div>
        </div>

        <div className="lc-chips">
          {a.chips.map((c) => (
            <span className="lc-chip tan" key={c}>{c}</span>
          ))}
        </div>

        <button
          className="lc-sec violet lc-sop-toggle"
          aria-expanded={sopOpen}
          onClick={() => setSopOpen(!sopOpen)}
        >
          <LcIcon name="clipboard" size={17} /> SOP CHECKLIST — THIS CALL
          <span className="lc-sop-count">{done.length}/{SOP.length}</span>
        </button>
        {sopOpen && (
          <ul className="lc-sop">
            {SOP.map((step, i) => (
              <li key={step}>
                <label>
                  <input
                    type="checkbox"
                    checked={done.includes(i)}
                    onChange={() => toggleStep(i)}
                  />
                  <span>{step}</span>
                </label>
              </li>
            ))}
          </ul>
        )}

        <h3 className="lc-sec violet ask">
          <LcIcon name="chat" size={17} /> ASK AI ABOUT THIS CALL
        </h3>
        <form className="lc-ask" onSubmit={ask}>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. what’s our return policy? has he mentioned a budget?"
            aria-label="Ask AI about this call"
          />
          <button type="submit" aria-label="Send question">
            <LcIcon name="send" size={20} />
          </button>
        </form>
        {answer && (
          <div className="lc-answer" role="status">
            <p className="lc-answer-q">{answer.q}</p>
            <p>{answer.a}</p>
          </div>
        )}

        <div className="lc-tip">
          <span aria-hidden="true">💡</span>
          <p><b>Tip:</b> {a.tip}</p>
        </div>

        <div className="lc-chips actions">
          {QUICK_ACTIONS.map((q) => (
            <button
              key={q}
              className={`lc-chip violet ${logged.includes(q) ? 'on' : ''}`}
              aria-pressed={logged.includes(q)}
              onClick={() => logAction(q)}
            >
              {logged.includes(q) && <LcIcon name="check" size={14} />} {q}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function DialPad() {
  const [open, setOpen] = useState(false)
  const [digits, setDigits] = useState('')
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']

  return (
    <>
      {open && (
        <div className="lc-pad" role="dialog" aria-label="Dial pad">
          <div className="lc-pad-top">
            <output className="lc-pad-display">{digits || 'Enter number'}</output>
            <button
              className="lc-pad-back"
              aria-label="Delete last digit"
              onClick={() => setDigits(digits.slice(0, -1))}
            >
              ⌫
            </button>
          </div>
          <div className="lc-pad-grid">
            {keys.map((k) => (
              <button key={k} onClick={() => setDigits((d) => (d + k).slice(0, 15))}>
                {k}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        className="lc-fab"
        aria-label={open ? 'Close dial pad' : 'Open dial pad'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <LcIcon name={open ? 'x' : 'dots'} size={26} />
      </button>
    </>
  )
}

function Banner({ kicker, title, chip }) {
  return (
    <div className="plan-banner">
      <div>
        <small>{kicker}</small>
        <h1>{title}</h1>
      </div>
      <span className="plan-date">{chip}</span>
    </div>
  )
}

/**
 * Frame shared by Calls to make, Incoming and Recent:
 * planner banner, the red incoming-call banner when someone is ringing,
 * then either the page's list or, once a call is live, the call workspace.
 */
export function PlanShell({ children }) {
  const c = useCall()
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
  const live = c.call.status === 'live'

  return (
    <>
      <Banner kicker="Today's calling plan" title="Planner" chip={today} />
      <div className="lc-body">
        {c.incoming && (
          <IncomingBanner incoming={c.incoming} onAccept={c.accept} onDecline={c.decline} />
        )}
        {live ? (
          <div className="lc-row">
            <CallCard session={c} />
            <AssistPanel key={c.call.name} callName={c.call.name} status="live" />
          </div>
        ) : (
          children
        )}
      </div>
      <DialPad />
    </>
  )
}
