import { useState } from 'react'
import { PlanShell, LcIcon, SOP, useCall } from './LiveCall'
import './PlanPages.css'

/* ------------------------------------------------------------ sample data */

const LEADS = [
  {
    id: 'ritu',
    name: 'Ritu S.',
    initials: 'RS',
    tone: 'peach',
    product: 'Smart Luxe Mattress',
    price: '₹13,390',
    score: 96,
    icp: 92,
    intent: 88,
    signals: ['Visited the store and was added to the CRM', 'Compared two mattress sizes'],
  },
  {
    id: 'mukunda',
    name: 'Mukunda',
    initials: 'MK',
    tone: 'mint',
    product: 'Ortho GRID',
    price: '₹8,490',
    score: 90,
    icp: 87,
    intent: 81,
    signals: ['Asked specifically about EMI options on the Ortho GRID', 'Budget is a live concern'],
  },
  {
    id: 'faizan',
    name: 'Faizan A.',
    initials: 'FA',
    tone: 'blue',
    product: 'Tranquo Massager Chair',
    price: '₹24,990',
    score: 86,
    icp: 84,
    intent: 79,
    signals: ['Confirmed he wants the 6-month no-cost EMI plan', 'Will decide on Monday'],
  },
  {
    id: 'kavitha',
    name: 'Kavitha R.',
    initials: 'KR',
    tone: 'lilac',
    product: 'Tranquo Massager Chair',
    price: '₹24,990',
    score: 82,
    icp: 80,
    intent: 72,
    signals: ['Warm lead from last week’s enquiry', 'Asked about the warranty'],
  },
  {
    id: 'divya',
    name: 'Divya P.',
    initials: 'DP',
    tone: 'peach',
    product: 'Cloud Comfort Mattress',
    price: '₹18,490',
    score: 78,
    icp: 74,
    intent: 63,
    signals: ['Cold lead: one earlier missed call', 'Browsed the mattress range online'],
  },
  {
    id: 'lakshmi',
    name: 'Lakshmi R.',
    initials: 'LR',
    tone: 'mint',
    product: 'Ergo Seat Cushion',
    price: '₹1,299',
    score: 74,
    icp: 70,
    intent: 66,
    signals: ['Existing customer', 'Likely add-on purchase'],
  },
]

const PER_PAGE = 2

const MISSED = [
  { name: 'Faizan A.', when: 'Missed Today 10:05 AM', tag: 'Visited store / in CRM', value: 24990 },
  { name: 'Kavitha R.', when: 'Missed Yesterday 4:40 PM', tag: 'Warm lead', value: 24990 },
  { name: 'Divya P.', when: 'Missed Yesterday 2:15 PM', tag: 'Cold lead', value: 18490 },
  { name: 'Ritu S.', when: 'Missed Today 11:20 AM', tag: 'Visited store / in CRM', value: 13390 },
  { name: 'Unknown', when: 'Missed Yesterday', tag: 'No prior record', value: null },
]

const RECENT = [
  { name: 'Mukunda R.', kind: 'in', when: '10:42 AM', length: '4m 12s', sop: 5 },
  { name: 'Kavitha R.', kind: 'out', when: 'Yesterday', length: '2m 05s', sop: 4 },
  { name: 'Unknown', kind: 'missed', when: 'Yesterday', length: '—' },
  { name: 'Ritu S.', kind: 'missed', when: 'Today 11:20 AM', length: '—' },
  { name: 'Faizan A.', kind: 'missed', when: 'Today 10:05 AM', length: '—' },
  { name: 'Kavitha R.', kind: 'missed', when: 'Yesterday 4:40 PM', length: '—' },
  { name: 'Divya P.', kind: 'missed', when: 'Yesterday 2:15 PM', length: '—' },
  { name: 'Faizan A.', kind: 'out', when: 'Mon 3:05 PM', length: '3m 40s', sop: 6 },
]

const KIND_ICON = { in: 'phonein', out: 'phoneout', missed: 'phonemissed' }
const KIND_LABEL = { in: 'Incoming call', out: 'Outgoing call', missed: 'Missed call' }

const rupees = (n) => `₹${n.toLocaleString('en-IN')}`

function Heading({ title, sub }) {
  return (
    <div className="pp-heading">
      <h2>{title}</h2>
      <p>{sub}</p>
    </div>
  )
}

/* ---------------------------------------------------------- Calls to make */

function CallsToMakeList() {
  const { startCall } = useCall()
  const [page, setPage] = useState(0)
  const [open, setOpen] = useState(null)
  const pages = Math.ceil(LEADS.length / PER_PAGE)
  const rows = LEADS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  const go = (n) => {
    setPage(n)
    setOpen(null)
  }

  return (
    <>
      <Heading
        title="Planned outgoing calls"
        sub="Ranked by lead attractiveness score — tap a lead for the full picture"
      />

      <ul className="pp-list">
        {rows.map((lead) => {
          const isOpen = open === lead.id
          return (
            <li key={lead.id} className={`pp-card lead ${isOpen ? 'open' : ''}`}>
              <button
                className="pp-row"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : lead.id)}
              >
                <span className={`pp-avatar ${lead.tone}`}>{lead.initials}</span>
                <span className="pp-main">
                  <b>{lead.name}</b>
                  <span>Interested: {lead.product} · {lead.price}</span>
                </span>
                <span className="pp-score">
                  <b>{lead.score}</b>
                  <small>SCORE</small>
                </span>
                <span className={`pp-chevron ${isOpen ? 'up' : ''}`}>
                  <LcIcon name="chevron" size={18} />
                </span>
              </button>

              {isOpen && (
                <div className="pp-detail">
                  <div className="pp-bars">
                    <div>
                      <p><span>ICP score</span><b>{lead.icp}</b></p>
                      <i><u style={{ width: `${lead.icp}%` }} /></i>
                    </div>
                    <div>
                      <p><span>Lead intent score</span><b>{lead.intent}</b></p>
                      <i><u style={{ width: `${lead.intent}%` }} /></i>
                    </div>
                  </div>
                  <p className="pp-detail-title">Buying signals</p>
                  <ul>
                    {lead.signals.map((sig) => (
                      <li key={sig}>{sig}</li>
                    ))}
                  </ul>
                  <button className="pp-call" onClick={() => startCall(lead.name)}>
                    <LcIcon name="phone" size={15} /> Call now
                  </button>
                </div>
              )}
            </li>
          )
        })}
      </ul>

      <nav className="pp-pager" aria-label="Pages">
        <button disabled={page === 0} aria-label="Previous page" onClick={() => go(page - 1)}>
          <span className="flip"><LcIcon name="chevron" size={16} /></span>
        </button>
        <span>Page {page + 1} of {pages}</span>
        <button disabled={page === pages - 1} aria-label="Next page" onClick={() => go(page + 1)}>
          <LcIcon name="chevron" size={16} />
        </button>
      </nav>
    </>
  )
}

/* --------------------------------------------------------------- Incoming */

function MissedList() {
  const { startCall } = useCall()
  const total = MISSED.reduce((sum, m) => sum + (m.value || 0), 0)

  return (
    <>
      <Heading
        title="Missed calls"
        sub="Ranked by expected value — call the highest-value leads back first"
      />

      <div className="pp-stats">
        <div>
          <b>{MISSED.length}</b>
          <span>MISSED TODAY</span>
        </div>
        <i />
        <div>
          <b className="green">{rupees(total)}</b>
          <span>EXPECTED VALUE AT STAKE</span>
        </div>
      </div>

      <ul className="pp-list">
        {MISSED.map((m) => (
          <li key={`${m.name}-${m.when}`} className="pp-card missed">
            <span className="pp-kind missed"><LcIcon name="phonemissed" size={20} /></span>
            <span className="pp-main">
              <b>{m.name}</b>
              <span>{m.when} · {m.tag}</span>
            </span>
            <span className="pp-value">
              {m.value ? <b>{rupees(m.value)} expected</b> : <b className="muted">New contact</b>}
              <button className="pp-callback" onClick={() => startCall(m.name)}>
                <LcIcon name="phone" size={14} /> Call back
              </button>
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}

/* ----------------------------------------------------------------- Recent */

function ReviewModal({ call, onClose, onCallBack }) {
  const answered = call.kind !== 'missed'
  const done = call.sop ?? 0

  return (
    <div
      className="pp-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <section className="pp-modal" role="dialog" aria-modal="true" aria-label="Call review">
        <header>
          <span className={`pp-kind ${call.kind}`}>
            <LcIcon name={KIND_ICON[call.kind]} size={20} />
          </span>
          <div>
            <h3>{call.name}</h3>
            <p>{KIND_LABEL[call.kind]} · {call.when} · {call.length}</p>
          </div>
          <button className="pp-x" aria-label="Close" onClick={onClose}>
            <LcIcon name="x" size={18} />
          </button>
        </header>

        {answered ? (
          <>
            <p className="pp-modal-title">
              Reviewed against SOP <b>{done}/{SOP.length}</b>
            </p>
            <ul className="pp-sop">
              {SOP.map((step, i) => (
                <li key={step} className={i < done ? 'ok' : 'miss'}>
                  <span>{i < done ? '✓' : '✕'}</span>
                  {step}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="pp-modal-note">
              This call was not answered, so there is no conversation to review. Calling back
              soon keeps the lead warm.
            </p>
            <button className="pp-call wide" onClick={onCallBack}>
              <LcIcon name="phone" size={15} /> Call back
            </button>
          </>
        )}
      </section>
    </div>
  )
}

function RecentList() {
  const { startCall } = useCall()
  const [review, setReview] = useState(null)

  return (
    <>
      <Heading title="Recent calls" sub="Tap a call to review it against SOP" />

      <ul className="pp-list">
        {RECENT.map((c, i) => (
          <li key={`${c.name}-${i}`} className="pp-card">
            <button className="pp-row" onClick={() => setReview(c)}>
              <span className={`pp-kind ${c.kind}`}>
                <LcIcon name={KIND_ICON[c.kind]} size={20} />
              </span>
              <span className="pp-main">
                <b>{c.name}</b>
                <span>{c.when} · {c.length}</span>
              </span>
              <span className="pp-chevron">
                <LcIcon name="chevron" size={18} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {review && (
        <ReviewModal
          call={review}
          onClose={() => setReview(null)}
          onCallBack={() => {
            startCall(review.name)
            setReview(null)
          }}
        />
      )}
    </>
  )
}

/* ------------------------------------------------------------------ pages */

export const CallsToMake = () => (
  <PlanShell>
    <CallsToMakeList />
  </PlanShell>
)

export const IncomingPage = () => (
  <PlanShell>
    <MissedList />
  </PlanShell>
)

export const RecentPage = () => (
  <PlanShell>
    <RecentList />
  </PlanShell>
)
