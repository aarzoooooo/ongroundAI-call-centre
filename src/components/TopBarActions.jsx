
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScoreModal from './ScoreModal'
import RankModal from './RankModal'
import { notifications } from '../data/notifications'
import { AVATAR_EVENT, findPersona, readSavedPersonaId } from '../data/personas'

function ScoreRing({ value }) {
  const radius = 15
  const circumference = 2 * Math.PI * radius

  return (
    <svg
      className="tb-ring"
      width="38"
      height="38"
      viewBox="0 0 38 38"
      aria-hidden="true"
    >
      <circle cx="19" cy="19" r={radius} className="tb-ring-track" />
      <circle
        cx="19"
        cy="19"
        r={radius}
        className="tb-ring-value"
        transform="rotate(-90 19 19)"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - value / 100)}
      />
      <text x="19" y="23" textAnchor="middle" className="tb-ring-text">
        {value}
      </text>
    </svg>
  )
}

export default function TopBarActions() {
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const [scoreOpen, setScoreOpen] = useState(false)
  const [rankOpen, setRankOpen] = useState(false)
  const profileRef = useRef(null)
  const [personaId, setPersonaId] = useState(readSavedPersonaId)
  const persona = findPersona(personaId)

  const actionCount = notifications.filter(
    (n) => n.kind === 'action'
  ).length

  useEffect(() => {
    const onClick = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false)
      }
    }

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setProfileOpen(false)
      }
    }

    const onAvatar = () => setPersonaId(readSavedPersonaId())

    document.addEventListener('mousedown', onClick)
    window.addEventListener(AVATAR_EVENT, onAvatar)
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('mousedown', onClick)
      window.removeEventListener(AVATAR_EVENT, onAvatar)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const openProfilePage = (path) => {
    setProfileOpen(false)
    navigate(path)
  }

  return (
    <div className="tb-actions">
      <button
        className="tb-bell"
        aria-label={`Notifications, ${actionCount} need action`}
        onClick={() => navigate('/notifications')}
      >
        🔔
        {actionCount > 0 && (
          <span className="tb-badge">{actionCount}</span>
        )}
      </button>

      <div className="tb-score">
        <button className="tb-score-ring" aria-label="Open OG score" onClick={() => setScoreOpen(true)}>
          <ScoreRing value={76} />
        </button>
        <button className="tb-rank" aria-label="Open your rank" onClick={() => setRankOpen(true)}>
          ⭐ #3
        </button>
      </div>

      <div className="tb-wrap" ref={profileRef}>
        <button
          className="tb-avatar"
          aria-label="Open profile menu"
          aria-expanded={profileOpen}
          onClick={() => setProfileOpen((open) => !open)}
        >
          <span className="tb-avatar-emoji" aria-hidden="true">{persona.emoji}</span>
          <span className="tb-avatar-tag">AR</span>
        </button>

        <button
          className="tb-menu"
          aria-label="Open menu"
          aria-expanded={profileOpen}
          onClick={() => setProfileOpen((open) => !open)}
        >
          ☰
        </button>

        {profileOpen && (
          <div className="tb-panel profile" role="menu">
            <div className="tb-profile-head">
              <span className="tb-profile-avatar" style={{ background: persona.tint }}>{persona.emoji}</span>
              <div>
                <strong>Arvind Rajan</strong>
                <small>Koramangala · The Sleep Company</small>
              </div>
            </div>

            <button
              className="tb-item"
              role="menuitem"
              onClick={() => openProfilePage('/avatar')}
            >
              ◎ Avatar
            </button>

            <button
              className="tb-item"
              role="menuitem"
              onClick={() => openProfilePage('/settings')}
            >
              ⚙ Settings
            </button>

            <button
              className="tb-item danger"
              role="menuitem"
              onClick={() => {
                setProfileOpen(false)
                // Demo app: no authentication/logout backend
              }}
            >
              ⎋ Logout
            </button>
          </div>
        )}
      </div>

      {scoreOpen && (
        <ScoreModal onClose={() => setScoreOpen(false)} />
      )}

      {rankOpen && <RankModal onClose={() => setRankOpen(false)} />}
    </div>
  )
}
