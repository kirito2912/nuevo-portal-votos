import { useState, useEffect } from 'react';
import { Database, CheckCircle2, RefreshCw, Trash2, Layers, Info, RotateCcw, Table, AlertTriangle } from 'lucide-react';
import '../../styles/admin/index.css';

export default function ProcessingTab() {
  const [activeAction, setActiveAction] = useState('analizar');
  const [voteCount, setVoteCount] = useState(1247);
  const [hasNAData, setHasNAData] = useState(false);
  const [nullCount, setNullCount] = useState(0);
  const [duplicateCount, setDuplicateCount] = useState(0);
  const [processedCount, setProcessedCount] = useState(1247);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastProcessed, setLastProcessed] = useState<Date>(new Date());

  const actions = [
    { id: 'analizar', label: 'Analizar Calidad', icon: CheckCircle2 },
    { id: 'reemplazar', label: 'Reemplazar Null → N/A', icon: RefreshCw },
    { id: 'duplicados', label: 'Quitar Duplicados', icon: Trash2 },
    { id: 'normalizar', label: 'Normalizar', icon: Layers },
  ];

  useEffect(() => {
    // Simular actualización periódica de datos
    const interval = setInterval(() => {
      const newVoteCount = Math.floor(Math.random() * 500) + 1000;
      const newNullCount = Math.floor(Math.random() * 15);
      const newDuplicateCount = Math.floor(Math.random() * 8);
      setVoteCount(newVoteCount);
      setNullCount(newNullCount);
      setDuplicateCount(newDuplicateCount);
      setHasNAData(newNullCount > 0);
      setProcessedCount(newVoteCount - newNullCount - newDuplicateCount);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleReload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newVoteCount = Math.floor(Math.random() * 500) + 1000;
      const newNullCount = Math.floor(Math.random() * 15);
      const newDuplicateCount = Math.floor(Math.random() * 8);
      setVoteCount(newVoteCount);
      setNullCount(newNullCount);
      setDuplicateCount(newDuplicateCount);
      setHasNAData(newNullCount > 0);
      setProcessedCount(newVoteCount - newNullCount - newDuplicateCount);
      setLastProcessed(new Date());
      setIsProcessing(false);
    }, 1500);
  };

  const handleProcessAction = (actionId: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      if (actionId === 'reemplazar') {
        setNullCount(0);
        setHasNAData(false);
        setProcessedCount(voteCount - duplicateCount);
      } else if (actionId === 'duplicados') {
        setDuplicateCount(0);
        setProcessedCount(voteCount - nullCount);
      }
      setLastProcessed(new Date());
      setIsProcessing(false);
    }, 2000);
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
              onClick={() => {
                setActiveAction(action.id);
                handleProcessAction(action.id);
              }}
              disabled={isProcessing}
              className={`processing-action-btn ${activeAction === action.id ? 'active' : ''} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Icon size={18} />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Estadísticas de Procesamiento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-dark-card rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Database className="text-blue-400" size={18} />
            <span className="text-gray-400 text-sm">Total Votos</span>
          </div>
          <p className="text-xl font-bold text-white">{voteCount.toLocaleString()}</p>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-amber-400" size={18} />
            <span className="text-gray-400 text-sm">Datos NULL</span>
          </div>
          <p className="text-xl font-bold text-white">{nullCount}</p>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Trash2 className="text-red-400" size={18} />
            <span className="text-gray-400 text-sm">Duplicados</span>
          </div>
          <p className="text-xl font-bold text-white">{duplicateCount}</p>
        </div>
        <div className="bg-dark-card rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="text-green-400" size={18} />
            <span className="text-gray-400 text-sm">Procesados</span>
          </div>
          <p className="text-xl font-bold text-white">{processedCount.toLocaleString()}</p>
        </div>
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
          <div className={`results-status-badge ${hasNAData ? 'results-status-warning' : 'results-status-ok'}`} style={{ marginTop: 0 }}>
            {hasNAData ? (
              <>
                <AlertTriangle size={16} />
                <span>Warning: {nullCount} datos NULL detectados</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                <span>OK: No hay datos NULL</span>
              </>
            )}
          </div>
        </div>
        <p className="processing-data-status">
          {voteCount.toLocaleString()} votos totales • {processedCount.toLocaleString()} procesados • {nullCount} NULL • {duplicateCount} duplicados
        </p>
        <div className="processing-data-actions">
          <button 
            className="processing-data-btn" 
            onClick={handleReload}
            disabled={isProcessing}
          >
            <RotateCcw size={18} className={isProcessing ? 'animate-spin' : ''} />
            <span>{isProcessing ? 'Procesando...' : 'Recargar'}</span>
          </button>
          <button className="processing-data-btn">
            <Table size={18} />
            <span>Mostrar Tabla</span>
          </button>
        </div>
        {lastProcessed && (
          <p className="text-xs text-gray-500 mt-2">
            Última actualización: {lastProcessed.toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  );
}
