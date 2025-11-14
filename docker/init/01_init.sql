-- Script de inicialización de la base de datos
-- Este archivo se ejecuta automáticamente cuando el contenedor se inicia por primera vez

-- La base de datos 'sistemapos' ya es creada por la variable POSTGRES_DB
-- Aquí puedes agregar configuraciones adicionales si las necesitas

-- Ejemplo: Crear extensiones útiles
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Mensaje de confirmación
DO $$
BEGIN
    RAISE NOTICE 'Base de datos SistemaPos inicializada correctamente';
END $$;
