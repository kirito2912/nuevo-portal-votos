import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

interface NavItem {
  path: string
  label: string
  icon: string
}

const Sidebar: React.FC = () => {
  const location = useLocation()

  const mainNavItems: NavItem[] = [
    { path: '/', label: 'Inicio', icon: '🏠' },
    { path: '/votar', label: 'Votar', icon: '📄' },
    { path: '/procesos', label: 'Procesos', icon: '📊' }
  ]

  const otherNavItems: NavItem[] = [
    { path: '/acerca', label: 'Acerca de', icon: 'ℹ️' },
    { path: '/admin/login', label: 'Admin', icon: '👤' }
  ]

  const isActive = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h2 className="sidebar-title">Navegación</h2>
        
        <nav className="sidebar-nav">
          {mainNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-divider"></div>

        <nav className="sidebar-nav">
          <h3 className="sidebar-section-title">Otros</h3>
          {otherNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar

