export const PRESETS = ['Today', 'This Week', 'This Month', 'Last 30 Days', 'Custom']

const toInput = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function rangeFor(preset) {
  const end = new Date()
  const start = new Date()
  if (preset === 'This Week') start.setDate(end.getDate() - ((end.getDay() + 6) % 7)) // Monday
  if (preset === 'This Month') start.setDate(1)
  if (preset === 'Last 30 Days') start.setDate(end.getDate() - 29)
  return { from: toInput(start), to: toInput(end) }
}

export function formatRangeLabel({ preset, from, to }) {
  if (preset !== 'Custom') return preset
  const fmt = (value) =>
    new Date(`${value}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  return `${fmt(from)} – ${fmt(to)}`
}