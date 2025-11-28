import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Shield, BarChart3, Database, Brain, TrendingUp, Sparkles, ChevronDown } from 'lucide-react'

export default function AdminSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const activeTab = params.get('tab') || 'overview'
  const [open, setOpen] = useState<Record<string, boolean>>({
    resultados: false,
    procesamiento: false,
    entrenamiento: false,
    analisis: false,
  })

  const go = (tab: string, section?: string) => {
    const sp = new URLSearchParams(location.search)
    sp.set('tab', tab)
    if (section) sp.set('section', section)
    else sp.delete('section')
    navigate({ pathname: '/admin/dashboard', search: sp.toString() })
  }

  const groupItem = (label: string, tab: string, icon: any) => {
    const Icon = icon
    const active = activeTab === tab
    return (
      <button onClick={() => go(tab)} className={`flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${active ? 'bg-blue-600/20 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800/60'}`}>
        <Icon size={18} />
        <span>{label}</span>
      </button>
    )
  }

  const subItem = (label: string, tab: string, section: string) => {
    const spSection = params.get('section')
    const active = activeTab === tab && spSection === section
    return (
      <button onClick={() => go(tab, section)} className={`ml-8 flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${active ? 'bg-blue-600/20 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-800/60'}`}>
        <span>{label}</span>
      </button>
    )
  }

  useEffect(() => {
    setOpen(s => ({
      ...s,
      resultados: activeTab === 'resultados',
      procesamiento: activeTab === 'procesamiento',
      entrenamiento: activeTab === 'entrenamiento',
      analisis: activeTab === 'analisis',
    }))
  }, [activeTab])

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-2 p-4 border-r border-gray-700 bg-dark-card">
      <div className="flex items-center gap-2 px-2 py-2 text-gray-300">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blue-600/15 text-blue-400 border border-blue-500/30">
          <Shield size={16} />
        </span>
        <div className="text-sm font-semibold">Panel Premium</div>
      </div>

      {groupItem('Overview', 'overview', Shield)}

      <button onClick={() => setOpen(s => { const next = !s.resultados; const res = { ...s, resultados: next }; if (next) go('resultados','presidencial'); return res })} className="flex items-center justify-between px-3 py-2 rounded-md text-sm text-gray-300 hover:text-white hover:bg-gray-800/60">
        <span className="flex items-center gap-2"><BarChart3 size={18} /> Resultados</span>
        <ChevronDown className={`transition-transform ${open.resultados ? 'rotate-180' : ''}`} size={16} />
      </button>
      {open.resultados && (
        <div>
          {subItem('Presidencial', 'resultados', 'presidencial')}
          {subItem('Regional', 'resultados', 'regional')}
          {subItem('Distrital', 'resultados', 'distrital')}
        </div>
      )}

      <button onClick={() => setOpen(s => { const next = !s.procesamiento; const res = { ...s, procesamiento: next }; if (next) go('procesamiento','importaciones'); return res })} className="flex items-center justify-between px-3 py-2 rounded-md text-sm text-gray-300 hover:text-white hover:bg-gray-800/60">
        <span className="flex items-center gap-2"><Database size={18} /> Procesamiento</span>
        <ChevronDown className={`transition-transform ${open.procesamiento ? 'rotate-180' : ''}`} size={16} />
      </button>
      {open.procesamiento && (
        <div>
          {subItem('Importaciones', 'procesamiento', 'importaciones')}
          {subItem('Limpieza', 'procesamiento', 'limpieza')}
          {subItem('Logs', 'procesamiento', 'logs')}
        </div>
      )}

      <button onClick={() => setOpen(s => { const next = !s.entrenamiento; const res = { ...s, entrenamiento: next }; if (next) go('entrenamiento','modelos'); return res })} className="flex items-center justify-between px-3 py-2 rounded-md text-sm text-gray-300 hover:text-white hover:bg-gray-800/60">
        <span className="flex items-center gap-2"><Brain size={18} /> Entrenamiento</span>
        <ChevronDown className={`transition-transform ${open.entrenamiento ? 'rotate-180' : ''}`} size={16} />
      </button>
      {open.entrenamiento && (
        <div>
          {subItem('Modelos', 'entrenamiento', 'modelos')}
          {subItem('Sesiones', 'entrenamiento', 'sesiones')}
        </div>
      )}

      <button onClick={() => setOpen(s => { const next = !s.analisis; const res = { ...s, analisis: next }; if (next) go('analisis','comparativas'); return res })} className="flex items-center justify-between px-3 py-2 rounded-md text-sm text-gray-300 hover:text-white hover:bg-gray-800/60">
        <span className="flex items-center gap-2"><TrendingUp size={18} /> Análisis</span>
        <ChevronDown className={`transition-transform ${open.analisis ? 'rotate-180' : ''}`} size={16} />
      </button>
      {open.analisis && (
        <div>
          {subItem('Comparativas', 'analisis', 'comparativas')}
          {subItem('Tendencias', 'analisis', 'tendencias')}
        </div>
      )}

      {groupItem('Reportes', 'reportes', Sparkles)}
    </aside>
  )
}
