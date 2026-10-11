import './DashboardExtras.css'

const CSAT = [
  ['Mon', 88],
  ['Tue', 90],
  ['Wed', 85],
  ['Thu', 92],
  ['Fri', 89],
  ['Sat', 91],
  ['Today', 94],
]

// Bars start at 70% so small day-to-day differences are visible
const BASELINE = 70

export default function CsatTrend({ data = CSAT }) {
  return (
    <section className="chart-section">
      <h2>CSAT TREND · LAST 7 DAYS</h2>

      <div className="chart-card csat-card">
        {data.map(([day, value]) => (
          <div className="bar-column" key={day}>
            <span>{value}%</span>
            <div
              className="bar csat-bar"
              style={{ height: `${(value - BASELINE) * 5}px` }}
            />
            <small>{day}</small>
          </div>
        ))}
      </div>
    </section>
  )
}
