export type CategoryType = 'presidencial' | 'regional' | 'distrital'

export type Candidate = {
  id: number
  name: string
  party: string
  photo: string
  description: string
  education: string
  experience: string
  proposals: string[]
}

type Store = {
  candidates: Record<CategoryType, Candidate[]>
}

const KEY = 'sen:dataStore'

function readStore(): Store {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { candidates: { presidencial: [], regional: [], distrital: [] } }
    const parsed = JSON.parse(raw)
    return {
      candidates: {
        presidencial: Array.isArray(parsed?.candidates?.presidencial) ? parsed.candidates.presidencial : [],
        regional: Array.isArray(parsed?.candidates?.regional) ? parsed.candidates.regional : [],
        distrital: Array.isArray(parsed?.candidates?.distrital) ? parsed.candidates.distrital : [],
      },
    }
  } catch {
    return { candidates: { presidencial: [], regional: [], distrital: [] } }
  }
}

function writeStore(store: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store))
  } catch {}
}

export function loadCandidates(category: CategoryType): Candidate[] {
  const store = readStore()
  return store.candidates[category] ?? []
}

export function saveCandidates(category: CategoryType, list: Candidate[]) {
  const store = readStore()
  store.candidates[category] = list
  writeStore(store)
}
