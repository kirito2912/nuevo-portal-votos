import { useState, useEffect, useMemo } from 'react';
import { Database, CheckCircle2, RefreshCw, Trash2, Layers, Info, RotateCcw, Table, AlertTriangle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/admin/index.css';

interface VoteData {
  id: number;
  dni: string | null;
  nombre: string;
  candidato: string;
  fecha: string;
  region: string | null;
  distrito: string | null;
  isNull: boolean;
  isDuplicate: boolean;
  isProcessed: boolean;
}

export default function ProcessingTab() {
  const [activeAction, setActiveAction] = useState('analizar');
  const [voteCount, setVoteCount] = useState(1247);
  const [hasNAData, setHasNAData] = useState(false);
  const [nullCount, setNullCount] = useState(0);
  const [duplicateCount, setDuplicateCount] = useState(0);
  const [processedCount, setProcessedCount] = useState(1247);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastProcessed, setLastProcessed] = useState<Date>(new Date());
  const [showTable, setShowTable] = useState(false);
  const [votesData, setVotesData] = useState<VoteData[]>([]);
  const [nullsReplaced, setNullsReplaced] = useState(false);
  const [duplicatesRemoved, setDuplicatesRemoved] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const actions = [
    { id: 'analizar', label: 'Analizar Calidad', icon: CheckCircle2 },
    { id: 'reemplazar', label: 'Reemplazar Null → N/A', icon: RefreshCw },
    { id: 'duplicados', label: 'Quitar Duplicados', icon: Trash2 },
    { id: 'normalizar', label: 'Normalizar', icon: Layers },
  ];

  const candidates = ['Keiko Fujimori', 'Rafael López Aliaga', 'César Acuña', 'Ana María Torres', 'Miguel Ángel Castro'];
  const regions = ['Lima', 'Arequipa', 'Cusco', 'La Libertad', 'Piura', 'Lambayeque'];
  const distritos = ['Lima', 'Miraflores', 'San Isidro', 'Surco', 'La Molina', 'Barranco'];

  // Generar datos simulados de votos
  const generateVotesData = (count: number, includeNulls: boolean, includeDuplicates: boolean): VoteData[] => {
    const data: VoteData[] = [];
    const usedDnis = new Set<string>();
    const duplicateDnis: string[] = [];
    
    // Primero generar algunos DNI que se repetirán
    if (includeDuplicates) {
      for (let i = 0; i < 3; i++) {
        duplicateDnis.push(`${Math.floor(Math.random() * 90000000) + 10000000}`);
      }
    }
    
    for (let i = 1; i <= count; i++) {
      const hasNull = includeNulls && Math.random() < 0.15; // 15% de probabilidad de NULL
      let dni: string | null;
      let isDuplicate = false;
      
      if (hasNull) {
        dni = null;
      } else if (includeDuplicates && duplicateDnis.length > 0 && Math.random() < 0.2) {
        // 20% de probabilidad de usar un DNI duplicado
        dni = duplicateDnis[Math.floor(Math.random() * duplicateDnis.length)];
        if (usedDnis.has(dni)) {
          isDuplicate = true;
        } else {
          usedDnis.add(dni);
        }
      } else {
        dni = `${Math.floor(Math.random() * 90000000) + 10000000}`;
        if (usedDnis.has(dni)) {
          isDuplicate = true;
        } else {
          usedDnis.add(dni);
        }
      }

      data.push({
        id: i,
        dni: dni,
        nombre: `Votante ${i}`,
        candidato: candidates[Math.floor(Math.random() * candidates.length)],
        fecha: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toLocaleDateString('es-PE'),
        region: hasNull && Math.random() < 0.3 ? null : regions[Math.floor(Math.random() * regions.length)],
        distrito: hasNull && Math.random() < 0.3 ? null : distritos[Math.floor(Math.random() * distritos.length)],
        isNull: hasNull,
        isDuplicate: isDuplicate,
        isProcessed: false,
      });
    }

    return data;
  };

  // Inicializar datos
  useEffect(() => {
    const initialData = generateVotesData(20, true, true);
    setVotesData(initialData);
    const nulls = initialData.filter(v => v.isNull).length;
    const duplicates = initialData.filter(v => v.isDuplicate).length;
    setNullCount(nulls);
    setDuplicateCount(duplicates);
    setHasNAData(nulls > 0);
    setVoteCount(initialData.length);
    setProcessedCount(initialData.length - nulls - duplicates);
  }, []);

  // Datos filtrados según el estado de procesamiento
  const displayedData = useMemo(() => {
    let data = [...votesData];
    
    if (nullsReplaced) {
      // Los NULL ya fueron reemplazados, mostrar "N/A"
      data = data.map(v => ({
        ...v,
        dni: v.isNull ? 'N/A' : v.dni,
        region: v.isNull && !v.region ? 'N/A' : v.region,
        distrito: v.isNull && !v.distrito ? 'N/A' : v.distrito,
      }));
    }
    
    if (duplicatesRemoved) {
      // Filtrar duplicados
      data = data.filter(v => !v.isDuplicate);
    }
    
    return data;
  }, [votesData, nullsReplaced, duplicatesRemoved]);

  // Calcular paginación
  const totalPages = Math.ceil(displayedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = displayedData.slice(startIndex, endIndex);

  // Resetear página cuando cambian los datos
  useEffect(() => {
    setCurrentPage(1);
  }, [displayedData.length, nullsReplaced, duplicatesRemoved]);

  const handleReload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newData = generateVotesData(20, true, true);
      setVotesData(newData);
      const nulls = newData.filter(v => v.isNull).length;
      const duplicates = newData.filter(v => v.isDuplicate).length;
      setNullCount(nulls);
      setDuplicateCount(duplicates);
      setHasNAData(nulls > 0);
      setVoteCount(newData.length);
      setProcessedCount(newData.length - nulls - duplicates);
      setNullsReplaced(false);
      setDuplicatesRemoved(false);
      setLastProcessed(new Date());
      setIsProcessing(false);
    }, 1500);
  };

  const handleProcessAction = (actionId: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      if (actionId === 'reemplazar') {
        setNullsReplaced(true);
        setNullCount(0);
        setHasNAData(false);
        setProcessedCount(voteCount - duplicateCount);
      } else if (actionId === 'duplicados') {
        setDuplicatesRemoved(true);
        const newDuplicateCount = 0;
        setDuplicateCount(newDuplicateCount);
        setProcessedCount(voteCount - nullCount);
        setVoteCount(voteCount - duplicateCount);
      } else if (actionId === 'normalizar') {
        // Normalizar: reemplazar NULLs y quitar duplicados
        setNullsReplaced(true);
        setDuplicatesRemoved(true);
        setNullCount(0);
        setDuplicateCount(0);
        setHasNAData(false);
        setProcessedCount(voteCount - duplicateCount - nullCount);
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
          <button 
            className="processing-data-btn"
            onClick={() => setShowTable(!showTable)}
          >
            <Table size={18} />
            <span>{showTable ? 'Ocultar Tabla' : 'Mostrar Tabla'}</span>
          </button>
        </div>
        {lastProcessed && (
          <p className="text-xs text-gray-500 mt-2">
            Última actualización: {lastProcessed.toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Tabla de Datos */}
      {showTable && (
        <div className="bg-dark-card rounded-lg p-6 border border-gray-700 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Table size={24} className="text-blue-400" />
              Tabla de Votos ({displayedData.length} registros)
            </h3>
            <button
              onClick={() => setShowTable(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400">ID</th>
                  <th className="text-left py-3 px-4 text-gray-400">DNI</th>
                  <th className="text-left py-3 px-4 text-gray-400">Nombre</th>
                  <th className="text-left py-3 px-4 text-gray-400">Candidato</th>
                  <th className="text-left py-3 px-4 text-gray-400">Fecha</th>
                  <th className="text-left py-3 px-4 text-gray-400">Región</th>
                  <th className="text-left py-3 px-4 text-gray-400">Distrito</th>
                  <th className="text-center py-3 px-4 text-gray-400">Estado</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((vote) => {
                  const isNA = vote.dni === 'N/A' || vote.region === 'N/A' || vote.distrito === 'N/A';
                  const isNullOriginal = vote.isNull && !nullsReplaced;
                  
                  return (
                    <tr 
                      key={vote.id} 
                      className={`border-b border-gray-800 hover:bg-gray-800/50 ${
                        isNullOriginal ? 'bg-amber-500/10' : 
                        isNA ? 'bg-yellow-500/10' : 
                        vote.isDuplicate && !duplicatesRemoved ? 'bg-red-500/10' : ''
                      }`}
                    >
                      <td className="py-3 px-4 text-white">{vote.id}</td>
                      <td className={`py-3 px-4 ${
                        isNA || isNullOriginal ? 'text-amber-400 font-semibold' : 'text-white'
                      }`}>
                        {vote.dni || (isNullOriginal ? 'NULL' : 'N/A')}
                      </td>
                      <td className="py-3 px-4 text-white">{vote.nombre}</td>
                      <td className="py-3 px-4 text-white">{vote.candidato}</td>
                      <td className="py-3 px-4 text-gray-300">{vote.fecha}</td>
                      <td className={`py-3 px-4 ${
                        vote.region === 'N/A' || (vote.region === null && isNullOriginal) 
                          ? 'text-amber-400 font-semibold' 
                          : 'text-gray-300'
                      }`}>
                        {vote.region || (isNullOriginal ? 'NULL' : 'N/A')}
                      </td>
                      <td className={`py-3 px-4 ${
                        vote.distrito === 'N/A' || (vote.distrito === null && isNullOriginal)
                          ? 'text-amber-400 font-semibold'
                          : 'text-gray-300'
                      }`}>
                        {vote.distrito || (isNullOriginal ? 'NULL' : 'N/A')}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {isNullOriginal && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            <AlertTriangle size={12} />
                            NULL
                          </span>
                        )}
                        {isNA && !isNullOriginal && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                            N/A
                          </span>
                        )}
                        {vote.isDuplicate && !duplicatesRemoved && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
                            <Trash2 size={12} />
                            Duplicado
                          </span>
                        )}
                        {!isNullOriginal && !isNA && (!vote.isDuplicate || duplicatesRemoved) && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                            <CheckCircle2 size={12} />
                            OK
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
              <div className="text-sm text-gray-400">
                Mostrando {startIndex + 1} - {Math.min(endIndex, displayedData.length)} de {displayedData.length} registros
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border transition-colors ${
                    currentPage === 1
                      ? 'border-gray-700 text-gray-600 cursor-not-allowed'
                      : 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg border transition-colors ${
                    currentPage === totalPages
                      ? 'border-gray-700 text-gray-600 cursor-not-allowed'
                      : 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Leyenda */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-400 mb-2">Leyenda:</p>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-amber-500/20 border border-amber-500/30 rounded"></span>
                <span className="text-gray-300">Datos NULL (sin procesar)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-yellow-500/20 border border-yellow-500/30 rounded"></span>
                <span className="text-gray-300">Datos N/A (procesados)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-red-500/20 border border-red-500/30 rounded"></span>
                <span className="text-gray-300">Duplicados</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-500/20 border border-green-500/30 rounded"></span>
                <span className="text-gray-300">Datos válidos</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
