import React from 'react'
import { Link } from 'react-router-dom'
import './CTA_Banner.css'

const CTA_Banner: React.FC = () => {
  return (
    <div className="cta-banner">
      <div className="cta-content">
        <h2 className="cta-title">¡Tu Voto Es Tu Voz!</h2>
        <p className="cta-description">
          Participa en la construcción democrática de nuestro país. Cada voto cuenta en la toma de decisiones nacional.
        </p>
        <Link to="/votar" className="cta-button">
          <span className="cta-icon">🗳️</span>
          Ir a la Cabina de Votación
        </Link>
      </div>
    </div>
  )
}

export default CTA_Banner

