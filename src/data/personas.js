// Selling personas the user can pick on the Avatar page. The chosen one is
// shown in the top bar and the profile menu.
export const PERSONAS = [
  { id: 'captain', name: 'Captain', emoji: '🦸‍♂️', tint: '#d9f2e6' },
  { id: 'valkyrie', name: 'Valkyrie', emoji: '🦸‍♀️', tint: '#fde4e4' },
  { id: 'vortex', name: 'Vortex', emoji: '🦹‍♀️', tint: '#ece4fb' },
  { id: 'blaze', name: 'Blaze', emoji: '🦹‍♂️', tint: '#fdebd3' },
  { id: 'shadow', name: 'Shadow', emoji: '🥷', tint: '#dcefe9' },
]

const STORAGE_KEY = 'og_avatar'
export const AVATAR_EVENT = 'og-avatar-change'

export function readSavedPersonaId() {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'captain'
  } catch {
    return 'captain'
  }
}

export function savePersonaId(id) {
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    /* storage unavailable, ignore */
  }
  // Same-tab listeners (the top bar) do not get a "storage" event, so tell them directly.
  window.dispatchEvent(new Event(AVATAR_EVENT))
}

export const findPersona = (id) => PERSONAS.find((p) => p.id === id) ?? PERSONAS[0]
