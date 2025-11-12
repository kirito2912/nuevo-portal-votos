import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import './Home.css'

const Home: React.FC = () => {
  return (
    <div className="home-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="home-container">
          <div className="hero-section">
            <div className="hero-badge">
              <span className="badge-icon">📅</span>
              <span>Proceso Electoral 2025 - En Curso</span>
            </div>
            
            <h1 className="hero-title">Sistema Electoral Nacional</h1>
            
            <p className="hero-description">
              Plataforma oficial de votación digital del Estado. Seguro, Transparente, Verificable.
            </p>
            
            <div className="hero-actions">
              <Link to="/votar" className="hero-button primary">
                <span className="button-icon">📄</span>
                Emitir Mi Voto
              </Link>
              <Link to="/resultados" className="hero-button secondary">
                <span className="button-icon">📊</span>
                Ver Resultados en Tiempo Real
              </Link>
            </div>
          </div>

          <div className="features-section">
            <div className="feature-card">
              <div className="feature-icon security">🛡️</div>
              <h3 className="feature-title">Seguridad Militar</h3>
              <p className="feature-description">
                Cifrado AES-256 y verificación blockchain para máxima seguridad
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon transparency">📊</div>
              <h3 className="feature-title">Transparencia Total</h3>
              <p className="feature-description">
                Auditoría en tiempo real y resultados verificables públicamente
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon access">👥</div>
              <h3 className="feature-title">Acceso Universal</h3>
              <p className="feature-description">
                Plataforma accesible para todos los ciudadanos habilitados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

