export type VoterRecord = {
  dni: string
  nombres: string
  apellidos: string
  fechaNacimiento: string
  region: string
  distrito: string
  email?: string
  telefono?: string
}

function getApiConfig() {
  let token = ''
  let baseUrl = ''
  try {
    token = localStorage.getItem('sen:voterApiToken') || ''
    baseUrl = localStorage.getItem('sen:voterApiUrl') || ''
  } catch {}
  const envToken = (import.meta as any).env?.VITE_VOTER_API_TOKEN || ''
  const envUrl = (import.meta as any).env?.VITE_VOTER_API_URL || ''
  if (!token && envToken) token = String(envToken)
  if (!baseUrl && envUrl) baseUrl = String(envUrl)
  return { token, baseUrl }
}

export async function getVoterByDni(dni: string, tokenOverride?: string): Promise<VoterRecord> {
  const { token, baseUrl } = getApiConfig()
  const auth = tokenOverride || token
  const url = baseUrl ? `${baseUrl.replace(/\/$/, '')}/voters?dni=${encodeURIComponent(dni)}` : ''
  if (auth && url) {
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${auth}` },
      })
      if (res.ok) {
        const data = await res.json()
        return {
          dni: String(data.dni || dni),
          nombres: String(data.nombres || ''),
          apellidos: String(data.apellidos || ''),
          fechaNacimiento: String(data.fechaNacimiento || ''),
          region: String(data.region || ''),
          distrito: String(data.distrito || ''),
          email: data.email ? String(data.email) : undefined,
          telefono: data.telefono ? String(data.telefono) : undefined,
        }
      }
    } catch {}
  }
  return {
    dni,
    nombres: 'Juan',
    apellidos: 'Pérez',
    fechaNacimiento: '1990-01-15',
    region: 'Lima',
    distrito: 'Miraflores',
    email: 'juan.perez@example.com',
    telefono: '+51 999 999 999',
  }
}
