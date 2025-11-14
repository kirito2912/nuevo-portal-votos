import { useState, useEffect } from 'react';
import { Info, CheckCircle2, AlertTriangle, BarChart3, Users, TrendingUp, Database } from 'lucide-react';
import '../../styles/admin/index.css';

export default function ResultsTab() {
  const [hasNullData, setHasNullData] = useState(false);
  const [totalVotes, setTotalVotes] = useState(1247);
  const [nullCount, setNullCount] = useState(0);
  const [processedVotes, setProcessedVotes] = useState(1247);

  // Simular datos de resultados
  const resultsData = [
    { candidate: 'Keiko Fujimori', party: 'Fuerza Popular', votes: 456, percentage: 36.6 },
    { candidate: 'Rafael López Aliaga', party: 'Renovación Popular', votes: 399, percentage: 32.0 },
    { candidate: 'César Acuña', party: 'Alianza Para el Progreso', votes: 392, percentage: 31.4 },
  ];

  useEffect(() => {
    // Simular actualización de datos cada 5 segundos
    const interval = setInterval(() => {
      const newTotal = Math.floor(Math.random() * 500) + 1000;
      const newNullCount = Math.floor(Math.random() * 10);
      setTotalVotes(newTotal);
      setNullCount(newNullCount);
      setHasNullData(newNullCount > 0);
      setProcessedVotes(newTotal - newNullCount);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="results-section">
      <h2 className="results-section-title">Resultados Electorales</h2>
      <p className="results-section-subtitle">
        Visualización en tiempo real de los resultados de votación
      </p>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-dark-card rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Database className="text-blue-400" size={20} />
            <span className="text-gray-400 text-sm">Total de Votos</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalVotes.toLocaleString()}</p>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="text-green-400" size={20} />
            <span className="text-gray-400 text-sm">Votos Procesados</span>
          </div>
          <p className="text-2xl font-bold text-white">{processedVotes.toLocaleString()}</p>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-amber-400" size={20} />
            <span className="text-gray-400 text-sm">Datos NULL</span>
          </div>
          <p className="text-2xl font-bold text-white">{nullCount}</p>
        </div>
      </div>

      {/* Tabla de resultados */}
      <div className="bg-dark-card rounded-lg p-6 border border-gray-700 mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 size={24} className="text-blue-400" />
          Resultados por Candidato Presidencial
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400">Candidato</th>
                <th className="text-left py-3 px-4 text-gray-400">Partido</th>
                <th className="text-right py-3 px-4 text-gray-400">Votos</th>
                <th className="text-right py-3 px-4 text-gray-400">Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              {resultsData.map((result, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-white font-medium">{result.candidate}</td>
                  <td className="py-3 px-4 text-gray-400">{result.party}</td>
                  <td className="py-3 px-4 text-right text-white">{result.votes.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${result.percentage}%` }}
                        />
                      </div>
                      <span className="text-white font-medium w-12 text-right">{result.percentage.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
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
              <span>Warning: Se detectaron {nullCount} datos "N/A"</span>
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
