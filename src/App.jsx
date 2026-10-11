import { useState } from 'react'
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import './App.css'
import './dashboard-match.css'
import OtherPages from './OtherPages'
import TopBarActions from './components/TopBarActions'
import DateRangeSheet from './components/DateRangeSheet'
import CsatTrend from './components/CsatTrend'
import DemoBar from './components/DemoBar'
import { useCall, LcIcon } from './components/LiveCall'
import { CallsToMake, IncomingPage, RecentPage } from './components/PlanPages'
import CalendarPage from './components/CalendarPage'
import { rangeFor, formatRangeLabel } from './utils/dateRange'
import Avatar from './pages/Avatar'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import PulseChannel from './pages/PulseChannel'
import PulseHome from './pages/PulseHome'

const stats = [
  { label: 'OG SCORE™', value: '76', change: '▲ 13' },
  { label: 'AVG HANDLE TIME', value: '4m 12s', change: '▼ 8%' },
  { label: 'CSAT TODAY', value: '94%', change: '▲ 2pt' },
  { label: 'IN QUEUE', value: '2', change: '● live' },
]

const tasks = [
  { icon: 'phone', tone: 'blue', title: '2 callbacks', detail: 'next 4:30pm', to: '/pulse/callcentre-team' },
  { icon: 'users', tone: 'violet', title: '2 hot leads', detail: 'untouched 24h', to: '/pulse/avanibot' },
  { icon: 'clipboard', tone: 'amber', title: '1 outcome', detail: 'to log', to: '/pulse/avanibot' },
]

const callers = [
  {
    name: 'Priya Iyer',
    detail: 'Likely billing dispute — flagged before',
    time: '4m 20s',
  },
  {
    name: 'Suresh Nair',
    detail: 'Plan upgrade enquiry',
    time: '1m 50s',
  },
]

const leads = [
  {
    name: 'Priya Sharma',
    company: 'Acme Retail',
    phone: '+91 98765 43210',
    icp: 92,
    intent: 88,
    signals: [
      'Recently enquired about a premium plan',
      'High purchase intent',
    ],
  },
  {
    name: 'Rahul Mehta',
    company: 'Bright Living',
    phone: '+91 98765 12345',
    icp: 84,
    intent: 76,
    signals: [
      'Requested more information about the product',
      'Follow-up recommended',
    ],
  },
  {
    name: 'Neha Rao',
    company: 'Urban Nest',
    phone: '+91 99887 66554',
    icp: 78,
    intent: 65,
    signals: [
      'Visited the product enquiry page',
      'Potential interest in a new plan',
    ],
  },
  {
    name: 'Karan Shah',
    company: 'HomeStyle',
    phone: '+91 98765 23456',
    icp: 73,
    intent: 61,
    signals: [
      'Previously contacted the sales team',
      'May need a follow-up call',
    ],
  },
  {
    name: 'Ananya Das',
    company: 'Living Spaces',
    phone: '+91 98765 34567',
    icp: 69,
    intent: 57,
    signals: [
      'Enquired about available plans',
      'Lead needs further qualification',
    ],
  },
]

const navigation = [
  { label: 'Dashboard', icon: 'grid', tone: 'green', path: '/' },
  { label: 'Plan', icon: 'phone', tone: 'blue', path: '/plan' },
  { label: 'Calls to make', icon: 'phoneout', path: '/calls-to-make', sub: true },
  { label: 'Incoming', icon: 'phonein', path: '/incoming', sub: true },
  { label: 'Recent', icon: 'history', path: '/recent', sub: true },
  { label: 'Practise a call', icon: 'phonecall', path: '/practise', sub: true },
  { label: 'Calendar', icon: 'calendar', tone: 'amber', path: '/calendar', calendar: true },
  { label: 'Pulse', icon: 'pulse', tone: 'violet', path: '/pulse' },
]

function NavIcon({ item }) {
  return (
    <span className={`nav-icon ${item.sub ? 'plain' : `tile ${item.tone}`}`}>
      <LcIcon name={item.icon} size={item.sub ? 19 : 20} />
    </span>
  )
}

const planPaths = ['/plan', '/calls-to-make', '/incoming', '/recent', '/practise']

function HeadsetIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" />
    </svg>
  )
}

function Dashboard() {
  const navigate = useNavigate()
  const [range, setRange] = useState(() => ({
    preset: 'This Week',
    ...rangeFor('This Week'),
  }))
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <>
      <section className="dashboard-header">
        <div>
          <p className="greeting">Good afternoon 👋</p>
          <h1>Arvind Rajan</h1>
          <p className="company">The Sleep Company · Call Centre</p>
        </div>

        <div className="header-actions">
          <span className="queue-status">● On Queue</span>
          <button className="week-button" onClick={() => setSheetOpen(true)}>
            <LcIcon name="calendar" size={15} />
            {formatRangeLabel(range)}
            <span className="week-caret"><LcIcon name="chevron" size={14} /></span>
          </button>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
              <span>{stat.change}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-content">
        <div className="left-column">
          <article className="progress-card">
            <h2>● MY PROGRESS · TODAY</h2>

            <div className="progress-grid">
              <div>
                <strong>3</strong>
                <span>▲ +1</span>
                <p>Leads Created</p>
              </div>

              <div>
                <strong>2</strong>
                <span>▲ +2</span>
                <p>Leads Called</p>
              </div>
            </div>
          </article>

          <section className="waiting-section">
            <div className="section-heading">
              <h2>WHO'S WAITING</h2>
              <button className="text-link" onClick={() => navigate('/plan')}>
                Open planner →
              </button>
            </div>

            {callers.map((caller) => (
              <article className="caller-card" key={caller.name}>
                <div className="caller-icon"><HeadsetIcon size={16} /></div>
                <div className="caller-info">
                  <strong>{caller.name}</strong>
                  <p>{caller.detail}</p>
                </div>
                <span className="wait-time">{caller.time}</span>
              </article>
            ))}
          </section>
        </div>

        <div className="right-column">
          <article className="earnings-card">
            <div className="earnings-heading">
              <strong>💰 My earnings this month</strong>
              <span>₹800 to ₹6,000 slab</span>
            </div>

            <div className="earnings-total">
              ₹5,200 <span>₹1,700 from coached moves</span>
            </div>

            <div className="earnings-track">
              <div />
            </div>
          </article>

          <article className="tasks-card" id="tasks">
            <h2>
              <LcIcon name="clipboard" size={16} /> My Tasks <span>3</span>
            </h2>

            {tasks.map((task) => (
              <button
                className="task-row"
                key={task.title}
                onClick={() => navigate(task.to)}
              >
                <span className={`task-icon ${task.tone}`}><LcIcon name={task.icon} size={16} /></span>
                <span>
                  <strong>{task.title}</strong> <small>{task.detail}</small>
                </span>
                <span className="task-arrow"><LcIcon name="chevron" size={16} /></span>
              </button>
            ))}
          </article>
        </div>

        <section className="chart-section">
          <h2>CALLS HANDLED · LAST 7 DAYS</h2>

          <div className="chart-card">
            {[
              ['Mon', 18],
              ['Tue', 22],
              ['Wed', 15],
              ['Thu', 26],
              ['Fri', 20],
              ['Sat', 12],
              ['Today', 14],
            ].map(([day, value]) => (
              <div className="bar-column" key={day}>
                <span>{value}</span>
                <div className="bar" style={{ height: `${value * 2.5}px` }} />
                <small>{day}</small>
              </div>
            ))}
          </div>
        </section>

        <CsatTrend />
      </section>

      {sheetOpen && (
        <DateRangeSheet
          value={range}
          onApply={(r) => {
            setRange(r)
            setSheetOpen(false)
          }}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </>
  )
}

function LeadsModal({ selectedLead, setSelectedLead, onClose }) {
  const [signalsOpen, setSignalsOpen] = useState(true)
  const lead = leads[selectedLead]

  if (!lead) return null

  const changeLead = (nextIndex) => {
    setSelectedLead(nextIndex)
    setSignalsOpen(true)
  }

  return (
    <div
      className="lead-modal-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="lead-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
      >
        <button
          className="lead-modal-x"
          onClick={onClose}
          aria-label="Close leads modal"
        >
          ×
        </button>

        <p className="lead-count">
          Lead {selectedLead + 1} of {leads.length}
        </p>

        <h2 id="lead-modal-title">{lead.name}</h2>
        <p className="lead-contact">
          {lead.company} · {lead.phone}
        </p>

        <div className="lead-scores">
          <div>
            <strong>{lead.icp}</strong>
            <span>ICP score</span>
          </div>
          <div>
            <strong>{lead.intent}</strong>
            <span>Intent score</span>
          </div>
        </div>

        <button
          className="signals-toggle"
          onClick={() => setSignalsOpen(!signalsOpen)}
          aria-expanded={signalsOpen}
        >
          Buying signals {signalsOpen ? '−' : '+'}
        </button>

        {signalsOpen && (
          <ul className="lead-signals">
            {lead.signals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        )}

        <div className="lead-modal-navigation">
          <button
            disabled={selectedLead === 0}
            onClick={() => changeLead(selectedLead - 1)}
          >
            ← Previous
          </button>
          <button
            disabled={selectedLead === leads.length - 1}
            onClick={() => changeLead(selectedLead + 1)}
          >
            Next →
          </button>
        </div>

        <button className="lead-close-button" onClick={onClose}>
          Close
        </button>
      </section>
    </div>
  )
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedLead, setSelectedLead] = useState(null)
  const { ring } = useCall()

  // "Practise a call" is an action: a customer starts ringing and you land on the plan
  const goTo = (item) => {
    if (item.path === '/practise') {
      ring({ name: 'Lakshmi R.', line: 'calling from +91 98450 xxxxx' })
      navigate('/calls-to-make')
    } else {
      navigate(item.path)
    }
  }

  const openLead = (index = 0) => {
    setSelectedLead(index)
  }

  const closeLead = () => {
    setSelectedLead(null)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2 className="brand">On-Ground.ai</h2>

        <nav className="navigation">
          {navigation.map((item) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : item.path === '/plan'
                  ? planPaths.includes(location.pathname)
                  : location.pathname === item.path ||
                    location.pathname.startsWith(item.path + '/')

            return (
              <button
                key={item.path}
                className={[
                  'nav-item',
                  isActive ? 'active' : '',
                  item.sub ? 'sub-item' : '',
                  item.calendar ? 'calendar-link' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => goTo(item)}
              >
                <NavIcon item={item} /> <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="app-logo">OG</div>
          <strong>On-Ground.ai</strong>

          <div className="topbar-right">
            <TopBarActions />
          </div>
        </header>


        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/plan" element={<CallsToMake />} />
          <Route path="/calls-to-make" element={<CallsToMake />} />
          <Route path="/incoming" element={<IncomingPage />} />
          <Route path="/recent" element={<RecentPage />} />
          <Route path="/practise" element={<OtherPages title="Practise a call" />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/pulse" element={<PulseHome />} />
          <Route path="/pulse/:channelId" element={<PulseChannel openLead={openLead} />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<OtherPages title="Page not found" />} />
        </Routes>
      </main>

      {selectedLead !== null && (
        <LeadsModal
          selectedLead={selectedLead}
          setSelectedLead={setSelectedLead}
          onClose={closeLead}
        />
      )}

      <DemoBar />
    </div>
  )
}

export default App
