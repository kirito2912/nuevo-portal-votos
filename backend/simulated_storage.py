"""
Sistema de almacenamiento simulado para votos cuando SQL Server no está disponible
Usa archivos JSON para persistencia
"""
import json
import os
from datetime import datetime
from typing import Dict, List, Optional, Any
from pathlib import Path

# Directorio para almacenar los datos simulados
# Usar ruta absoluta o relativa al directorio actual
STORAGE_DIR = Path(__file__).parent / "data_simulated"
STORAGE_DIR.mkdir(parents=True, exist_ok=True)

# Archivos de almacenamiento
VOTOS_PRESIDENCIALES_FILE = STORAGE_DIR / "votos_presidenciales.json"
VOTOS_REGIONALES_FILE = STORAGE_DIR / "votos_regionales.json"
VOTOS_DISTRITALES_FILE = STORAGE_DIR / "votos_distritales.json"
VOTOS_NULOS_FILE = STORAGE_DIR / "votos_nulos.json"
VOTANTES_FILE = STORAGE_DIR / "votantes.json"
CANDIDATOS_PRESIDENCIALES_FILE = STORAGE_DIR / "candidatos_presidenciales.json"
CANDIDATOS_REGIONALES_FILE = STORAGE_DIR / "candidatos_regionales.json"
CANDIDATOS_DISTRITALES_FILE = STORAGE_DIR / "candidatos_distritales.json"

class SimulatedStorage:
    """Almacenamiento simulado en memoria con persistencia JSON"""
    
    def __init__(self):
        self._votos_presidenciales = self._load_json(VOTOS_PRESIDENCIALES_FILE, [])
        self._votos_regionales = self._load_json(VOTOS_REGIONALES_FILE, [])
        self._votos_distritales = self._load_json(VOTOS_DISTRITALES_FILE, [])
        self._votos_nulos = self._load_json(VOTOS_NULOS_FILE, [])
        self._votantes = self._load_json(VOTANTES_FILE, {})
        self._candidatos_presidenciales = self._load_json(CANDIDATOS_PRESIDENCIALES_FILE, {})
        self._candidatos_regionales = self._load_json(CANDIDATOS_REGIONALES_FILE, {})
        self._candidatos_distritales = self._load_json(CANDIDATOS_DISTRITALES_FILE, {})
    
    def _load_json(self, filepath: Path, default: Any) -> Any:
        """Carga datos desde un archivo JSON"""
        try:
            if filepath.exists():
                with open(filepath, 'r', encoding='utf-8') as f:
                    return json.load(f)
        except Exception as e:
            print(f"Error cargando {filepath}: {e}")
        return default if not isinstance(default, dict) else default.copy()
    
    def _save_json(self, filepath: Path, data: Any):
        """Guarda datos en un archivo JSON"""
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False, default=str)
        except Exception as e:
            print(f"Error guardando {filepath}: {e}")
    
    # ========== VOTANTES ==========
    def get_votante(self, id_votantes: int) -> Optional[Dict]:
        """Obtiene un votante por ID"""
        return self._votantes.get(str(id_votantes))
    
    def get_votante_by_dni(self, dni: str) -> Optional[Dict]:
        """Obtiene un votante por DNI"""
        for votante in self._votantes.values():
            if votante.get('dni') == dni:
                return votante
        return None
    
    def update_votante_fecha_voto(self, id_votantes: int, fecha_voto: datetime):
        """Actualiza la fecha de voto de un votante"""
        if str(id_votantes) in self._votantes:
            self._votantes[str(id_votantes)]['fecha_voto'] = fecha_voto.isoformat()
            self._save_json(VOTANTES_FILE, self._votantes)
    
    # ========== CANDIDATOS ==========
    def get_candidato_presidencial(self, id_candidato: int) -> Optional[Dict]:
        """Obtiene un candidato presidencial"""
        return self._candidatos_presidenciales.get(str(id_candidato))
    
    def get_candidato_regional(self, id_candidato: int) -> Optional[Dict]:
        """Obtiene un candidato regional"""
        return self._candidatos_regionales.get(str(id_candidato))
    
    def get_candidato_distrital(self, id_candidato: int) -> Optional[Dict]:
        """Obtiene un candidato distrital"""
        return self._candidatos_distritales.get(str(id_candidato))
    
    def update_candidato_presidencial_votos(self, id_candidato: int, increment: int = 1):
        """Incrementa los votos de un candidato presidencial"""
        if str(id_candidato) in self._candidatos_presidenciales:
            self._candidatos_presidenciales[str(id_candidato)]['cantidad_votos'] = \
                self._candidatos_presidenciales[str(id_candidato)].get('cantidad_votos', 0) + increment
            self._save_json(CANDIDATOS_PRESIDENCIALES_FILE, self._candidatos_presidenciales)
    
    def update_candidato_regional_votos(self, id_candidato: int, increment: int = 1):
        """Incrementa los votos de un candidato regional"""
        if str(id_candidato) in self._candidatos_regionales:
            self._candidatos_regionales[str(id_candidato)]['cantidad_votos'] = \
                self._candidatos_regionales[str(id_candidato)].get('cantidad_votos', 0) + increment
            self._save_json(CANDIDATOS_REGIONALES_FILE, self._candidatos_regionales)
    
    def update_candidato_distrital_votos(self, id_candidato: int, increment: int = 1):
        """Incrementa los votos de un candidato distrital"""
        if str(id_candidato) in self._candidatos_distritales:
            self._candidatos_distritales[str(id_candidato)]['cantidad_votos'] = \
                self._candidatos_distritales[str(id_candidato)].get('cantidad_votos', 0) + increment
            self._save_json(CANDIDATOS_DISTRITALES_FILE, self._candidatos_distritales)
    
    # ========== VOTOS ==========
    def count_votos_presidenciales(self, id_votantes: int) -> int:
        """Cuenta los votos presidenciales de un votante"""
        return sum(1 for v in self._votos_presidenciales if v.get('id_votantes') == id_votantes)
    
    def count_votos_regionales(self, id_votantes: int) -> int:
        """Cuenta los votos regionales de un votante"""
        return sum(1 for v in self._votos_regionales if v.get('id_votantes') == id_votantes)
    
    def count_votos_distritales(self, id_votantes: int) -> int:
        """Cuenta los votos distritales de un votante"""
        return sum(1 for v in self._votos_distritales if v.get('id_votantes') == id_votantes)
    
    def add_voto_presidencial(self, id_votantes: int, id_candidato: int, nombre: str, apellido: str):
        """Agrega un voto presidencial"""
        voto = {
            'id_votantes': id_votantes,
            'id_candidato': id_candidato,
            'nombre': nombre,
            'apellido': apellido,
            'fecha': datetime.now().isoformat()
        }
        self._votos_presidenciales.append(voto)
        self._save_json(VOTOS_PRESIDENCIALES_FILE, self._votos_presidenciales)
    
    def add_voto_regional(self, id_votantes: int, id_candidato_regional: int, nombre: str, apellido: str):
        """Agrega un voto regional"""
        voto = {
            'id_votantes': id_votantes,
            'id_candidato_regional': id_candidato_regional,
            'nombre': nombre,
            'apellido': apellido,
            'fecha': datetime.now().isoformat()
        }
        self._votos_regionales.append(voto)
        self._save_json(VOTOS_REGIONALES_FILE, self._votos_regionales)
    
    def add_voto_distrital(self, id_votantes: int, id_candidato_distrital: int, nombre: str, apellido: str):
        """Agrega un voto distrital"""
        voto = {
            'id_votantes': id_votantes,
            'id_candidato_distrital': id_candidato_distrital,
            'nombre': nombre,
            'apellido': apellido,
            'fecha': datetime.now().isoformat()
        }
        self._votos_distritales.append(voto)
        self._save_json(VOTOS_DISTRITALES_FILE, self._votos_distritales)
    
    def add_voto_nulo(self, id_votantes: int, dni: str):
        """Agrega un voto nulo"""
        voto = {
            'id_votantes': id_votantes,
            'dni': dni,
            'fecha': datetime.now().isoformat()
        }
        self._votos_nulos.append(voto)
        self._save_json(VOTOS_NULOS_FILE, self._votos_nulos)
    
    # ========== LISTADOS ==========
    def get_all_candidatos_presidenciales(self) -> List[Dict]:
        """Obtiene todos los candidatos presidenciales"""
        return list(self._candidatos_presidenciales.values())
    
    def get_all_candidatos_regionales(self) -> List[Dict]:
        """Obtiene todos los candidatos regionales"""
        return list(self._candidatos_regionales.values())
    
    def get_all_candidatos_distritales(self) -> List[Dict]:
        """Obtiene todos los candidatos distritales"""
        return list(self._candidatos_distritales.values())
    
    def get_all_votos_presidenciales(self) -> List[Dict]:
        """Obtiene todos los votos presidenciales"""
        return self._votos_presidenciales.copy()
    
    def get_all_votos_regionales(self) -> List[Dict]:
        """Obtiene todos los votos regionales"""
        return self._votos_regionales.copy()
    
    def get_all_votos_distritales(self) -> List[Dict]:
        """Obtiene todos los votos distritales"""
        return self._votos_distritales.copy()

# Instancia global del almacenamiento simulado
_simulated_storage = None

def get_simulated_storage() -> SimulatedStorage:
    """Obtiene la instancia del almacenamiento simulado"""
    global _simulated_storage
    if _simulated_storage is None:
        _simulated_storage = SimulatedStorage()
    return _simulated_storage

