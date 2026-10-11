import { useEffect, useRef, useState } from 'react'
import './DemoBar.css'

const CONSENT_ID = 100502
const CALL = { channel: 'Call centre', person: 'Faizan A.' }

const LANGS = [
  {
    code: 'kn',
    label: 'ಕನ್ನಡ',
    text: 'ಇದನ್ನು ರೆಕಾರ್ಡ್ ಮಾಡಬಹುದೇ? ನಿಮ್ಮ ಸೇವೆ ಮತ್ತು ಫಾಲೋ-ಅಪ್‌ಗಾಗಿ ಮಾತ್ರ. ನೀವು ಬೇಡ ಎನ್ನಬಹುದು, ಅಥವಾ ಯಾವಾಗ ಬೇಕಾದರೂ ಅದನ್ನು ಅಳಿಸಲು ಕೇಳಬಹುದು.',
  },
  {
    code: 'hi',
    label: 'हिन्दी',
    text: 'क्या हम इसे रिकॉर्ड कर सकते हैं? सिर्फ़ आपकी सेवा और फ़ॉलो-अप के लिए। आप मना कर सकते हैं, या कभी भी इसे हटाने के लिए कह सकते हैं।',
  },
  {
    code: 'en',
    label: 'English',
    text: 'Can we record this? Only for your service and follow-up. You can say no, or ask us to delete it any time.',
  },
]

const NUDGES = {
  unsure: {
    icon: '!',
    title: 'Customer sounds unsure',
    heard: '“Customer: Umm, I’m not sure about this.”',
    body: 'Re-explain in one line: only for your service and follow-up, and they can stop any time.',
  },
  data: {
    icon: '!',
    title: 'Customer asked about their data',
    heard: '“Customer: What happens to my data?”',
    body: 'Say: it is used only for their service and follow-up, and they can ask us to delete it any time.',
  },
  stop: {
    icon: '■',
    title: 'Recording stopped',
    heard: '“Customer: Please stop recording.”',
    body: 'Done automatically. Erasure is queued. Carry on talking.',
  },
}

const RULES = [
  {
    icon: 'ask',
    tone: 'green',
    title: 'Ask first',
    sec: 'Sec 5–6',
    body: 'Read the line, then send it on WhatsApp. Nothing records until they tap Yes.',
  },
  {
    icon: 'micoff',
    tone: 'grey',
    title: 'No means no',
    sec: 'Sec 6',
    body: 'Carry on without recording. Offers stay off unless they say yes.',
  },
  {
    icon: 'hand',
    tone: 'red',
    title: 'Stop means stop',
    sec: 'Sec 6',
    body: 'The app stops recording itself the moment it hears it.',
  },
  {
    icon: 'dpo',
    tone: 'blue',
    title: 'Data questions go to the DPO',
    sec: 'Sec 11–14',
    body: 'One tap. They get a reference number. Don’t promise anything.',
  },
  {
    icon: 'adduser',
    tone: 'orange',
    title: 'Under 18 needs a parent',
    sec: 'Sec 9',
    body: 'Switch on “Under 18?” and the parent says yes.',
  },
]

const ICONS = {
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  ),
  chat: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  mic: (
    <>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
    </>
  ),
  send: (
    <>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7z" />
    </>
  ),
  x: <path d="M18 6 6 18M6 6l12 12" />,
  ask: (
    <>
      <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
      <path d="M12 15h.01" />
      <path d="M12 7v4" />
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
  hand: (
    <>
      <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </>
  ),
  dpo: (
    <>
      <circle cx="10" cy="8" r="5" />
      <path d="M2 21a8 8 0 0 1 10.434-7.62" />
      <path d="M22 19c0 2-2.5 3-2.5 3s-2.5-1-2.5-3v-2.5l2.5-1 2.5 1z" />
    </>
  ),
  adduser: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M22 11h-6" />
    </>
  ),
  rights: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="m16 11 2 2 4-4" />
    </>
  ),
}

function Icon({ name, size = 16 }) {
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
      {ICONS[name]}
    </svg>
  )
}

export default function DemoBar() {
  // idle | consent | recording | stopped | declined
  const [stage, setStage] = useState('idle')
  const [tab, setTab] = useState('whatsapp')
  const [langCode, setLangCode] = useState('en')
  const [phone, setPhone] = useState('98450 61245')
  const [phoneError, setPhoneError] = useState('')
  const [under18, setUnder18] = useState(false)
  const [sent, setSent] = useState(false)
  const [nudge, setNudge] = useState(null) // { kind, sec }
  const [rightsOpen, setRightsOpen] = useState(false)
  const [rulesOpen, setRulesOpen] = useState(false)

  const startedAt = useRef(null)
  const dialogRef = useRef(null)

  const lang = LANGS.find((l) => l.code === langCode)
  const inCall = stage === 'recording' || stage === 'stopped' || stage === 'declined'

  const closeModal = () => setStage('idle')

  // Escape closes the modal; focus moves into it when it opens
  useEffect(() => {
    if (stage !== 'consent') return undefined
    dialogRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') setStage('idle')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stage])

  // Escape closes the DPDP rules modal; focus moves into it when it opens
  const rulesRef = useRef(null)
  useEffect(() => {
    if (!rulesOpen) return undefined
    rulesRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') setRulesOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [rulesOpen])

  const openConsent = () => {
    setTab('whatsapp')
    setSent(false)
    setPhoneError('')
    setNudge(null)
    setRightsOpen(false)
    setStage('consent')
  }

  const reset = () => {
    setStage('idle')
    setNudge(null)
    setRightsOpen(false)
    startedAt.current = null
  }

  const send = () => {
    if (phone.replace(/\D/g, '').length !== 10) {
      setPhoneError('Enter a 10-digit mobile number.')
      return
    }
    setPhoneError('')
    setSent(true)
  }

  const answer = (yes) => {
    if (yes) {
      startedAt.current = Date.now()
      setStage('recording')
    } else {
      setStage('declined')
    }
  }

  const elapsedSeconds = () =>
    startedAt.current ? Math.max(1, Math.round((Date.now() - startedAt.current) / 1000)) : 1

  const fireNudge = (kind) => {
    if (kind === 'stop') {
      if (stage !== 'recording') return
      setStage('stopped')
    }
    setNudge({ kind, sec: elapsedSeconds() })
  }

  const undoNudge = () => {
    if (nudge?.kind === 'stop') setStage('recording')
    setNudge(null)
  }

  const pillLabel =
    stage === 'recording'
      ? `Recording · ${CONSENT_ID}`
      : stage === 'stopped'
        ? `Stopped · ${CONSENT_ID}`
        : 'Not recording · No logged'

  const nudgeData = nudge ? NUDGES[nudge.kind] : null
  const numberLabel = under18 ? 'Parent’s mobile number' : 'Customer’s mobile number'

  const tapRow = (verb, withChange) => (
    <div className="cf-tap">
      <span className="cf-tag">DEMO</span>
      <span>{verb}</span>
      <button className="cf-yes" onClick={() => answer(true)}>Yes</button>
      <button className="cf-no" onClick={() => answer(false)}>No</button>
      {withChange && (
        <button className="cf-link" onClick={() => setSent(false)}>Change number</button>
      )}
    </div>
  )

  return (
    <>
      {/* ---------- Consent modal ---------- */}
      {stage === 'consent' && (
        <div
          className="cf-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal()
          }}
        >
          <section
            className="cf-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cf-title"
            tabIndex={-1}
            ref={dialogRef}
          >
            <header className="cf-head">
              <span className="cf-shield"><Icon name="shield" size={22} /></span>
              <div className="cf-head-text">
                <p className="cf-title" id="cf-title">Ask before you record</p>
                <p className="cf-sub">{CALL.channel} · {CALL.person}</p>
              </div>
              <button className="cf-x" aria-label="Close" onClick={closeModal}>
                <Icon name="x" size={18} />
              </button>
            </header>

            <p className="cf-step"><span className="cf-num">1</span>Say this · right after hello</p>
            <div className="cf-script">
              <div className="cf-langs">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    className={`cf-lang ${l.code === langCode ? 'on' : ''}`}
                    aria-pressed={l.code === langCode}
                    onClick={() => setLangCode(l.code)}
                  >
                    {l.label}
                  </button>
                ))}
                <span className="cf-more">+20</span>
              </div>
              <p className="cf-script-text" lang={lang.code}>{lang.text}</p>
            </div>

            <p className="cf-step"><span className="cf-num">2</span>Get their yes</p>
            <div className="cf-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={tab === 'whatsapp'}
                className={tab === 'whatsapp' ? 'on' : ''}
                onClick={() => setTab('whatsapp')}
              >
                <Icon name="chat" /> On WhatsApp
              </button>
              <button
                role="tab"
                aria-selected={tab === 'voice'}
                className={tab === 'voice' ? 'on' : ''}
                onClick={() => setTab('voice')}
              >
                <Icon name="mic" /> Said out loud
              </button>
            </div>

            {tab === 'whatsapp' && !sent && (
              <>
                <div className="cf-phone-row">
                  <span className="cf-prefix">+91</span>
                  <input
                    value={phone}
                    inputMode="tel"
                    aria-label={numberLabel}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      setPhoneError('')
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') send()
                    }}
                  />
                  <button className="cf-send" onClick={send}>
                    <Icon name="send" /> Send
                  </button>
                </div>
                {phoneError && <p className="cf-error" role="alert">{phoneError}</p>}
                <p className="cf-help">
                  They get the same words, and tap Yes or No. Offers are asked separately in the message.
                </p>
                <div className="cf-under18">
                  <div>
                    <p className="cf-u-title">Under 18?</p>
                    <p className="cf-u-sub">Send it to a parent’s number instead.</p>
                  </div>
                  <button
                    role="switch"
                    aria-checked={under18}
                    aria-label="Under 18"
                    className={`cf-switch ${under18 ? 'on' : ''}`}
                    onClick={() => setUnder18(!under18)}
                  >
                    <span />
                  </button>
                </div>
              </>
            )}

            {tab === 'whatsapp' && sent && (
              <>
                <div className="cf-wait">
                  <p className="cf-wait-title">
                    <i className="cf-dot" />
                    Sent to {under18 ? 'parent’s number ' : ''}+91 {phone}. Waiting for their tap.
                  </p>
                  <p>
                    Say: “I’ve sent it to your WhatsApp. Just tap Yes or No.” Recording stays off until they do.
                  </p>
                </div>
                {tapRow('They tap:', true)}
              </>
            )}

            {tab === 'voice' && (
              <>
                <div className="cf-wait">
                  <p className="cf-wait-title">
                    <i className="cf-dot" />
                    Waiting for their answer.
                  </p>
                  <p>
                    Ask: “Is it okay to record this call?” Recording stays off until they say yes.
                  </p>
                </div>
                {tapRow('They said:', false)}
              </>
            )}

            <p className="cf-foot">
              A yes gives a Consent ID tied to this call. A no is logged too, and you carry on without recording.
            </p>
          </section>
        </div>
      )}

      {/* ---------- DPDP rules modal ---------- */}
      {rulesOpen && (
        <div
          className="cf-overlay rules-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setRulesOpen(false)
          }}
        >
          <section
            className="cf-modal rules-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rules-title"
            tabIndex={-1}
            ref={rulesRef}
          >
            <header className="rules-head">
              <div className="rules-head-text">
                <h2 className="rules-title" id="rules-title">How this app keeps you DPDP-safe</h2>
                <p className="rules-sub">Five rules. The app does most of the work.</p>
              </div>
              <button className="cf-x" aria-label="Close" onClick={() => setRulesOpen(false)}>
                <Icon name="x" size={18} />
              </button>
            </header>

            <ul className="rules-list">
              {RULES.map((r) => (
                <li className="rule-row" key={r.title}>
                  <span className={`rule-icon ${r.tone}`}>
                    <Icon name={r.icon} size={20} />
                  </span>
                  <div className="rule-text">
                    <div className="rule-top">
                      <p className="rule-title">{r.title}</p>
                      <span className="rule-sec">{r.sec}</span>
                    </div>
                    <p className="rule-body">{r.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="rules-foot">
              Every tap is logged for your DPO, on a trail nobody can quietly change.
            </p>
          </section>
        </div>
      )}

      {/* ---------- Live nudge ---------- */}
      {nudgeData && (
        <div className="nudge" role="alertdialog" aria-live="assertive" aria-label={nudgeData.title}>
          <div className="nudge-top">
            <span className="nudge-icon">{nudgeData.icon}</span>
            <div>
              <p className="nudge-kicker">LIVE NUDGE · SEC {nudge.sec}</p>
              <p className="nudge-title">{nudgeData.title}</p>
              <p className="nudge-heard">Heard: {nudgeData.heard}</p>
            </div>
          </div>
          <p className="nudge-body">{nudgeData.body}</p>
          <div className="nudge-actions">
            <button className="nudge-ok" onClick={() => setNudge(null)}>OK</button>
            <button className="nudge-undo" onClick={undoNudge}>
              {nudge.kind === 'stop' ? 'Misheard, undo' : 'Misheard'}
            </button>
          </div>
        </div>
      )}

      {/* ---------- Floating dock ---------- */}
      <div className="demo-dock">
        {rightsOpen && inCall && (
          <div className="rights-pop" role="note">
            <p className="rights-title">Customer rights</p>
            <ul>
              <li>Say no at any time</li>
              <li>Ask us to stop recording</li>
              <li>Ask us to delete the recording</li>
            </ul>
          </div>
        )}

        <div className="demo-bar" role="toolbar" aria-label="Demo call controls">
          <button className="demo-badge" onClick={reset} title="Reset demo">DEMO</button>

          {inCall ? (
            <>
              <button className="demo-btn chip" onClick={() => fireNudge('unsure')}>“Unsure?”</button>
              <button className="demo-btn chip" onClick={() => fireNudge('data')}>“My data?”</button>
              <button className="demo-btn chip" onClick={() => fireNudge('stop')}>“Stop!”</button>
            </>
          ) : (
            <>
              <button className="demo-btn" onClick={openConsent}>
                <Icon name="phone" /> In-app call
              </button>
              <button className="demo-btn" onClick={openConsent}>
                <Icon name="phone" /> Phone call
              </button>
            </>
          )}

          <button
            className="demo-shield"
            title="Demo mode: calls are simulated"
            aria-label="Demo mode: calls are simulated. How this app keeps you DPDP-safe"
            aria-haspopup="dialog"
            onClick={() => setRulesOpen(true)}
          >
            <Icon name="shield" />
          </button>
        </div>

        {inCall && (
          <div className={`rec-pill ${stage}`}>
            <span className="rec-dot" />
            <span className="rec-label">{pillLabel}</span>
            <span className="rec-sep" />
            <button className="rec-rights" onClick={() => setRightsOpen(!rightsOpen)} aria-expanded={rightsOpen}>
              <Icon name="rights" size={15} /> Rights
            </button>
          </div>
        )}
      </div>
    </>
  )
}
