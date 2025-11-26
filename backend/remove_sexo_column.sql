-- Script para eliminar la columna SEXO de la tabla VOTANTES
-- Ejecutar este script en SQL Server Management Studio o en tu cliente SQL

USE SISTEMA_ELECTORAL;
GO

-- Eliminar la columna SEXO de la tabla VOTANTES
ALTER TABLE VOTANTES
DROP COLUMN SEXO;
GO

-- Verificar que la columna fue eliminada
SELECT COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'VOTANTES'
ORDER BY ORDINAL_POSITION;
GO

