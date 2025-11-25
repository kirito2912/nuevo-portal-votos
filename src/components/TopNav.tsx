import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Vote, BarChart3, Info, Shield, Menu, X } from 'lucide-react'

export default function TopNav() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/', label: 'Inicio', icon: Home },
    { to: '/votar', label: 'Votar', icon: Vote },
    { to: '/resultados', label: 'Resultados', icon: BarChart3 },
    { to: '/acerca-de', label: 'Acerca de', icon: Info },
    { to: '/admin/login', label: 'Admin', icon: Shield },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-40 h-16 bg-dark-card border-b border-gray-700/80 backdrop-blur supports-[backdrop-filter]:bg-dark-card/80">
      <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400 border border-blue-500/30">
              <Shield size={18} />
            </span>
            <div className="leading-tight">
              <div className="text-sm sm:text-base font-semibold text-white">Sistema Electoral</div>
              <div className="text-[11px] sm:text-xs text-gray-400">Nacional</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const Icon = l.icon
              const active = location.pathname === l.to
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors border border-transparent ${
                    active
                      ? 'text-white bg-blue-600/20 border-blue-500/40'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm">{l.label}</span>
                </Link>
              )
            })}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:text-white hover:bg-dark-hover/70 focus:outline-none"
            aria-label="Abrir menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-gray-700/70 bg-dark-card">
          <div className="px-4 py-2 space-y-1">
            {links.map((l) => {
              const Icon = l.icon
              const active = location.pathname === l.to
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    active
                      ? 'text-white bg-blue-600/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm">{l.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
