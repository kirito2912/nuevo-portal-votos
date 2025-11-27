const KEY = 'sen:adminAuth'

export function isAuthenticated(): boolean {
  try {
    return !!localStorage.getItem(KEY)
  } catch {
    return false
  }
}

export function login(payload: { email: string }) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ email: payload.email, at: Date.now() }))
  } catch {}
}

export function logout() {
  try {
    localStorage.removeItem(KEY)
  } catch {}
}
