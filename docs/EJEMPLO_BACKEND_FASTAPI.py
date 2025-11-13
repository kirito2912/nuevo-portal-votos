"""
Ejemplo de implementación Backend con FastAPI
Este archivo muestra cómo implementar los endpoints para el panel administrativo
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
from supabase import create_client
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Sistema Electoral API")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurar Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ============================================================================
# 1. RESULTADOS ELECTORALES
# ============================================================================

@app.get("/api/results/status")
async def get_results_status():
    """Obtiene el estado de los datos (NULL/N/A)"""
    try:
        # Consultar votos con NULL
        null_query = supabase.table("votes").select("id").or_("dni.is.null,candidato_id.is.null,fecha.is.null")
        null_result = null_query.execute()
        null_count = len(null_result.data) if null_result.data else 0
        
        # Consultar votos con N/A
        na_query = supabase.table("votes").select("id").or_("dni.eq.N/A,candidato_id.eq.N/A")
        na_result = na_query.execute()
        na_count = len(na_result.data) if na_result.data else 0
        
        # Total de votos
        total_query = supabase.table("votes").select("id", count="exact")
        total_result = total_query.execute()
        total_votes = total_result.count if total_result.count else 0
        
        return {
            "hasNullData": null_count > 0,
            "nullCount": null_count,
            "naCount": na_count,
            "totalVotes": total_votes,
            "lastUpdated": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/results/summary")
async def get_results_summary():
    """Obtiene el resumen de resultados electorales"""
    try:
        # Obtener votos por candidato
        votes_query = supabase.table("votes").select("candidato_id").execute()
        
        # Contar votos por candidato
        candidate_counts = {}
        for vote in votes_query.data:
            candidate_id = vote.get("candidato_id")
            if candidate_id and candidate_id != "N/A":
                candidate_counts[candidate_id] = candidate_counts.get(candidate_id, 0) + 1
        
        total_votes = sum(candidate_counts.values())
        
        # Obtener información de candidatos
        candidates_query = supabase.table("candidates").select("id,nombre").execute()
        candidates_dict = {c["id"]: c["nombre"] for c in candidates_query.data}
        
        # Formatear resultados
        results = []
        for candidate_id, votes in candidate_counts.items():
            results.append({
                "id": candidate_id,
                "name": candidates_dict.get(candidate_id, f"Candidato {candidate_id}"),
                "votes": votes,
                "percentage": round((votes / total_votes * 100), 2) if total_votes > 0 else 0
            })
        
        # Calcular tasa de participación (simplificado)
        registered_voters = 1800000  # Esto debería venir de la BD
        participation_rate = round((total_votes / registered_voters * 100), 2) if registered_voters > 0 else 0
        
        return {
            "totalVotes": total_votes,
            "candidates": sorted(results, key=lambda x: x["votes"], reverse=True),
            "participationRate": participation_rate
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# 2. PROCESAMIENTO DE DATOS
# ============================================================================

@app.post("/api/processing/analyze-quality")
async def analyze_quality():
    """Analiza la calidad de los datos"""
    try:
        # Obtener todos los votos
        votes_query = supabase.table("votes").select("*").execute()
        votes_df = pd.DataFrame(votes_query.data)
        
        if votes_df.empty:
            return {
                "totalRecords": 0,
                "nullCounts": {},
                "duplicateCount": 0,
                "dataTypes": {}
            }
        
        # Analizar NULLs
        null_counts = votes_df.isnull().sum().to_dict()
        
        # Analizar duplicados
        duplicate_count = votes_df.duplicated(subset=["dni", "candidato_id", "fecha"]).sum()
        
        # Tipos de datos
        data_types = {col: str(dtype) for col, dtype in votes_df.dtypes.items()}
        
        return {
            "totalRecords": len(votes_df),
            "nullCounts": null_counts,
            "duplicateCount": int(duplicate_count),
            "dataTypes": data_types
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/processing/replace-null")
async def replace_null():
    """Reemplaza valores NULL con 'N/A'"""
    try:
        # Obtener votos con NULL
        votes_query = supabase.table("votes").select("*").execute()
        votes_df = pd.DataFrame(votes_query.data)
        
        if votes_df.empty:
            return {"status": "success", "message": "No hay datos para procesar", "affectedRecords": 0}
        
        # Identificar registros con NULL
        null_mask = votes_df.isnull().any(axis=1)
        null_records = votes_df[null_mask].copy()
        affected_count = len(null_records)
        
        # Reemplazar NULL con 'N/A'
        votes_df = votes_df.fillna("N/A")
        
        # Actualizar en Supabase (actualizar registro por registro)
        for _, record in votes_df.iterrows():
            supabase.table("votes").update(record.to_dict()).eq("id", record["id"]).execute()
        
        # Registrar auditoría
        for _, record in null_records.iterrows():
            supabase.table("null_data_votes").insert({
                "vote_id": record.get("id"),
                "campo_afectado": "multiple",
                "valor_original": None,
                "valor_reemplazado": "N/A",
                "fecha_reemplazo": datetime.now().isoformat()
            }).execute()
        
        return {
            "status": "success",
            "message": "NULL reemplazados exitosamente",
            "affectedRecords": affected_count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/processing/remove-duplicates")
async def remove_duplicates():
    """Elimina registros duplicados"""
    try:
        votes_query = supabase.table("votes").select("*").execute()
        votes_df = pd.DataFrame(votes_query.data)
        
        if votes_df.empty:
            return {"status": "success", "message": "No hay datos", "affectedRecords": 0, "remainingRecords": 0}
        
        initial_count = len(votes_df)
        
        # Eliminar duplicados (mantener el primero)
        votes_df = votes_df.drop_duplicates(subset=["dni", "candidato_id", "fecha"], keep="first")
        final_count = len(votes_df)
        removed_count = initial_count - final_count
        
        # Actualizar en Supabase (eliminar duplicados)
        if removed_count > 0:
            # Obtener IDs de duplicados
            duplicates = votes_df.duplicated(subset=["dni", "candidato_id", "fecha"], keep="first")
            duplicate_ids = votes_df[duplicates]["id"].tolist()
            
            # Eliminar duplicados
            for dup_id in duplicate_ids:
                supabase.table("votes").delete().eq("id", dup_id).execute()
        
        return {
            "status": "success",
            "message": "Duplicados eliminados exitosamente",
            "affectedRecords": removed_count,
            "remainingRecords": final_count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/processing/normalize")
async def normalize_data():
    """Normaliza los datos"""
    try:
        votes_query = supabase.table("votes").select("*").execute()
        votes_df = pd.DataFrame(votes_query.data)
        
        if votes_df.empty:
            return {"status": "success", "message": "No hay datos", "affectedRecords": 0}
        
        # Normalizar DNI (solo números)
        if "dni" in votes_df.columns:
            votes_df["dni"] = votes_df["dni"].astype(str).str.replace(r"[^0-9]", "", regex=True)
        
        # Normalizar nombres (title case)
        if "nombre" in votes_df.columns:
            votes_df["nombre"] = votes_df["nombre"].str.title()
        
        # Actualizar en Supabase
        for _, record in votes_df.iterrows():
            supabase.table("votes").update(record.to_dict()).eq("id", record["id"]).execute()
        
        return {
            "status": "success",
            "message": "Datos normalizados exitosamente",
            "affectedRecords": len(votes_df)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/processing/status")
async def get_processing_status():
    """Obtiene el estado actual del procesamiento"""
    try:
        votes_query = supabase.table("votes").select("id").or_("dni.eq.N/A,candidato_id.eq.N/A").execute()
        has_na_data = len(votes_query.data) > 0 if votes_query.data else False
        
        total_query = supabase.table("votes").select("id", count="exact").execute()
        vote_count = total_query.count if total_query.count else 0
        
        return {
            "voteCount": vote_count,
            "hasNAData": has_na_data,
            "lastProcessed": datetime.now().isoformat(),
            "processingHistory": []
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# 3. ENTRENAMIENTO ML
# ============================================================================

@app.get("/api/training/stats")
async def get_training_stats():
    """Obtiene estadísticas de votos válidos para entrenamiento"""
    try:
        # Filtrar votos válidos
        valid_query = supabase.table("votes").select("id,candidato_id").neq("dni", "N/A").neq("candidato_id", "N/A").not_.is_("fecha", "null").execute()
        
        valid_votes = len(valid_query.data) if valid_query.data else 0
        
        # Contar candidatos únicos
        if valid_query.data:
            unique_candidates = set(vote.get("candidato_id") for vote in valid_query.data if vote.get("candidato_id"))
            candidates_count = len(unique_candidates)
        else:
            candidates_count = 0
        
        return {
            "validVotes": valid_votes,
            "candidates": candidates_count,
            "features": ["Edad", "Educación", "Género"],
            "canTrain": valid_votes >= 10
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class TrainingConfig(BaseModel):
    modelType: str
    algorithm: str

@app.post("/api/training/train")
async def start_training(config: TrainingConfig, background_tasks: BackgroundTasks):
    """Inicia el entrenamiento del modelo"""
    try:
        # Verificar que hay suficientes datos
        stats = await get_training_stats()
        if not stats["canTrain"]:
            raise HTTPException(status_code=400, detail="Se requieren al menos 10 votos válidos")
        
        job_id = f"job_{datetime.now().timestamp()}"
        
        # Aquí iría la lógica de entrenamiento real con scikit-learn
        # Por ahora retornamos el job_id
        return {
            "jobId": job_id,
            "status": "training",
            "message": "Entrenamiento iniciado"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/training/status/{job_id}")
async def get_training_status(job_id: str):
    """Obtiene el estado del entrenamiento"""
    try:
        # Aquí consultarías el estado real del job
        return {
            "jobId": job_id,
            "status": "completed",
            "progress": 100,
            "accuracy": 0.945,
            "message": "Entrenamiento completado exitosamente"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# 4. ANÁLISIS
# ============================================================================

@app.get("/api/analysis/stats")
async def get_analysis_stats():
    """Obtiene estadísticas generales de análisis"""
    try:
        # Obtener votos del día
        today = datetime.now().date().isoformat()
        votes_query = supabase.table("votes").select("id,dni").gte("fecha", today).execute()
        
        total_votes = len(votes_query.data) if votes_query.data else 0
        unique_voters = len(set(vote.get("dni") for vote in votes_query.data if vote.get("dni"))) if votes_query.data else 0
        
        # Calcular hora pico (simplificado)
        peak_activity_time = "14:30"  # Esto debería calcularse desde los datos
        
        # Tasa de participación (simplificado)
        registered_voters = 1800000
        participation_rate = round((total_votes / registered_voters * 100), 2) if registered_voters > 0 else 0
        
        return {
            "activeVoters": unique_voters,
            "participationRate": participation_rate,
            "peakActivityTime": peak_activity_time,
            "totalVotes": total_votes
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/analysis/voting-flow")
async def get_voting_flow():
    """Obtiene el flujo de votación por hora"""
    try:
        # Obtener votos del día agrupados por hora
        today = datetime.now().date().isoformat()
        votes_query = supabase.table("votes").select("fecha").gte("fecha", today).execute()
        
        # Procesar y agrupar por hora (simplificado)
        # En producción, esto se haría con una consulta SQL más eficiente
        flow_data = [
            {"hour": "08:00", "votes": 1200},
            {"hour": "09:00", "votes": 3400},
            {"hour": "10:00", "votes": 5600},
            {"hour": "11:00", "votes": 7800},
            {"hour": "12:00", "votes": 9200},
            {"hour": "13:00", "votes": 8500},
            {"hour": "14:00", "votes": 11000},
            {"hour": "15:00", "votes": 9800},
            {"hour": "16:00", "votes": 7600},
            {"hour": "17:00", "votes": 5400}
        ]
        
        return flow_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

