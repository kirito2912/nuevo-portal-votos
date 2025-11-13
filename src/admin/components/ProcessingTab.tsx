import { useState } from 'react';
import { Database, CheckCircle2, RefreshCw, Trash2, Layers, Info, RotateCcw, Table } from 'lucide-react';
import '../../styles/admin/index.css';

export default function ProcessingTab() {
  const [activeAction, setActiveAction] = useState('analizar');
  const [voteCount, setVoteCount] = useState(1247); // Datos simulados
  const [hasNAData, setHasNAData] = useState(true); // Simulado

  const actions = [
    { id: 'analizar', label: 'Analizar Calidad', icon: CheckCircle2 },
    { id: 'reemplazar', label: 'Reemplazar Null → N/A', icon: RefreshCw },
    { id: 'duplicados', label: 'Quitar Duplicados', icon: Trash2 },
    { id: 'normalizar', label: 'Normalizar', icon: Layers },
  ];

  const handleReload = () => {
    // Simular recarga de datos
    setVoteCount(Math.floor(Math.random() * 2000) + 500);
    setHasNAData(Math.random() > 0.5);
  };

  return (
    <div className="processing-section">
      {/* Header */}
      <div className="processing-header">
        <h2 className="processing-title">
          <Database size={24} />
          Procesamiento de Datos
        </h2>
        <p className="processing-subtitle">
          Análisis y limpieza de datos electorales (Pandas + Supabase)
        </p>
      </div>

      {/* Botones de Acción */}
      <div className="processing-actions">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => setActiveAction(action.id)}
              className={`processing-action-btn ${activeAction === action.id ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Información del Proceso Real */}
      <div className="processing-info-card">
        <h3 className="processing-info-title">
          <Info size={20} />
          Proceso Real (Pandas + Supabase)
        </h3>
        <ul className="processing-info-list">
          <li className="processing-info-item">
            Los datos NULL se reemplazan con "N/A" (incluyendo DNI)
          </li>
          <li className="processing-info-item">
            Se registra auditoría en tabla null_data_votes
          </li>
          <li className="processing-info-item">
            Los registros permanecen en la base de datos
          </li>
          <li className="processing-info-item">
            Status visual: OK si no hay NULL, Warning si hay "N/A"
          </li>
        </ul>
      </div>

      {/* Datos en Procesamiento */}
      <div className="processing-data-section">
        <div className="processing-data-header">
          <h3 className="processing-data-title">
            <Database size={20} />
            Datos en Procesamiento
          </h3>
        </div>
        <p className="processing-data-status">
          {voteCount.toLocaleString()} votos • {hasNAData ? 'N/A indica datos reemplazados' : 'Sin datos N/A'}
        </p>
        <div className="processing-data-actions">
          <button className="processing-data-btn" onClick={handleReload}>
            <RotateCcw size={18} />
            <span>Recargar</span>
          </button>
          <button className="processing-data-btn">
            <Table size={18} />
            <span>Mostrar Tabla</span>
          </button>
        </div>
      </div>
    </div>
  );
}
