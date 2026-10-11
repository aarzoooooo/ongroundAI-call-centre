// Data behind the "Your rank" sheet. Each row has a 0-100 score and a weight.
export const rank = {
  position: 3,
  store: 'RT Nagar',
  staffRanked: 6,
  rows: [
    { icon: '🏆', label: 'OG Score™', display: '76', score: 76, weight: 40 },
    { icon: '📞', label: 'Leads Called', display: '2', score: 37.5, weight: 20 },
    { icon: '🎯', label: 'Leads Created', display: '3', score: 60, weight: 15 },
    { icon: '⏱️', label: 'Conversation Time', display: '62m', score: 72, weight: 15 },
    { icon: '🚚', label: 'On-time Delivery', display: '92%', score: 92, weight: 10 },
  ],
}

// Weighted blend of the row scores, to one decimal place.
export const compositeScore = (rows) =>
  Math.round(rows.reduce((sum, r) => sum + (r.score * r.weight) / 100, 0) * 10) / 10
