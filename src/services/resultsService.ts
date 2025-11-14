/**
 * Servicio para manejar las llamadas API de Resultados Electorales
 * 
 * Para implementar:
 * 1. Configurar la URL base de tu API en .env
 * 2. Descomentar las llamadas fetch reales
 * 3. Implementar los endpoints en el backend
 */

// Variable preparada para cuando se implemente el backend
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export interface ResultsStatus {
  hasNullData: boolean;
  nullCount: number;
  naCount: number;
  totalVotes: number;
  lastUpdated: string;
}

export interface ResultsSummary {
  totalVotes: number;
  candidates: Array<{
    id: number;
    name: string;
    votes: number;
    percentage: number;
  }>;
  participationRate: number;
}

/**
 * Obtiene el estado de los datos (NULL/N/A)
 */
export const getResultsStatus = async (): Promise<ResultsStatus> => {
  try {
    // TODO: Descomentar cuando el backend esté listo
    // const response = await fetch(`${API_BASE_URL}/results/status`);
    // if (!response.ok) throw new Error('Error al obtener estado');
    // return await response.json();
    
    // Simulación temporal
    return {
      hasNullData: false,
      nullCount: 0,
      naCount: 15,
      totalVotes: 1247,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching results status:', error);
    throw error;
  }
};

/**
 * Obtiene el resumen de resultados electorales
 */
export const getResultsSummary = async (): Promise<ResultsSummary> => {
  try {
    // TODO: Descomentar cuando el backend esté listo
    // const response = await fetch(`${API_BASE_URL}/results/summary`);
    // if (!response.ok) throw new Error('Error al obtener resumen');
    // return await response.json();
    
    // Simulación temporal
    return {
      totalVotes: 1247,
      candidates: [
        { id: 1, name: 'Candidato A', votes: 450, percentage: 36.1 },
        { id: 2, name: 'Candidato B', votes: 380, percentage: 30.5 },
        { id: 3, name: 'Candidato C', votes: 320, percentage: 25.7 },
        { id: 4, name: 'Otros', votes: 97, percentage: 7.8 }
      ],
      participationRate: 68.5
    };
  } catch (error) {
    console.error('Error fetching results summary:', error);
    throw error;
  }
};

/**
 * Suscribe a actualizaciones en tiempo real (WebSocket)
 */
export const subscribeToRealtimeResults = (
  callback: (data: ResultsSummary) => void
): (() => void) => {
  // TODO: Implementar WebSocket cuando esté listo
  // const ws = new WebSocket(`${WS_BASE_URL}/results/realtime`);
  // ws.onmessage = (event) => {
  //   const data = JSON.parse(event.data);
  //   callback(data);
  // };
  // return () => ws.close();
  
  // Simulación temporal con polling
  const interval = setInterval(async () => {
    const data = await getResultsSummary();
    callback(data);
  }, 30000); // Actualizar cada 30 segundos
  
  return () => clearInterval(interval);
};

