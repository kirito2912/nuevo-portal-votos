import React from 'react'
import './Header.css'

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="header-logo">
          <div className="logo-icon">📷</div>
          <span className="logo-text">Sistema Electoral Nacional</span>
        </div>
        <div className="header-actions">
          <div className="header-icon">⚪</div>
          <div className="header-icon">👤</div>
        </div>
      </div>
    </header>
  )
}

export default Header

