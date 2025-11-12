import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import ElectionCard from './ElectionCard'
import CTA_Banner from './CTA_Banner'
import './Dashboard.css'

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

const Dashboard: React.FC = () => {
  const elections: Election[] = [
    {
      id: '1',
      title: 'Elección Presidencial 2025',
      subtitle: 'Elección del Presidente de la República',
      status: 'en-curso',
      inicio: '15 Nov 2025 - 08:00',
      cierre: '15 Nov 2025 - 20:00',
      candidatos: 4,
      progreso: 65
    },
    {
      id: '2',
      title: 'Elección Congresal',
      subtitle: 'Elección de Representantes al Congreso',
      status: 'en-curso',
      inicio: '15 Nov 2025 - 08:00',
      cierre: '15 Nov 2025 - 20:00',
      candidatos: 120,
      progreso: 42
    },
    {
      id: '3',
      title: 'Elección Regional',
      subtitle: 'Elección de Gobernadores Regionales',
      status: 'finalizado',
      inicio: '10 Oct 2025 - 08:00',
      cierre: '10 Oct 2025 - 20:00',
      candidatos: 25
    }
  ]

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Procesos Electorales</h1>
            <p className="dashboard-subtitle">Participa en las elecciones nacionales y regionales</p>
          </div>

          <div className="elections-grid">
            {elections.map((election) => (
              <ElectionCard key={election.id} election={election} />
            ))}
          </div>

          <CTA_Banner />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
