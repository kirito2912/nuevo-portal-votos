import { useState, useEffect } from 'react';
import { RefreshCw, Play, Info, Brain, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import '../../styles/admin/index.css';

export default function TrainingTab() {
  const [modelType, setModelType] = useState('clasificacion');
  const [algorithm, setAlgorithm] = useState('random-forest');
  const [validVotes, setValidVotes] = useState(1247);
  const [candidates, setCandidates] = useState(7);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [modelAccuracy, setModelAccuracy] = useState(94.5);
  const [lastTrained, setLastTrained] = useState<Date | null>(null);

  useEffect(() => {
    // Simular actualización periódica
    const interval = setInterval(() => {
      setValidVotes(prev => prev + Math.floor(Math.random() * 10));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleReload = () => {
    setValidVotes(Math.floor(Math.random() * 500) + 1000);
    setCandidates(Math.floor(Math.random() * 3) + 5);
  };

  const handleTrain = () => {
    if (canTrain && !isTraining) {
      setIsTraining(true);
      setTrainingProgress(0);
      
      const interval = setInterval(() => {
        setTrainingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsTraining(false);
            setLastTrained(new Date());
            setModelAccuracy(prev => Math.min(99.9, prev + Math.random() * 2));
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  const canTrain = validVotes >= 10;

  return (
    <div className="training-section">
      {/* Header */}
      <div className="training-header">
        <div className="training-header-left">
          <h2 className="training-title">Entrenamiento de Modelo ML</h2>
          <p className="training-status">
            Scikit-learn en tiempo real • {validVotes} votos válidos
          </p>
        </div>
        <button className="processing-data-btn" onClick={handleReload}>
          <RefreshCw size={18} />
          <span>Recargar Datos</span>
        </button>
      </div>

      {/* Warning Badge */}
      {!canTrain && (
        <div className="training-warning-badge">
          <Info size={18} />
          <span>Solo {validVotes} válidos (mínimo 10)</span>
        </div>
      )}

      {/* Configuración del Modelo */}
      <div className="training-config-section">
        <h3 className="training-config-title">Configuración del Modelo</h3>

        {/* Tipo de Modelo */}
        <div className="training-form-group">
          <label className="training-form-label">Tipo de Modelo</label>
          <select
            className="training-form-select"
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
          >
            <option value="clasificacion">Clasificación (Predicción de Candidato Ganador)</option>
            <option value="regresion">Regresión</option>
            <option value="clustering">Clustering</option>
          </select>
          <p className="training-form-description">
            Predice qué candidato ganará en un perfil demográfico
          </p>
        </div>

        {/* Algoritmo */}
        <div className="training-form-group">
          <label className="training-form-label">Algoritmo</label>
          <select
            className="training-form-select"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="random-forest">Random Forest</option>
            <option value="svm">SVM (Support Vector Machine)</option>
            <option value="neural-network">Neural Network</option>
            <option value="logistic-regression">Logistic Regression</option>
          </select>
          <p className="training-form-description">
            Predice el candidato ganador
          </p>
        </div>

        {/* Stats Cards */}
        <div className="training-stats-grid">
          <div className="training-stat-card">
            <div className="training-stat-label">Votos Válidos</div>
            <div className="training-stat-value">{validVotes}</div>
          </div>
          <div className="training-stat-card">
            <div className="training-stat-label">Features</div>
            <div className="training-stat-list" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Edad, Educación, Género
            </div>
          </div>
          <div className="training-stat-card">
            <div className="training-stat-label">Candidatos</div>
            <div className="training-stat-value">{candidates}</div>
          </div>
        </div>

        {/* Progreso de Entrenamiento */}
        {isTraining && (
          <div className="mb-4 bg-dark-card rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Entrenando modelo...</span>
              <span className="text-sm font-semibold text-white">{trainingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${trainingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Resultados del Modelo */}
        {lastTrained && !isTraining && (
          <div className="mb-4 bg-dark-card rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="text-green-400" size={20} />
              <span className="text-white font-semibold">Modelo Entrenado</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <span className="text-gray-400 text-sm">Precisión</span>
                <p className="text-xl font-bold text-white">{modelAccuracy.toFixed(1)}%</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Último entrenamiento</span>
                <p className="text-sm text-white">{lastTrained.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Botón de Iniciar Entrenamiento */}
        <button
          className="training-start-btn"
          disabled={!canTrain || isTraining}
          onClick={handleTrain}
        >
          {isTraining ? (
            <>
              <RefreshCw size={20} className="animate-spin" />
              <span>Entrenando...</span>
            </>
          ) : (
            <>
              <Play size={20} />
              <span>Iniciar Entrenamiento</span>
            </>
          )}
        </button>
      </div>

      {/* Frameworks */}
      <div className="training-frameworks-section">
        <h3 className="training-frameworks-title">Frameworks</h3>
        <div className="training-frameworks-badges">
          <span className="training-framework-badge">Scikit-learn</span>
          <span className="training-framework-badge">Pandas</span>
          <span className="training-framework-badge">FastAPI</span>
        </div>
        <p className="training-frameworks-description">
          Usa datos limpios de votos. Filtro: DNI + candidato + fecha.
        </p>
      </div>
    </div>
  );
}

