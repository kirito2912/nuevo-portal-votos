# Guía de Implementación Backend - Panel Administrativo

Esta guía explica cómo implementar las funcionalidades reales para las cuatro secciones del panel administrativo.

## Estructura General

```
Backend (FastAPI/Python)
├── API Endpoints
├── Servicios de Procesamiento (Pandas)
├── Servicios de ML (Scikit-learn)
└── Base de Datos (Supabase/PostgreSQL)

Frontend (React)
├── Services (Llamadas API)
├── Hooks (Estado y lógica)
└── Components (UI)
```

---

## 1. RESULTADOS ELECTORALES

### Objetivo
Visualizar resultados en tiempo real y verificar el estado de limpieza de datos.

### Backend - Endpoints Necesarios

```python
# FastAPI Endpoints
GET /api/results/status          # Estado de datos (NULL/N/A)
GET /api/results/summary         # Resumen de resultados
GET /api/results/realtime        # Resultados en tiempo real (WebSocket)
```

### Base de Datos - Consultas

```sql
-- Verificar si hay datos NULL
SELECT COUNT(*) as null_count 
FROM votes 
WHERE dni IS NULL OR candidato_id IS NULL OR fecha IS NULL;

-- Verificar si hay datos N/A (reemplazados)
SELECT COUNT(*) as na_count 
FROM votes 
WHERE dni = 'N/A' OR candidato_id = 'N/A';

-- Auditoría de reemplazos
SELECT * FROM null_data_votes 
ORDER BY fecha_reemplazo DESC 
LIMIT 100;
```

### Frontend - Implementación

**Servicio API:**
```typescript
// src/services/resultsService.ts
export const getResultsStatus = async () => {
  const response = await fetch('/api/results/status');
  return response.json();
};

export const getResultsSummary = async () => {
  const response = await fetch('/api/results/summary');
  return response.json();
};
```

**Hook personalizado:**
```typescript
// src/hooks/useResults.ts
export const useResults = () => {
  const [status, setStatus] = useState(null);
  
  useEffect(() => {
    const fetchStatus = async () => {
      const data = await getResultsStatus();
      setStatus(data);
    };
    fetchStatus();
    
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);
  
  return { status };
};
```

---

## 2. PROCESAMIENTO DE DATOS

### Objetivo
Analizar, limpiar y normalizar los datos electorales usando Pandas.

### Backend - Endpoints Necesarios

```python
# FastAPI Endpoints
POST /api/processing/analyze-quality    # Analizar calidad de datos
POST /api/processing/replace-null       # Reemplazar NULL → N/A
POST /api/processing/remove-duplicates  # Eliminar duplicados
POST /api/processing/normalize          # Normalizar datos
GET  /api/processing/status             # Estado actual
GET  /api/processing/data               # Datos procesados
```

### Backend - Servicio de Procesamiento (Python)

```python
# backend/services/data_processing.py
import pandas as pd
from supabase import create_client
from datetime import datetime

class DataProcessingService:
    def __init__(self):
        self.supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    def analyze_quality(self):
        """Analiza la calidad de los datos"""
        votes_df = pd.read_sql("SELECT * FROM votes", self.connection)
        
        analysis = {
            'total_records': len(votes_df),
            'null_counts': votes_df.isnull().sum().to_dict(),
            'duplicate_count': votes_df.duplicated().sum(),
            'data_types': votes_df.dtypes.to_dict()
        }
        
        return analysis
    
    def replace_null_with_na(self):
        """Reemplaza NULL con 'N/A' y registra auditoría"""
        votes_df = pd.read_sql("SELECT * FROM votes", self.connection)
        
        # Identificar registros con NULL
        null_mask = votes_df.isnull().any(axis=1)
        null_records = votes_df[null_mask].copy()
        
        # Reemplazar NULL con 'N/A'
        votes_df = votes_df.fillna('N/A')
        
        # Guardar en base de datos
        votes_df.to_sql('votes', self.connection, if_exists='replace', index=False)
        
        # Registrar auditoría
        for _, record in null_records.iterrows():
            self.supabase.table('null_data_votes').insert({
                'vote_id': record['id'],
                'campo_afectado': 'multiple',
                'valor_original': None,
                'valor_reemplazado': 'N/A',
                'fecha_reemplazo': datetime.now().isoformat()
            }).execute()
        
        return {
            'replaced_count': len(null_records),
            'status': 'success'
        }
    
    def remove_duplicates(self):
        """Elimina registros duplicados"""
        votes_df = pd.read_sql("SELECT * FROM votes", self.connection)
        
        initial_count = len(votes_df)
        votes_df = votes_df.drop_duplicates(subset=['dni', 'candidato_id', 'fecha'])
        final_count = len(votes_df)
        
        votes_df.to_sql('votes', self.connection, if_exists='replace', index=False)
        
        return {
            'removed_count': initial_count - final_count,
            'remaining_count': final_count
        }
    
    def normalize_data(self):
        """Normaliza los datos (formato, mayúsculas, etc.)"""
        votes_df = pd.read_sql("SELECT * FROM votes", self.connection)
        
        # Normalizar DNI (solo números)
        votes_df['dni'] = votes_df['dni'].astype(str).str.replace(r'[^0-9]', '', regex=True)
        
        # Normalizar nombres (title case)
        if 'nombre' in votes_df.columns:
            votes_df['nombre'] = votes_df['nombre'].str.title()
        
        votes_df.to_sql('votes', self.connection, if_exists='replace', index=False)
        
        return {'status': 'normalized', 'record_count': len(votes_df)}
```

### Frontend - Implementación

**Servicio API:**
```typescript
// src/services/processingService.ts
export const analyzeQuality = async () => {
  const response = await fetch('/api/processing/analyze-quality', {
    method: 'POST'
  });
  return response.json();
};

export const replaceNull = async () => {
  const response = await fetch('/api/processing/replace-null', {
    method: 'POST'
  });
  return response.json();
};

export const removeDuplicates = async () => {
  const response = await fetch('/api/processing/remove-duplicates', {
    method: 'POST'
  });
  return response.json();
};

export const normalizeData = async () => {
  const response = await fetch('/api/processing/normalize', {
    method: 'POST'
  });
  return response.json();
};

export const getProcessingStatus = async () => {
  const response = await fetch('/api/processing/status');
  return response.json();
};
```

---

## 3. ENTRENAMIENTO DE MODELO ML

### Objetivo
Entrenar modelos de Machine Learning para predecir resultados electorales.

### Backend - Endpoints Necesarios

```python
# FastAPI Endpoints
GET  /api/training/stats              # Estadísticas de datos válidos
POST /api/training/train              # Iniciar entrenamiento
GET  /api/training/status/{job_id}    # Estado del entrenamiento
GET  /api/training/models             # Lista de modelos entrenados
GET  /api/training/predict            # Hacer predicción
```

### Backend - Servicio de ML (Python)

```python
# backend/services/ml_service.py
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib
from datetime import datetime

class MLTrainingService:
    def __init__(self):
        self.supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    def get_valid_votes_stats(self):
        """Obtiene estadísticas de votos válidos"""
        # Filtrar votos válidos: DNI + candidato + fecha no NULL/N/A
        query = """
            SELECT 
                COUNT(*) as total_validos,
                COUNT(DISTINCT candidato_id) as total_candidatos,
                COUNT(DISTINCT dni) as total_votantes
            FROM votes
            WHERE dni != 'N/A' 
            AND candidato_id != 'N/A'
            AND fecha IS NOT NULL
        """
        
        result = self.supabase.rpc('execute_query', {'query': query}).execute()
        return result.data[0]
    
    def prepare_training_data(self):
        """Prepara los datos para entrenamiento"""
        # Obtener votos válidos
        votes_df = pd.read_sql("""
            SELECT v.*, c.nombre as candidato_nombre, c.partido
            FROM votes v
            JOIN candidates c ON v.candidato_id = c.id
            WHERE v.dni != 'N/A' 
            AND v.candidato_id != 'N/A'
            AND v.fecha IS NOT NULL
        """, self.connection)
        
        if len(votes_df) < 10:
            raise ValueError("Se requieren al menos 10 votos válidos")
        
        # Features: edad, educación, género
        # Target: candidato_id (ganador)
        
        features = ['edad', 'educacion', 'genero']
        X = votes_df[features].copy()
        y = votes_df['candidato_id']
        
        # Codificar variables categóricas
        le_educacion = LabelEncoder()
        le_genero = LabelEncoder()
        le_candidato = LabelEncoder()
        
        X['educacion'] = le_educacion.fit_transform(X['educacion'])
        X['genero'] = le_genero.fit_transform(X['genero'])
        y_encoded = le_candidato.fit_transform(y)
        
        return X, y_encoded, le_candidato, votes_df
    
    def train_model(self, model_type='clasificacion', algorithm='random-forest'):
        """Entrena el modelo de ML"""
        X, y, le_candidato, votes_df = self.prepare_training_data()
        
        # Dividir datos
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Seleccionar algoritmo
        if algorithm == 'random-forest':
            model = RandomForestClassifier(n_estimators=100, random_state=42)
        elif algorithm == 'svm':
            from sklearn.svm import SVC
            model = SVC(kernel='rbf', probability=True)
        elif algorithm == 'logistic-regression':
            from sklearn.linear_model import LogisticRegression
            model = LogisticRegression(max_iter=1000)
        else:
            raise ValueError(f"Algoritmo {algorithm} no soportado")
        
        # Entrenar
        model.fit(X_train, y_train)
        
        # Evaluar
        accuracy = model.score(X_test, y_test)
        
        # Guardar modelo
        model_filename = f"models/{algorithm}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pkl"
        joblib.dump({
            'model': model,
            'label_encoder': le_candidato,
            'features': list(X.columns),
            'accuracy': accuracy,
            'training_date': datetime.now().isoformat()
        }, model_filename)
        
        # Guardar metadata en base de datos
        self.supabase.table('ml_models').insert({
            'algorithm': algorithm,
            'model_type': model_type,
            'accuracy': accuracy,
            'training_samples': len(X_train),
            'model_path': model_filename,
            'created_at': datetime.now().isoformat()
        }).execute()
        
        return {
            'accuracy': accuracy,
            'training_samples': len(X_train),
            'model_path': model_filename
        }
    
    def predict(self, model_id, features):
        """Hace una predicción con el modelo entrenado"""
        # Cargar modelo
        model_data = joblib.load(f"models/{model_id}.pkl")
        model = model_data['model']
        le = model_data['label_encoder']
        
        # Predecir
        prediction = model.predict([features])[0]
        candidate_id = le.inverse_transform([prediction])[0]
        probabilities = model.predict_proba([features])[0]
        
        return {
            'predicted_candidate': candidate_id,
            'probabilities': probabilities.tolist()
        }
```

### Frontend - Implementación

**Servicio API:**
```typescript
// src/services/trainingService.ts
export const getTrainingStats = async () => {
  const response = await fetch('/api/training/stats');
  return response.json();
};

export const startTraining = async (config: {
  modelType: string;
  algorithm: string;
}) => {
  const response = await fetch('/api/training/train', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  });
  return response.json();
};

export const getTrainingStatus = async (jobId: string) => {
  const response = await fetch(`/api/training/status/${jobId}`);
  return response.json();
};
```

---

## 4. ANÁLISIS

### Objetivo
Analizar tendencias y patrones en los datos electorales.

### Backend - Endpoints Necesarios

```python
# FastAPI Endpoints
GET /api/analysis/stats              # Estadísticas generales
GET /api/analysis/voting-flow        # Flujo de votación por hora
GET /api/analysis/participation      # Tasa de participación
GET /api/analysis/trends             # Tendencias
```

### Backend - Servicio de Análisis (Python)

```python
# backend/services/analysis_service.py
import pandas as pd
from datetime import datetime, timedelta

class AnalysisService:
    def __init__(self):
        self.supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    def get_voting_flow_by_hour(self):
        """Obtiene el flujo de votación por hora"""
        votes_df = pd.read_sql("""
            SELECT 
                DATE_TRUNC('hour', fecha) as hora,
                COUNT(*) as votos
            FROM votes
            WHERE fecha >= CURRENT_DATE
            GROUP BY hora
            ORDER BY hora
        """, self.connection)
        
        return votes_df.to_dict('records')
    
    def get_participation_stats(self):
        """Calcula estadísticas de participación"""
        query = """
            SELECT 
                COUNT(DISTINCT dni) as votantes_activos,
                COUNT(*) as total_votos,
                COUNT(*) * 100.0 / (SELECT COUNT(*) FROM registered_voters) as tasa_participacion
            FROM votes
            WHERE fecha >= CURRENT_DATE
        """
        
        result = self.supabase.rpc('execute_query', {'query': query}).execute()
        return result.data[0]
    
    def get_peak_activity_time(self):
        """Obtiene la hora pico de actividad"""
        votes_df = pd.read_sql("""
            SELECT 
                EXTRACT(HOUR FROM fecha) as hora,
                COUNT(*) as votos
            FROM votes
            WHERE fecha >= CURRENT_DATE
            GROUP BY hora
            ORDER BY votos DESC
            LIMIT 1
        """, self.connection)
        
        if len(votes_df) > 0:
            peak_hour = int(votes_df.iloc[0]['hora'])
            return f"{peak_hour:02d}:00"
        return "N/A"
```

### Frontend - Implementación

**Servicio API:**
```typescript
// src/services/analysisService.ts
export const getAnalysisStats = async () => {
  const response = await fetch('/api/analysis/stats');
  return response.json();
};

export const getVotingFlow = async () => {
  const response = await fetch('/api/analysis/voting-flow');
  return response.json();
};

export const getParticipationStats = async () => {
  const response = await fetch('/api/analysis/participation');
  return response.json();
};
```

---

## Estructura de Base de Datos (Supabase/PostgreSQL)

```sql
-- Tabla de votos
CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    dni VARCHAR(20) NOT NULL,
    candidato_id INTEGER REFERENCES candidates(id),
    fecha TIMESTAMP NOT NULL,
    edad INTEGER,
    educacion VARCHAR(50),
    genero VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de auditoría de NULL
CREATE TABLE null_data_votes (
    id SERIAL PRIMARY KEY,
    vote_id INTEGER REFERENCES votes(id),
    campo_afectado VARCHAR(50),
    valor_original TEXT,
    valor_reemplazado TEXT,
    fecha_reemplazo TIMESTAMP DEFAULT NOW()
);

-- Tabla de modelos ML
CREATE TABLE ml_models (
    id SERIAL PRIMARY KEY,
    algorithm VARCHAR(50),
    model_type VARCHAR(50),
    accuracy DECIMAL(5,4),
    training_samples INTEGER,
    model_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para optimización
CREATE INDEX idx_votes_dni ON votes(dni);
CREATE INDEX idx_votes_fecha ON votes(fecha);
CREATE INDEX idx_votes_candidato ON votes(candidato_id);
```

---

## Pasos de Implementación

### 1. Configurar Backend (FastAPI)

```bash
# Instalar dependencias
pip install fastapi uvicorn pandas scikit-learn supabase python-dotenv

# Estructura de proyecto
backend/
├── main.py
├── services/
│   ├── data_processing.py
│   ├── ml_service.py
│   └── analysis_service.py
├── routers/
│   ├── results.py
│   ├── processing.py
│   ├── training.py
│   └── analysis.py
└── config.py
```

### 2. Configurar Frontend

```bash
# Crear servicios
src/
├── services/
│   ├── resultsService.ts
│   ├── processingService.ts
│   ├── trainingService.ts
│   └── analysisService.ts
└── hooks/
    ├── useResults.ts
    ├── useProcessing.ts
    ├── useTraining.ts
    └── useAnalysis.ts
```

### 3. Variables de Entorno

```env
# .env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
DATABASE_URL=your_database_url
API_BASE_URL=http://localhost:8000
```

---

## Próximos Pasos

1. **Configurar Supabase/PostgreSQL** con las tablas necesarias
2. **Implementar Backend FastAPI** con los endpoints descritos
3. **Crear servicios en Frontend** para conectar con la API
4. **Actualizar componentes** para usar los servicios reales
5. **Implementar WebSockets** para actualizaciones en tiempo real
6. **Agregar manejo de errores** y loading states
7. **Implementar autenticación** y autorización

