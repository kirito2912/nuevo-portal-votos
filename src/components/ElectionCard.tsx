import React from 'react'
import './ElectionCard.css'

interface Election {
  id: string
  title: string
  subtitle: string
  status: 'en-curso' | 'finalizado'
  inicio: string
  cierre: string
  candidatos: number
  progreso?: number
}

interface ElectionCardProps {
  election: Election
}

const ElectionCard: React.FC<ElectionCardProps> = ({ election }) => {
  const isActive = election.status === 'en-curso'
  const borderColor = isActive ? '#22c55e' : '#6b7280'
  const tagColor = isActive ? '#22c55e' : '#6b7280'

  return (
    <div className="election-card" style={{ borderColor }}>
      <div className="election-card-header">
        <div>
          <h3 className="election-title">{election.title}</h3>
          <p className="election-subtitle">{election.subtitle}</p>
        </div>
        <span className="election-status" style={{ backgroundColor: tagColor }}>
          {isActive ? 'En Curso' : 'Finalizado'}
        </span>
      </div>

      <div className="election-details">
        <div className="election-detail-item">
          <span className="detail-label">Inicio:</span>
          <span className="detail-value">{election.inicio}</span>
        </div>
        <div className="election-detail-item">
          <span className="detail-label">Cierre:</span>
          <span className="detail-value">{election.cierre}</span>
        </div>
        <div className="election-detail-item">
          <span className="detail-label">Candidatos:</span>
          <span className="detail-value">{election.candidatos}</span>
        </div>
      </div>

      {isActive && election.progreso !== undefined && (
        <div className="election-progress">
          <div className="progress-header">
            <span className="progress-label">Progreso de Votación</span>
            <span className="progress-percentage">{election.progreso}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${election.progreso}%`, backgroundColor: '#22c55e' }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ElectionCard

