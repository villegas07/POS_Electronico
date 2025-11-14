#!/bin/bash

echo "═══════════════════════════════════════════════════════════════"
echo "     �� TEST SYSTEM - Sistema POS Colombia + Factus"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check Docker
echo "📦 Verificando Docker..."
if docker ps -q --filter "name=sistemapus" > /dev/null 2>&1; then
    echo "✅ Docker Container activo"
else
    echo "❌ Docker Container no está corriendo. Inicia: docker-compose up -d"
fi

echo ""
echo "🗄️  Verificando Database..."
php artisan tinker --execute="echo \App\Models\Proveedor::count() . ' Proveedores encontrados';"

echo ""
echo "📝 Comprobando assets compilados..."
if [ -f "public/build/manifest.json" ]; then
    echo "✅ Assets compilados: $(ls public/build/assets/ | wc -l) archivos"
else
    echo "❌ Assets no compilados. Ejecuta: npm run build"
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "🎯 Próximos pasos:"
echo ""
echo "1. Iniciar servidor:"
echo "   php artisan serve"
echo ""
echo "2. Abrir en navegador:"
echo "   http://localhost:8000/login"
echo ""
echo "3. Credenciales de prueba:"
echo "   Email: test@example.com"
echo "   Password: password"
echo ""
echo "4. Navegar a las páginas:"
echo "   - Dashboard: /dashboard"
echo "   - POS: /pos"
echo "   - Productos: /productos"
echo "   - Proveedores: /proveedores"
echo ""
echo "═══════════════════════════════════════════════════════════════"
