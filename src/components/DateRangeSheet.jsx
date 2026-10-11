import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { PRESETS, rangeFor } from '../utils/dateRange'

export default function DateRangeSheet({ value, onApply, onClose }) {
  const [preset, setPreset] = useState(value.preset)
  const [from, setFrom] = useState(value.from)
  const [to, setTo] = useState(value.to)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const choose = (p) => {
    setPreset(p)
    if (p !== 'Custom') {
      const range = rangeFor(p)
      setFrom(range.from)
      setTo(range.to)
    }
  }

  const invalid = !from || !to || from > to

  return createPortal(
    <div className="drs-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <section className="drs" role="dialog" aria-modal="true" aria-labelledby="drs-title">
        <div className="drs-head">
          <h2 id="drs-title">Select Date Range</h2>
          <button className="drs-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="drs-chips">
          {PRESETS.map((p) => (
            <button key={p} className={p === preset ? 'active' : ''} onClick={() => choose(p)}>
              {p}
            </button>
          ))}
        </div>

        <div className="drs-fields">
          <label>
            FROM
            <input
              type="date"
              value={from}
              max={to || undefined}
              onChange={(e) => { setFrom(e.target.value); setPreset('Custom') }}
            />
          </label>
          <label>
            TO
            <input
              type="date"
              value={to}
              min={from || undefined}
              onChange={(e) => { setTo(e.target.value); setPreset('Custom') }}
            />
          </label>
        </div>

        {invalid && <p className="drs-error">"From" must be on or before "To".</p>}

        <button
          className="drs-apply"
          disabled={invalid}
          onClick={() => onApply({ preset, from, to })}
        >
          Apply Range
        </button>
      </section>
    </div>,
    document.body
  )
}