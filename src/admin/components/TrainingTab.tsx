import { useState } from 'react';
import { RefreshCw, Play, Info } from 'lucide-react';
import '../../styles/admin/index.css';

export default function TrainingTab() {
  const [modelType, setModelType] = useState('clasificacion');
  const [algorithm, setAlgorithm] = useState('random-forest');
  const [validVotes, setValidVotes] = useState(1247); // Datos simulados
  const [candidates, setCandidates] = useState(8); // Datos simulados

  const handleReload = () => {
    // Simular recarga de datos
    setValidVotes(Math.floor(Math.random() * 2000) + 500);
    setCandidates(Math.floor(Math.random() * 10) + 5);
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

        {/* Botón de Iniciar Entrenamiento */}
        <button
          className="training-start-btn"
          disabled={!canTrain}
          onClick={() => {
            if (canTrain) {
              alert('Iniciando entrenamiento del modelo...');
            }
          }}
        >
          <Play size={20} />
          <span>Iniciar Entrenamiento</span>
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

