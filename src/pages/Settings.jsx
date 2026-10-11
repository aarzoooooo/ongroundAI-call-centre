import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Settings.css'

// Edit these to match your real user/store data
const EMPLOYEE= {
  id: 'OG-EMP-07734',
  name: 'Arvind Rajan',
  email: 'arvind.r@ogretail.in',
  phone: '+91 98450 11223',
}

const STORE = {
  base: 'Koramangala',
  company: 'The Sleep Company',
  allocated: ['Koramangala', 'HSR Layout', 'Indiranagar'],
}

const STORAGE_KEY = 'og_profile'

function readProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved) return { name: EMPLOYEE.name, email: EMPLOYEE.email, phone: EMPLOYEE.phone, ...saved }
  } catch {
    /* ignore */
  }
  return { name: EMPLOYEE.name, email: EMPLOYEE.email, phone: EMPLOYEE.phone }
}

function Section({ title, children }) {
  return (
    <section className="st-section">
      <h2 className="st-heading">{title}</h2>
      {children}
    </section>
  )
}

function Field({ label, children }) {
  return (
    <label className="st-field">
      <span className="st-label">{label}</span>
      {children}
    </label>
  )
}

export default function Settings() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(readProfile)
  const [profileSaved, setProfileSaved] = useState(false)

  const [pinOpen, setPinOpen] = useState(false)
  const [pins, setPins] = useState({ current: '', next: '', confirm: '' })
  const [pinMessage, setPinMessage] = useState(null)

  const update = (key) => (e) => {
    setProfile({ ...profile, [key]: e.target.value })
    setProfileSaved(false)
  }

  const saveProfile = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    } catch {
      /* storage unavailable */
    }
    setProfileSaved(true)
    window.setTimeout(() => setProfileSaved(false), 2500)
  }

  const setPin = (key) => (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 4)
    setPins({ ...pins, [key]: digits })
    setPinMessage(null)
  }

  const submitPin = () => {
    if (pins.current.length !== 4 || pins.next.length !== 4) {
      setPinMessage({ type: 'error', text: 'Enter all PINs as 4 digits.' })
    } else if (pins.next !== pins.confirm) {
      setPinMessage({ type: 'error', text: 'New PIN and confirmation do not match.' })
    } else if (pins.next === pins.current) {
      setPinMessage({ type: 'error', text: 'Choose a PIN different from the current one.' })
    } else {
      // Demo only: call your API here. Never store a PIN in localStorage.
      setPins({ current: '', next: '', confirm: '' })
      setPinMessage({ type: 'ok', text: 'PIN updated.' })
    }
  }

  return (
    <div className="st-page">
      <button className="st-back" onClick={() => navigate(-1)}>
        ← Settings
      </button>

      <Section title="EMPLOYEE PROFILE">
        <div className="st-card st-grid">
          <Field label="FULL NAME">
            <input value={profile.name} onChange={update('name')} />
          </Field>
          <Field label="EMPLOYEE ID">
            <input value={EMPLOYEE.id} readOnly />
          </Field>
          <Field label="EMAIL">
            <input type="email" value={profile.email} onChange={update('email')} />
          </Field>
          <Field label="PHONE NUMBER">
            <input type="tel" value={profile.phone} onChange={update('phone')} />
          </Field>
          <div className="st-actions">
            <button className="st-primary" onClick={saveProfile}>
              {profileSaved ? 'Saved ✓' : 'Save changes'}
            </button>
          </div>
        </div>
      </Section>

      <Section title="SECURITY">
        <div className="st-card st-flush">
          <button
            className="st-row"
            aria-expanded={pinOpen}
            onClick={() => setPinOpen(!pinOpen)}
          >
            <span className="st-icon">🔒</span>
            <span className="st-row-text">
              <strong>Change App Password</strong>
              <small>Update your 4-digit login PIN</small>
            </span>
            <span className={`st-chevron ${pinOpen ? 'open' : ''}`}>›</span>
          </button>

          {pinOpen && (
            <div className="st-pin">
              <Field label="CURRENT PIN">
                <input type="password" inputMode="numeric" value={pins.current} onChange={setPin('current')} />
              </Field>
              <Field label="NEW PIN">
                <input type="password" inputMode="numeric" value={pins.next} onChange={setPin('next')} />
              </Field>
              <Field label="CONFIRM NEW PIN">
                <input type="password" inputMode="numeric" value={pins.confirm} onChange={setPin('confirm')} />
              </Field>
              {pinMessage && (
                <p className={`st-msg ${pinMessage.type}`} role="status">
                  {pinMessage.text}
                </p>
              )}
              <button className="st-primary" onClick={submitPin}>
                Update PIN
              </button>
            </div>
          )}
        </div>
      </Section>

      <Section title="STORE">
        <div className="st-card st-flush">
          <div className="st-row static">
            <span className="st-icon">🏬</span>
            <span className="st-row-text">
              <strong>Base Store</strong>
              <small>
                {STORE.base} — {STORE.company}
              </small>
            </span>
          </div>
        </div>
        <p className="st-allocated">Allocated: {STORE.allocated.join(' · ')}</p>
      </Section>

      <Section title="ROLE & DESIGNATION">
        <div className="st-card st-role">
          <span className="st-badge">MO</span>
          <div>
            <strong>MO · Call Centre Staff</strong>
            <p>
              Staff tier — sits below Manager designations (M1 Store Manager, M2 Ops Manager)
              shown in Settings on the Manager app. Your exact sub-role is set below.
            </p>
          </div>
        </div>
      </Section>

      <Section title="YOUR CUSTOMER CHANNEL">
        <div className="st-card">
          <p className="st-note">
            This app is for Call Centre staff — your customer channel is fixed accordingly. Store
            and Field Staff sub-roles are available in the Staff mobile app instead.
          </p>
          <div className="st-channel">
            <span className="st-icon">🎧</span>
            <span className="st-row-text">
              <strong>Call Centre Staff</strong>
              <small>Inbound and outbound customer calls</small>
            </span>
            <span className="st-check" aria-label="Selected">✓</span>
          </div>
        </div>
      </Section>
    </div>
  )
}
