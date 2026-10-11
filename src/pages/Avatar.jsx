import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Avatar.css'
import { PERSONAS, readSavedPersonaId, savePersonaId, findPersona } from '../data/personas'

export default function Avatar() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(readSavedPersonaId)
  const [saved, setSaved] = useState(false)

  const current = findPersona(selected)

  const save = () => {
    savePersonaId(selected)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="avatar-page">
      <button className="avatar-back" onClick={() => navigate(-1)}>
        ← Avatar
      </button>

      <p className="avatar-eyebrow">YOUR SELLING PERSONA</p>

      <section className="avatar-card">
        <div className="avatar-current">
          <span
            className="avatar-bubble avatar-bubble-lg"
            style={{ background: current.tint }}
          >
            {current.emoji}
          </span>
          <div>
            <strong>{current.name}</strong>
            <p>Pick the persona shown on your profile badge</p>
          </div>
        </div>

        <div className="avatar-options" role="radiogroup" aria-label="Persona">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              role="radio"
              aria-checked={selected === p.id}
              className={`avatar-option ${selected === p.id ? 'selected' : ''}`}
              onClick={() => setSelected(p.id)}
            >
              <span className="avatar-bubble" style={{ background: p.tint }}>
                {p.emoji}
              </span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </section>

      <button className="avatar-save" onClick={save}>
        {saved ? 'Saved ✓' : 'Save Avatar'}
      </button>
    </div>
  )
}
