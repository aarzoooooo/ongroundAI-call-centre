export const channels = {
  'callcentre-team': {
    name: 'callcentre-team',
    title: '#callcentre-team',
    day: 'Today · Call Centre Team',
    needsInputs: [
      {
        id: 'callback',
        title: 'Confirm the 4:30pm callback',
        detail: 'Priya Iyer · likely billing dispute',
        options: ['Confirmed', 'Reschedule'],
      },
    ],
    messages: [
      { id: 1, from: 'Sunita Rao', initials: 'SR', time: '2:05pm', icon: '👥', label: 'STAKEHOLDERS:', text: '@You (Arvind R.), whole call centre shift' },
      { id: 2, from: 'Sunita Rao', initials: 'SR', time: '2:05pm', icon: '📋', label: 'ISSUE DEFINITION:', text: 'Greeting-in-first-10s QA score is at 71% this week, below our 85% target.' },
      { id: 3, from: 'Sunita Rao', initials: 'SR', time: '2:05pm', icon: '➡️', label: 'SUGGESTED RESOLUTION:', text: "Let's push that up 💪 — open every call with the greeting script. I'll check back Friday." },
      { id: 4, from: 'You', initials: 'AR', time: '2:10pm', mine: true, text: 'On it! Will make sure I open every call with the greeting script 🙌' },
      { id: 5, from: 'Sunita Rao', initials: 'SR', time: '2:14pm', text: 'Great attitude Arvind 🌟' },
    ],
  },

  'avani-coaching': {
    name: 'avani-coaching',
    title: '#avani-coaching',
    day: 'Today · Avani AI Coaching',
    needsInputs: [],
    messages: [
      {
        id: 1,
        from: 'Avani',
        bot: true,
        initials: '✨',
        time: '9:01am',
        text: "Your average handle time is up 8% this week — try confirming the customer's need in your first question instead of after the pitch.",
      },
    ],
  },

  avanibot: {
    name: 'avanibot',
    title: 'AvaniBot',
    day: 'Today',
    needsInputs: [
      {
        id: 'hot-leads',
        title: 'Call now or reassign the 2 hot leads',
        detail: 'Untouched for 24h',
        options: ['Calling now', 'Reassign'],
      },
      {
        id: 'outcome',
        title: "Log this morning's call outcome",
        detail: 'Suresh Nair · plan upgrade enquiry',
        options: ['Converted', 'Callback', 'Not interested'],
      },
    ],
    messages: [
      {
        id: 1,
        from: 'AvaniBot',
        bot: true,
        initials: '✨',
        time: '9:00am',
        text: 'Hey! I\'m AvaniBot ✨ Ask me things like "what are my action items from Sunita", or tap the ✨ icon inside any channel to search just that channel.',
      },
    ],
  },
}

// ---- helpers for building threads ------------------------------------------------
const thread = (name, title, day, messages) => ({ name, title, day, needsInputs: [], messages })

const person = (id, from, initials, time, text) => ({ id, from, initials, time, text })
const bot = (id, from, initials, time, extra) => ({ id, from, initials, time, bot: true, ...extra })

// Agents open with the same three-part message the Call Centre Team channel uses.
const agentOpening = (from, icon, stakeholders, issue, resolution, time = 'Just now') => [
  bot(1, from, icon, time, { icon: '👥', label: 'STAKEHOLDERS:', text: stakeholders }),
  bot(2, from, icon, time, { icon: '📋', label: 'ISSUE DEFINITION:', text: issue }),
  bot(3, from, icon, time, { icon: '➡️', label: 'SUGGESTED RESOLUTION:', text: resolution }),
]

Object.assign(channels, {
  'customer-discussions': thread('customer-discussions', '#customer-discussions', 'Today · Customer Discussions', [
    person(1, 'Mukunda R.', 'MR', '10:40am', 'Hi, is the Ortho Grid Pro available with the 10-year warranty?'),
    bot(2, 'WhatsApp Business', '💬', '10:41am', { text: 'Message relayed from the customer. Reply here and it is sent back on WhatsApp.' }),
  ]),

  'all-stores': thread('all-stores', '#all-stores', 'Today · All Stores', [
    bot(1, 'Manager Helper', '📢', '10:22am', { text: 'New Ortho Grid campaign is live from 1 June — ask customers about the bundled EMI offer!' }),
  ]),

  'avani-coaching': thread('avani-coaching', '#avani-coaching', 'Today · Avani AI Coaching', [
    bot(1, 'Avani', '✨', '9:01am', { text: "Your average handle time is up 8% this week — try confirming the customer's need in your first question instead of after the pitch." }),
  ]),

  'manage-shipment': thread('manage-shipment', '#manage-shipment', 'Today · Manage Shipment', [
    bot(1, 'Shipping Agent', '📦', '10:05am', {
      card: {
        icon: '📦',
        title: 'Shipping Notifications',
        badge: 'Ready for delivery ✓',
        fields: [['Model', 'Ortho Grid Pro, King'], ['Tracking', '4RS4DDF6549B4'], ['Destination', 'RT Nagar, Bengaluru']],
        actions: [{ label: 'View details', reply: 'Show me the shipment details' }, { label: 'Notify customer', primary: true, reply: 'Notify the customer' }],
      },
    }),
  ]),

  'quotation-tickets': thread('quotation-tickets', '#quotation-tickets', 'Today · Quotation Tickets', [
    bot(1, 'Ticket Desk Agent', '🎫', '9:12am', {
      card: {
        icon: '📝',
        title: 'Quotation approval — Mukunda R.',
        badge: 'Awaiting approval',
        fields: [['Product', 'Ortho Grid Pro, bundled'], ['Value', '₹58,000'], ['Raised by', 'You']],
        actions: [{ label: 'View lead', openLead: true }],
      },
    }),
  ]),

  'new-hire-onboarding': thread('new-hire-onboarding', '#new-hire-onboarding', 'Today · New Hire Onboarding', [
    bot(1, 'Onboarding Agent', '👋', '8:30am', {
      card: {
        icon: '🎉',
        title: 'Welcome to the team!',
        fields: [['SOP training', 'Starts today, 3:00pm'], ['Buddy manager', 'Sunita Rao']],
        actions: [{ label: 'Get started', primary: true, to: '/pulse' }],
      },
    }),
  ]),

  // ---- direct messages
  'dm-sunita': thread('dm-sunita', 'Sunita Rao', 'Today', [person(1, 'Sunita Rao', 'SR', '12:40pm', '🌟 Great work with Mukunda — keep it up')]),
  'dm-priya': thread('dm-priya', 'Priya Krishnan', 'Today', [person(1, 'Priya Krishnan', 'PK', '9:55am', 'Can you cover my 3pm slot today?')]),
  'dm-raju': thread('dm-raju', 'Raju Kumar', 'Yesterday', [person(1, 'Raju Kumar', 'RK', 'Yesterday', 'Nice cross-sell on the Tranquo chair! 🔥')]),

  // ---- coaching bots: each opens with a ready-made message and an action card
  'skill-coach': thread('skill-coach', '#skill-improvement-coach', 'Today · Skill Improvement Coach', [
    ...agentOpening(
      'Skill Improvement Coach', '🎯',
      'You, plus your Store Manager and L&D once you share something for feedback.',
      "I'm ready whenever you want to get sharper at something — warranty pitch, objection handling, EMI close.",
      "Tell me which skill and I'll pull a model example, set up a place to practise, and get you feedback.",
    ),
    person(4, 'You', 'AR', 'Just now', 'Warranty pitch — I keep forgetting to bring it up before the customer decides.'),
    bot(5, 'Skill Improvement Coach', '🎯', 'Just now', {
      text: "Got it — here's what great looks like for a warranty pitch, then a place to practise your own.",
      clip: { title: 'Warranty pitch — model example', sub: 'Sameena Sultana · 0:42 · top-rated call' },
      actions: [{ label: '🎙️ Start Practice', primary: true, to: '/practise' }, { label: '📤 Share for Feedback', share: true }],
    }),
  ]),

  'sop-coach': thread('sop-coach', '#my-sop-coach', 'Today · My SOP Coach', [
    ...agentOpening(
      'My SOP Coach', '📋',
      'You, with your Store Manager and L&D looped in if it does not improve.',
      'Your weakest step this week is the warranty pitch — mentioned in only 2 of your last 5 conversations.',
      "I'm sending you a ready-to-use script for it now. If it is still your weakest step by Friday, I'll loop in your Store Manager.",
    ),
    bot(4, 'My SOP Coach', '📋', 'Just now', {
      sent: { title: 'Warranty pitch — quick script', body: '"This comes with our extended warranty — if anything goes wrong in the first two years, it is covered. Most customers only find out when I mention it."' },
    }),
  ]),

  'recognition-bot': thread('recognition-bot', '#recognition-bot', 'Today · Recognition Bot', [
    ...agentOpening(
      'Recognition Bot', '🏆',
      'You and Sunita (Store Manager).',
      "Nice save on that price objection today — that's the kind of recovery that keeps a sale alive.",
      "Flagging it to Sunita right now so it doesn't get lost in her day.",
    ),
    bot(4, 'Recognition Bot', '🏆', 'Just now', {
      sent: { title: 'Sent to Sunita', body: "She's been notified — keep an eye out for a shoutout in tomorrow's huddle." },
    }),
  ]),

  // ---- role and task agents
  'callcentre-agent': thread('callcentre-agent', '#callcentre-agent', 'Today · Call Centre Agent', agentOpening(
    'Call Centre Agent', '🎧', 'You and the whole call centre shift.',
    'Two hot leads are untouched for 24h and one call outcome is still to be logged.',
    'Call the hot leads before 4:30pm and log the outcome from this morning.', '9:00am')),
  'cross-sell-agent': thread('cross-sell-agent', '#cross-sell-agent', 'Today · Cross-sell Agent', agentOpening(
    'Cross-sell Agent', '🛒', 'You and 4 team members.',
    'Attach rate is at 24%, up 2 points this week.', 'Suggest a pillow or protector on every mattress enquiry.', '9:00am')),
  'sop-agent': thread('sop-agent', '#sop-agent', 'Today · SOP Agent', agentOpening(
    'SOP Agent', '📝', 'You and 4 team members.',
    'SOP adherence is at 81%, up 2 points this week.', 'Open with the greeting script and confirm the need before pitching.', '9:00am')),
  'lead-conversion-agent': thread('lead-conversion-agent', '#lead-conversion-agent', 'Today · Lead Conversion Agent', agentOpening(
    'Lead Conversion Agent', '🎯', 'You and your Store Manager.',
    'Two hot leads have not been called back in 24h.', 'Call them today, starting with the highest ICP score.', '9:00am')),
  'capture-agent': thread('capture-agent', '#capture-agent', 'Today · Capture Agent', agentOpening(
    'Capture Agent', '🎙️', 'You and 4 team members.',
    'Capture coverage is at 78%, up 1 point this week.', 'Ask for a name and number before every call ends.', '9:00am')),
})

export const pulseStore = { name: 'The Sleep Company', place: 'Koramangala' }

export const roleAgents = [
  { id: 'callcentre-agent', icon: 'headset', name: 'callcentre-agent', sub: 'Call Centre Agent', pins: 2, color: '#4a6fd8' },
]

export const taskAgents = [
  { id: 'cross-sell-agent', icon: 'cart', name: 'cross-sell-agent', sub: 'Your Attach rate · 5 members', value: '24%', delta: 2, pins: 2, color: '#8b5cf6' },
  { id: 'sop-agent', icon: 'list', name: 'sop-agent', sub: 'Your SOP adherence · 5 members', value: '81%', delta: 2, pins: 2, color: '#0f9d8a' },
  { id: 'lead-conversion-agent', icon: 'target', name: 'lead-conversion-agent', sub: 'Lead Conversion Agent', pins: 2, color: '#e5484d' },
  { id: 'capture-agent', icon: 'mic', name: 'capture-agent', sub: 'Your Capture coverage · 5 members', value: '78%', delta: 1, pins: 2, color: '#0f9d8a' },
]

export const coachBots = [
  { id: 'skill-coach', name: 'Skill Improvement Coach', sub: 'Improving Your SOP adherence', emoji: '🎯', bg: 'linear-gradient(135deg, #7c3aed, #4f46e5)' },
  { id: 'sop-coach', name: 'My SOP Coach', sub: 'Improving Your SOP adherence', emoji: '📋', bg: 'linear-gradient(135deg, #312e81, #1e1b4b)' },
  { id: 'recognition-bot', name: 'Recognition Bot', sub: 'Improving Wins flagged to your manager', emoji: '🏆', bg: 'linear-gradient(135deg, #b45309, #78350f)' },
]

export const generalChannels = [
  { id: 'customer-discussions', name: 'customer-discussions', preview: 'Relayed via WhatsApp Business', unread: 2, whatsapp: true },
]

export const teamChannels = [
  { id: 'callcentre-team', name: 'callcentre-team', preview: 'Manager: Review call QA scores this week!', mention: true, pins: 1 },
  { id: 'all-stores', name: 'all-stores', preview: 'New Ortho Grid campaign from 1 June!', time: '10:22am', unread: 4 },
  { id: 'avani-coaching', name: 'avani-coaching', preview: 'Your warranty score dropped 12% this week', time: '9:01am', unread: 1, spark: true },
  { id: 'manage-shipment', name: 'manage-shipment', preview: '📦 Ortho Grid Pro — ready for delivery ✓', time: '10:05am', unread: 1 },
  { id: 'quotation-tickets', name: 'quotation-tickets', preview: '🎫 Quotation approval — awaiting approval', time: '9:12am', unread: 1 },
  { id: 'new-hire-onboarding', name: 'new-hire-onboarding', preview: '🎉 Welcome to the team!', time: '8:30am' },
]

export const directMessages = [
  { id: 'dm-sunita', name: 'Sunita Rao', preview: '⭐ Great work with Mukunda — keep it up', time: '12:40pm', initials: 'SR', tint: '#fdecc8', ink: '#8a5a00' },
  { id: 'dm-priya', name: 'Priya Krishnan', preview: 'Can you cover my 3pm slot today?', time: '9:55am', initials: 'PK', tint: '#fde4e4', ink: '#a32d2d' },
  { id: 'dm-raju', name: 'Raju Kumar', preview: 'Nice cross-sell on the Tranquo chair! 🔥', time: 'Yesterday', initials: 'RK', tint: '#dcf3e8', ink: '#0f6e56' },
]

// Shown from the + button in the Pulse header.
export const newMessageTargets = directMessages.map(({ id, name, initials, tint, ink }) => ({ id, name, initials, tint, ink }))

// The Kudos screen (opened from the gold card on Pulse home).
export const kudosList = [
  { id: 1, from: 'Sunita Rao (Manager)', initials: 'SR', when: '12:40pm · Today', emoji: '🏆', tone: 'gold', text: '"Great work with Mukunda — closed that warranty objection beautifully. Keep it up!"' },
  { id: 2, from: 'Raju Kumar', initials: 'RK', when: 'Yesterday', emoji: '🔥', tone: 'red', text: '"Nice cross-sell on the Tranquo chair! Impressed by how you read the customer."' },
  { id: 3, from: 'Sunita Rao (Manager)', initials: 'SR', when: '2 days ago', emoji: '💪', tone: 'green', text: '"Top SOP score this week — 72/100 on Mukunda\'s conversation. Store leader!"' },
]

export const kudosSummary = { fresh: 3, total: 12, latest: '"Great work with Mukunda — closed that objection beautifully"' }
