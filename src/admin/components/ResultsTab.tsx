import { useState } from 'react';
import { Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import '../../styles/admin/index.css';

export default function ResultsTab() {
  const [hasNullData, setHasNullData] = useState(false); // Simulado: false = OK, true = Warning

  return (
    <div className="results-section">
      <h2 className="results-section-title">Resultados Electorales</h2>
      <p className="results-section-subtitle">
        Visualización en tiempo real de los resultados de votación
      </p>
      
      <div className="results-process-info">
        <h3 className="results-process-title">
          <Info size={20} />
          Proceso de Limpieza de Datos
        </h3>
        <ul className="results-process-list">
          <li className="results-process-item">
            Los datos NULL se reemplazan con "N/A" (incluyendo DNI)
          </li>
          <li className="results-process-item">
            Se registra auditoría en tabla null_data_votes
          </li>
          <li className="results-process-item">
            Los registros permanecen en la base de datos
          </li>
          <li className="results-process-item">
            Status visual: OK si no hay NULL, Warning si hay "N/A"
          </li>
        </ul>
        
        <div className={`results-status-badge ${hasNullData ? 'results-status-warning' : 'results-status-ok'}`}>
          {hasNullData ? (
            <>
              <AlertTriangle size={16} />
              <span>Warning: Se detectaron datos "N/A"</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              <span>OK: No hay datos NULL</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
