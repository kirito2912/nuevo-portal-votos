import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import ResultsTab from '../components/ResultsTab';
import ProcessingTab from '../components/ProcessingTab';
import TrainingTab from '../components/TrainingTab';
import AnalysisTab from '../components/AnalysisTab';
import { Shield, Sparkles, BarChart3, Database, Brain, TrendingUp } from 'lucide-react';
import '../../styles/admin/index.css';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('resultados');
  const [selectedCategory, setSelectedCategory] = useState<'presidencial' | 'regional' | 'distrital'>('presidencial');

  const tabs = [
    { id: 'resultados', label: 'Resultados', icon: BarChart3 },
    { id: 'procesamiento', label: 'Procesamiento', icon: Database },
    { id: 'entrenamiento', label: 'Entrenamiento', icon: Brain },
    { id: 'analisis', label: 'Análisis', icon: TrendingUp },
  ];

  const metrics = [
    {
      value: '1,247',
      label: 'Total de Votos',
      icon: BarChart3,
      iconColor: '#d4af37',
      badge: { text: '+12%', color: '#10b981' }
    },
    {
      value: '98.2%',
      label: 'Precisión de Datos',
      icon: Database,
      iconColor: '#10b981',
      badge: { text: 'Activo', color: '#3b82f6' }
    },
    {
      value: '94.5%',
      label: 'Exactitud del Modelo',
      icon: Brain,
      iconColor: '#8b5cf6',
      badge: { text: 'ML', color: '#8b5cf6' }
    },
    {
      value: '8',
      label: 'Candidatos Activos',
      icon: TrendingUp,
      iconColor: '#f59e0b',
      badge: { text: 'Live', color: '#f59e0b' }
    },
  ];

  return (
    <AdminLayout>
      {/* Título Principal */}
      <div className="dashboard-main-title">
        <Shield size={32} className="text-blue-400" />
        <h1>Sistema Electoral Nacional</h1>
        <Sparkles size={32} className="text-yellow-400" />
      </div>
      <p className="dashboard-subtitle">
        Plataforma Avanzada de Gestión y Análisis Electoral
      </p>

      {/* Cards de Métricas */}
      <div className="dashboard-metrics-grid">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="dashboard-metric-card">
              <div 
                className="dashboard-metric-icon"
                style={{ backgroundColor: `${metric.iconColor}20`, color: metric.iconColor }}
              >
                <Icon size={24} />
              </div>
              <div className="dashboard-metric-value">{metric.value}</div>
              <div className="dashboard-metric-label">{metric.label}</div>
              <div 
                className="dashboard-metric-badge"
                style={{ 
                  backgroundColor: `${metric.badge.color}20`, 
                  color: metric.badge.color 
                }}
              >
                {metric.badge.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Barra de Navegación */}
      <div className="dashboard-nav-bar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`dashboard-nav-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Contenido de las Tabs */}
      <div>
        {activeTab === 'resultados' && <ResultsTab selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />}
        {activeTab === 'procesamiento' && <ProcessingTab />}
        {activeTab === 'entrenamiento' && <TrainingTab />}
        {activeTab === 'analisis' && <AnalysisTab selectedCategory={selectedCategory} />}
      </div>
    </AdminLayout>
  );
}
