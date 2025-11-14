/**
 * Servicio para manejar las llamadas API de Entrenamiento ML
 * 
 * Para implementar:
 * 1. Configurar la URL base de tu API en .env
 * 2. Descomentar las llamadas fetch reales
 * 3. Implementar los endpoints en el backend (FastAPI + Scikit-learn)
 */

// Variable preparada para cuando se implemente el backend
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export interface TrainingStats {
  validVotes: number;
  candidates: number;
  features: string[];
  canTrain: boolean;
}

export interface TrainingConfig {
  modelType: 'clasificacion' | 'regresion' | 'clustering';
  algorithm: 'random-forest' | 'svm' | 'neural-network' | 'logistic-regression';
}

export interface TrainingResult {
  jobId: string;
  status: 'pending' | 'training' | 'completed' | 'failed';
  accuracy?: number;
  trainingSamples?: number;
  modelPath?: string;
  message?: string;
}

export interface TrainingStatus {
  jobId: string;
  status: 'pending' | 'training' | 'completed' | 'failed';
  progress?: number;
  accuracy?: number;
  message?: string;
}

/**
 * Obtiene estadísticas de votos válidos para entrenamiento
 */
export const getTrainingStats = async (): Promise<TrainingStats> => {
  try {
    // TODO: Descomentar cuando el backend esté listo
    // const response = await fetch(`${API_BASE_URL}/training/stats`);
    // if (!response.ok) throw new Error('Error al obtener estadísticas');
    // return await response.json();
    
    // Simulación temporal
    const validVotes = 1247;
    return {
      validVotes,
      candidates: 8,
      features: ['Edad', 'Educación', 'Género'],
      canTrain: validVotes >= 10
    };
  } catch (error) {
    console.error('Error fetching training stats:', error);
    throw error;
  }
};

/**
 * Inicia el entrenamiento del modelo
 */
export const startTraining = async (
  _config: TrainingConfig
): Promise<TrainingResult> => {
  try {
    // TODO: Descomentar cuando el backend esté listo
    // const response = await fetch(`${API_BASE_URL}/training/train`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(config)
    // });
    // if (!response.ok) throw new Error('Error al iniciar entrenamiento');
    // return await response.json();
    
    // Simulación temporal
    const jobId = `job_${Date.now()}`;
    
    // Simular entrenamiento asíncrono
    setTimeout(async () => {
      // En producción, esto sería manejado por el backend
      console.log('Training completed (simulated)');
    }, 5000);
    
    return {
      jobId,
      status: 'training',
      message: 'Entrenamiento iniciado'
    };
  } catch (error) {
    console.error('Error starting training:', error);
    return {
      jobId: '',
      status: 'failed',
      message: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
};

/**
 * Obtiene el estado del entrenamiento
 */
export const getTrainingStatus = async (jobId: string): Promise<TrainingStatus> => {
  try {
    // TODO: Descomentar cuando el backend esté listo
    // const response = await fetch(`${API_BASE_URL}/training/status/${jobId}`);
    // if (!response.ok) throw new Error('Error al obtener estado');
    // return await response.json();
    
    // Simulación temporal
    return {
      jobId,
      status: 'completed',
      progress: 100,
      accuracy: 0.945,
      message: 'Entrenamiento completado exitosamente'
    };
  } catch (error) {
    console.error('Error fetching training status:', error);
    throw error;
  }
};

/**
 * Obtiene la lista de modelos entrenados
 */
export const getTrainedModels = async (): Promise<Array<{
  id: number;
  algorithm: string;
  modelType: string;
  accuracy: number;
  trainingSamples: number;
  createdAt: string;
}>> => {
  try {
    // TODO: Descomentar cuando el backend esté listo
    // const response = await fetch(`${API_BASE_URL}/training/models`);
    // if (!response.ok) throw new Error('Error al obtener modelos');
    // return await response.json();
    
    // Simulación temporal
    return [
      {
        id: 1,
        algorithm: 'random-forest',
        modelType: 'clasificacion',
        accuracy: 0.945,
        trainingSamples: 997,
        createdAt: new Date().toISOString()
      }
    ];
  } catch (error) {
    console.error('Error fetching trained models:', error);
    throw error;
  }
};

/**
 * Hace una predicción con un modelo entrenado
 */
export const predict = async (
  _modelId: number,
  _features: { edad: number; educacion: string; genero: string }
): Promise<{
  predictedCandidate: number;
  probabilities: Array<{ candidate: number; probability: number }>;
}> => {
  try {
    // TODO: Descomentar cuando el backend esté listo
    // const response = await fetch(`${API_BASE_URL}/training/predict`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ modelId, features })
    // });
    // if (!response.ok) throw new Error('Error al hacer predicción');
    // return await response.json();
    
    // Simulación temporal
    return {
      predictedCandidate: 1,
      probabilities: [
        { candidate: 1, probability: 0.65 },
        { candidate: 2, probability: 0.25 },
        { candidate: 3, probability: 0.10 }
      ]
    };
  } catch (error) {
    console.error('Error making prediction:', error);
    throw error;
  }
};

