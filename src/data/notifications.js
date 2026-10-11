export const notifications = [
  { id: 1, kind: 'action', time: '2:05pm', icon: '☎', text: 'Sunita Rao is checking greeting-QA scores Friday — reply in #callcentre-team', link: { label: 'Open #callcentre-team', to: '/pulse' } },
  { id: 2, kind: 'action', time: 'Today', icon: '🎯', text: 'Skill Improvement Coach is waiting on you to pick a skill to practice', link: { label: 'Open Skill Improvement Coach', to: '/practise' } },
  { id: 3, kind: 'alert', time: '1:05pm', icon: '🌟', text: 'Your EMI-pitch rate hit 55% this shift — target met, nice work' },
  { id: 4, kind: 'alert', time: 'Yesterday', icon: '🏆', text: 'You hit a 7-day SOP streak — kudos sent automatically' },
  { id: 5, kind: 'action', time: '11:40am', icon: '📞', text: "1 callback still open from this morning's queue", link: { label: 'Open queue', to: '/incoming' } },
  { id: 6, kind: 'alert', time: 'Mon 8:00am', icon: '📈', text: 'Weekly call-quality summary was sent to your registered number' },
]

export const olderNotifications = [
  { id: 7, kind: 'alert', time: 'Last Fri', icon: '📊', text: 'Your CSAT stayed above 90% for the week' },
  { id: 8, kind: 'alert', time: 'Last Thu', icon: '🎧', text: 'Two of your calls were picked as coaching examples' },
]