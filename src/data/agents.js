// Config for the role and task agent channels in Pulse.
// Each agent has a header colour, a scorecard, a daily context panel and a feed.

const CONTEXT_SENT = 'Sent 9:00am by AvaniBot for your manager'

const feed = (topic, who) => [
  { id: 1, time: '9:00am', text: `Good morning Arvind. Today's ${topic} is pinned at the top: incoming context and the tasks allocated to you.` },
  { id: 2, time: '1:00pm', tag: 'Nudge', text: `Reminder: ${who} still needs an update.`, bold: who },
  { id: 3, time: '5:00pm', tag: 'Reminder', text: 'Your end-of-day update goes to your manager at 6:00pm. Finish your tasks if you can.' },
]

export const agents = {
  'callcentre-agent': {
    name: 'callcentre-agent',
    color: '#2f5be0',
    badge: 'Role agent',
    subtitle: 'Call Centre Agent · All call-centre staff · Your view · only your information',
    members: 3,
    scope: 'Arvind Rajan · you',
    scorecard: [
      { label: 'REVENUE', value: '420K', of: '/…', pct: 84, tone: 'amber' },
      { label: 'ATV', value: '38.2K', of: '/…', pct: 85, tone: 'amber' },
      { label: 'CONVERSATIONS', value: '168', of: '/200', pct: 84, tone: 'amber' },
    ],
    contextSent: CONTEXT_SENT,
    didWell: 'Booked 6 store visits from callbacks',
    improve: 'Greeting in the first 10 seconds on 71% of calls',
    taskType: 'Type 1 · Leads to follow up',
    tasks: [
      { id: 't1', who: 'Priya Iyer', detail: 'Billing dispute · call 4:30pm' },
      { id: 't2', who: 'Suresh Nair', detail: 'Plan upgrade enquiry · log outcome' },
    ],
    feed: feed('digest', 'Priya Iyer'),
  },

  'cross-sell-agent': {
    name: 'cross-sell-agent',
    color: '#7c3aed',
    badge: 'Task agent',
    subtitle: 'Cross-sell & Upsell Agent · Stores, calls and field',
    members: 5,
    metric: { label: 'Your Attach rate', value: '24%', delta: '▲2 today' },
    scope: 'Koramangala · your store',
    scorecard: [
      { label: 'REVENUE', value: '1.15M', of: '/1…', pct: 72, tone: 'red' },
      { label: 'ATV', value: '42.1K', of: '/5…', pct: 81, tone: 'amber' },
      { label: 'CONVERSATIONS', value: '412', of: '/480', pct: 86, tone: 'amber' },
    ],
    contextSent: CONTEXT_SENT,
    big: { value: '24%', text: 'your attach rate yesterday · target 25%', tone: 'red' },
    summary: 'Attach rate: 24% (target 25%)',
    didWell: 'Added a protector in 4 of 12 sales',
    improve: 'Offer the pillow bundle before billing',
    taskType: 'Type 1 · Customers to upsell',
    tasks: [
      { id: 't1', who: 'Meera S.', detail: 'Bought mattress, no protector · call today' },
      { id: 't2', who: 'Dev K.', detail: 'Bought bed frame, no pillows · call today' },
    ],
    feed: feed('attach rate digest', 'Meera S.'),
  },

  'sop-agent': {
    name: 'sop-agent',
    color: '#0e7490',
    badge: 'Task agent',
    subtitle: 'SOP Agent · Stores, calls and field',
    members: 5,
    metric: { label: 'Your SOP adherence', value: '81%', delta: '▲2 today' },
    scope: 'Koramangala · your store',
    scorecard: [
      { label: 'REVENUE', value: '1.15M', of: '/1…', pct: 72, tone: 'red' },
      { label: 'ATV', value: '42.1K', of: '/5…', pct: 81, tone: 'amber' },
      { label: 'CONVERSATIONS', value: '412', of: '/480', pct: 86, tone: 'amber' },
    ],
    contextSent: CONTEXT_SENT,
    big: { value: '81%', text: 'your sop adherence yesterday · target 85%', tone: 'red' },
    summary: 'SOP adherence: 81% (target 85%)',
    didWell: 'Asked for feedback on every closed sale',
    improve: 'Greet within 10 seconds',
    taskType: 'Type 1 · Conversations to review',
    tasks: [
      { id: 't1', who: 'Talk at 11:40am', detail: 'Greeting after 25s' },
      { id: 't2', who: 'Talk at 2:15pm', detail: 'Need not confirmed before the pitch' },
    ],
    feed: feed("sop adherence digest", 'Talk at 11:40am'),
  },

  'lead-conversion-agent': {
    name: 'lead-conversion-agent',
    color: '#c81e3a',
    badge: 'Task agent',
    subtitle: 'Lead Conversion Agent · Stores, calls and field · Your view · only your information',
    members: 5,
    scope: 'Koramangala · your store',
    scorecard: [
      { label: 'REVENUE', value: '1.15M', of: '/1…', pct: 72, tone: 'red' },
      { label: 'ATV', value: '42.1K', of: '/5…', pct: 81, tone: 'amber' },
      { label: 'CONVERSATIONS', value: '412', of: '/480', pct: 86, tone: 'amber' },
    ],
    contextSent: CONTEXT_SENT,
    didWell: 'Called every lead within 24h',
    improve: 'Book the revisit on the first call',
    taskType: 'Type 1 · Leads to follow up',
    tasks: [
      { id: 't1', who: 'Meera S.', detail: 'Ortho Grid · call before 1pm' },
      { id: 't2', who: 'Arun T.', detail: 'Tranquo chair · call before 4pm' },
    ],
    feed: feed('lead to sale digest', 'Meera S.'),
  },

  'capture-agent': {
    name: 'capture-agent',
    color: '#0f766e',
    badge: 'Task agent',
    subtitle: 'Conversation Capture Agent · Stores, calls and field',
    members: 5,
    metric: { label: 'Your Capture coverage', value: '78%', delta: '▲1 today' },
    scope: 'Koramangala · your store',
    scorecard: [
      { label: 'REVENUE', value: '1.15M', of: '/1…', pct: 72, tone: 'red' },
      { label: 'ATV', value: '42.1K', of: '/5…', pct: 81, tone: 'amber' },
      { label: 'CONVERSATIONS', value: '412', of: '/480', pct: 86, tone: 'amber' },
    ],
    contextSent: CONTEXT_SENT,
    big: { value: '78%', text: 'your capture coverage yesterday · target 90%', tone: 'red' },
    summary: 'Capture coverage: 78% (target 90%)',
    didWell: 'Recorded every afternoon talk',
    improve: 'Start recording at the greeting',
    taskType: 'Type 1 · Shifts to capture',
    tasks: [
      { id: 't1', who: 'Mon 11am to 1pm', detail: 'App not recording' },
      { id: 't2', who: 'Tue 3pm to 5pm', detail: 'Recording started after the greeting' },
    ],
    feed: feed('capture coverage digest', 'Mon 11am to 1pm'),
  },
}
