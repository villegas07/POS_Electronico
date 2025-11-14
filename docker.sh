#!/bin/bash

# Script para gestionar Docker Compose del proyecto SistemaPos

case "$1" in
    up)
        echo "🚀 Iniciando contenedor PostgreSQL..."
        docker compose up -d
        echo "⏳ Esperando a que PostgreSQL esté listo..."
        sleep 5
        docker compose ps
        echo "✅ PostgreSQL está corriendo en localhost:5432"
        echo ""
        echo "📝 Para usar PostgreSQL, ejecuta:"
        echo "   ./docker.sh use-postgres"
        ;;
    
    down)
        echo "🛑 Deteniendo contenedor PostgreSQL..."
        docker compose down
        echo "✅ Contenedor detenido"
        ;;
    
    restart)
        echo "🔄 Reiniciando contenedor PostgreSQL..."
        docker compose restart
        echo "✅ Contenedor reiniciado"
        ;;
    
    logs)
        echo "📋 Mostrando logs de PostgreSQL..."
        docker compose logs -f postgres
        ;;
    
    status)
        echo "📊 Estado de los contenedores:"
        docker compose ps
        ;;
    
    use-postgres)
        echo "🔄 Cambiando a PostgreSQL (Docker)..."
        cp .env.docker .env
        php artisan config:clear
        php artisan cache:clear
        echo "✅ Configuración cambiada a PostgreSQL"
        echo ""
        echo "🔧 Ahora ejecuta las migraciones:"
        echo "   php artisan migrate:fresh --seed"
        ;;
    
    use-sqlite)
        echo "🔄 Cambiando a SQLite..."
        cp .env.sqlite .env
        php artisan config:clear
        php artisan cache:clear
        echo "✅ Configuración cambiada a SQLite"
        ;;
    
    migrate)
        echo "🔧 Ejecutando migraciones..."
        php artisan migrate:fresh --seed
        echo "✅ Migraciones completadas"
        ;;
    
    psql)
        echo "🐘 Conectando a PostgreSQL..."
        docker compose exec postgres psql -U postgres -d sistemapos
        ;;
    
    reset)
        echo "⚠️  Eliminando todos los datos y volúmenes..."
        read -p "¿Estás seguro? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            docker compose down -v
            echo "✅ Datos eliminados"
        else
            echo "❌ Operación cancelada"
        fi
        ;;
    
    *)
        echo "🐳 Gestión de Docker para SistemaPos"
        echo ""
        echo "Uso: ./docker.sh [comando]"
        echo ""
        echo "Comandos disponibles:"
        echo "  up              - Iniciar PostgreSQL en Docker"
        echo "  down            - Detener PostgreSQL"
        echo "  restart         - Reiniciar PostgreSQL"
        echo "  logs            - Ver logs de PostgreSQL"
        echo "  status          - Ver estado de contenedores"
        echo "  use-postgres    - Cambiar configuración a PostgreSQL"
        echo "  use-sqlite      - Cambiar configuración a SQLite"
        echo "  migrate         - Ejecutar migraciones"
        echo "  psql            - Conectar a PostgreSQL (CLI)"
        echo "  reset           - Eliminar todos los datos (⚠️  peligroso)"
        echo ""
        echo "Ejemplo de uso completo:"
        echo "  ./docker.sh up              # Iniciar Docker"
        echo "  ./docker.sh use-postgres    # Cambiar a PostgreSQL"
        echo "  ./docker.sh migrate         # Correr migraciones"
        ;;
esac
