# 📋 Flujo de Votación - Explicación

## ✅ Flujo Actual (CORRECTO)

### 1. Ingreso de Datos del Votante
- **NO se guarda en la base de datos todavía**
- Solo se valida localmente:
  - DNI tiene 8 dígitos
  - Edad mayor a 18 años
  - Todos los campos completos
- Si todo está bien, se muestra la pantalla de candidatos

### 2. Selección de Candidato
- El usuario ve los candidatos cargados desde la base de datos
- Selecciona un candidato y hace clic en "Votar"
- Se abre un modal de confirmación

### 3. Confirmación del Voto (AQUÍ SE GUARDA TODO)
Cuando el usuario confirma su voto, se ejecuta `handleConfirmVote()`:

**PASO 1: Verificar/Crear Votante**
```typescript
// Intenta buscar el votante por DNI
try {
  const votanteExistente = await getVotanteByDni(voterDni);
  // Si existe y ya votó, muestra error
  if (votanteExistente.fecha_voto) {
    throw new Error("Ya votó");
  }
  votanteId = votanteExistente.id_votantes;
} catch (error) {
  // Si NO existe, lo CREA en la BD
  const nuevoVotante = await createVotante({
    dni: voterDni,
    nombres: voterName,
    apellidos: voterApellidos,
    fecha_nacimiento: voterFechaNacimiento,
    region: voterRegion,
    distrito: voterDistrito,
    sexo: voterSexo
  });
  votanteId = nuevoVotante.id_votantes;
}
```

**PASO 2: Registrar el Voto**
```typescript
// Guarda el voto en la BD
if (activeCategory === 'presidencial') {
  await createVotoPresidencial(votanteId, selectedCandidate.id);
}
```

## 🎯 Resumen

✅ **Al ingresar datos:** Solo validación, NO se guarda
✅ **Al votar:** Se guarda el votante (si no existe) Y el voto
✅ **Todo se guarda en SQL Server** cuando confirmas el voto

## 📝 Tablas Afectadas

Cuando votas, se actualizan estas tablas:
1. `VOTANTES` - Se crea/actualiza el registro del votante
2. `VOTO_PRESIDENCIAL` / `VOTO_REGIONAL` / `VOTO_DISTRITAL` - Se crea el voto
3. `CANDIDATO_PRESIDENCIAL` / etc. - Se actualiza `CANTIDAD_VOTOS`

## 🔍 Verificación

Para verificar que todo funciona:
1. Ingresa tus datos (NO se guarda)
2. Selecciona un candidato
3. Confirma el voto
4. Verifica en SQL Server:
   ```sql
   SELECT * FROM VOTANTES WHERE DNI = 'tu_dni';
   SELECT * FROM VOTO_PRESIDENCIAL WHERE ID_VOTANTES = (SELECT ID_VOTANTES FROM VOTANTES WHERE DNI = 'tu_dni');
   ```

