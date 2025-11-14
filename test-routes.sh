#!/bin/bash

echo "🧪 Probando rutas de Inertia..."
echo ""

# Test login page
echo "1️⃣ Probando /login (sin auth)..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/login)
if [ "$STATUS" = "200" ]; then
    echo "   ✅ /login responde correctamente (200)"
else
    echo "   ❌ /login devuelve: $STATUS"
fi

# Test dashboard (should redirect to login)
echo ""
echo "2️⃣ Probando /dashboard (protegida, sin auth)..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/dashboard)
if [ "$STATUS" = "302" ]; then
    echo "   ✅ /dashboard redirige correctamente (302)"
else
    echo "   ⚠️  /dashboard devuelve: $STATUS"
fi

# Test productos (should redirect to login)
echo ""
echo "3️⃣ Probando /productos (protegida, sin auth)..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/productos)
if [ "$STATUS" = "302" ]; then
    echo "   ✅ /productos redirige a login (302)"
else
    echo "   ⚠️  /productos devuelve: $STATUS"
fi

# Test proveedores (should redirect to login)
echo ""
echo "4️⃣ Probando /proveedores (protegida, sin auth)..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/proveedores)
if [ "$STATUS" = "302" ]; then
    echo "   ✅ /proveedores redirige a login (302)"
else
    echo "   ⚠️  /proveedores devuelve: $STATUS"
fi

# Check if routes exist
echo ""
echo "5️⃣ Verificando rutas en Laravel..."
cd /home/brayan/SistemaPos
if php artisan route:list | grep -q "productos.*index"; then
    echo "   ✅ Ruta 'productos.index' existe"
else
    echo "   ❌ Ruta 'productos.index' NO existe"
fi

if php artisan route:list | grep -q "proveedores.*index"; then
    echo "   ✅ Ruta 'proveedores.index' existe"
else
    echo "   ❌ Ruta 'proveedores.index' NO existe"
fi

# Check manifest
echo ""
echo "6️⃣ Verificando manifest de Vite..."
if grep -q "productos.tsx" /home/brayan/SistemaPos/public/build/manifest.json; then
    echo "   ✅ productos.tsx en manifest"
else
    echo "   ❌ productos.tsx NO está en manifest"
fi

if grep -q "proveedores.tsx" /home/brayan/SistemaPos/public/build/manifest.json; then
    echo "   ✅ proveedores.tsx en manifest"
else
    echo "   ❌ proveedores.tsx NO está en manifest"
fi

echo ""
echo "══════════════════════════════════════════════════════════"
echo "📝 INSTRUCCIONES PARA PROBAR:"
echo "══════════════════════════════════════════════════════════"
echo "1. Abre http://localhost:8000 en tu navegador"
echo "2. Inicia sesión con: admin@pos.com / admin123"
echo "3. Navega a /productos"
echo "4. Navega a /proveedores"
echo ""
echo "Si ves 404 después de iniciar sesión, presiona Ctrl+Shift+R"
echo "para hacer un hard refresh del navegador."
echo "══════════════════════════════════════════════════════════"
