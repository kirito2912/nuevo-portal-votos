/**
 * Servicio para manejar las operaciones de votación
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export interface Votante {
  id_votantes: number;
  dni: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  region: string;
  distrito: string;
  fecha_voto?: string;
}

export interface Candidato {
  id: number;
  nombres: string;
  apellidos: string;
  nombre_completo: string;
  cantidad_votos: number;
}

export interface VotanteCreate {
  dni: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  region: string;
  distrito: string;
}

export interface VotanteStatus {
  can_vote_presidencial: boolean;
  can_vote_regional: boolean;
  can_vote_distrital: boolean;
  has_all_votes: boolean;
}

/**
 * Registra un nuevo votante
 */
export const createVotante = async (votante: VotanteCreate): Promise<Votante> => {
  try {
    const response = await fetch(`${API_BASE_URL}/votantes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(votante)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al registrar votante');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating votante:', error);
    throw error;
  }
};

/**
 * Obtiene un votante por DNI
 * Retorna null si no existe (en lugar de lanzar error)
 */
export const getVotanteByDni = async (dni: string): Promise<Votante | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/votantes/${dni}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        // No es un error, simplemente no existe
        return null;
      }
      const error = await response.json();
      throw new Error(error.detail || 'Error al obtener votante');
    }
    
    return await response.json();
  } catch (error) {
    // Solo lanzar error si no es un 404
    if (error instanceof Error && error.message === 'Votante no encontrado') {
      return null;
    }
    console.error('Error fetching votante:', error);
    throw error;
  }
};

/**
 * Obtiene el estado de voto de un votante por DNI
 */
export const getVotanteStatus = async (dni: string): Promise<VotanteStatus> => {
  try {
    const response = await fetch(`${API_BASE_URL}/votantes/${dni}/status`);
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'Error al obtener estado del votante');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching votante status:', error);
    throw error;
  }
};

/**
 * Obtiene todos los candidatos presidenciales
 */
export const getCandidatosPresidenciales = async (): Promise<Candidato[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/candidatos/presidenciales`);
    
    if (!response.ok) {
      throw new Error('Error al obtener candidatos presidenciales');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching candidatos presidenciales:', error);
    throw error;
  }
};

/**
 * Obtiene todos los candidatos regionales
 */
export const getCandidatosRegionales = async (): Promise<Candidato[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/candidatos/regionales`);
    
    if (!response.ok) {
      throw new Error('Error al obtener candidatos regionales');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching candidatos regionales:', error);
    throw error;
  }
};

/**
 * Obtiene todos los candidatos distritales
 */
export const getCandidatosDistritales = async (): Promise<Candidato[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/candidatos/distritales`);
    
    if (!response.ok) {
      throw new Error('Error al obtener candidatos distritales');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching candidatos distritales:', error);
    throw error;
  }
};

/**
 * Registra un voto presidencial
 */
export const createVotoPresidencial = async (
  id_votantes: number,
  id_candidato: number
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/votos/presidencial`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_votantes,
        id_candidato
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al registrar voto');
    }
  } catch (error) {
    console.error('Error creating voto presidencial:', error);
    throw error;
  }
};

/**
 * Registra un voto regional
 */
export const createVotoRegional = async (
  id_votantes: number,
  id_candidato_regional: number,
  region: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/votos/regional`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_votantes,
        id_candidato_regional,
        region
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Error desconocido' }));
      const errorMessage = errorData.detail || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Error creating voto regional:', error);
    throw error;
  }
};

/**
 * Registra un voto distrital
 */
export const createVotoDistrital = async (
  id_votantes: number,
  id_candidato_distrital: number,
  distrito: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/votos/distrital`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_votantes,
        id_candidato_distrital,
        distrito
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Error desconocido' }));
      const errorMessage = errorData.detail || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Error creating voto distrital:', error);
    throw error;
  }
};

/**
 * Registra un voto nulo
 */
export const createVotoNulo = async (
  id_votantes: number,
  dni: string
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/votos/nulo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_votantes,
        dni
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al registrar voto nulo');
    }
  } catch (error) {
    console.error('Error creating voto nulo:', error);
    throw error;
  }
};

