<?php

require 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

// Create authenticated request
$user = App\Models\User::first();

if (!$user) {
    echo "❌ No hay usuarios. Creando uno...\n";
    $user = App\Models\User::create([
        'name' => 'Test User',
        'email' => 'test@pos.com',
        'password' => Hash::make('password'),
        'email_verified_at' => now(),
    ]);
    echo "✅ Usuario creado: {$user->email}\n\n";
}

// Test productos route
echo "=== Testing /productos ===\n";
$request = Illuminate\Http\Request::create('/productos', 'GET');
$request->setUserResolver(fn() => $user);

try {
    // Manually authenticate
    Auth::login($user);
    $response = $kernel->handle($request);
    
    echo "Status: {$response->status()}\n";
    echo "Content-Type: {$response->headers->get('Content-Type')}\n";
    
    $content = $response->getContent();
    if (strpos($content, 'data-page') !== false) {
        // Extract Inertia page component
        preg_match('/"component":"([^"]+)"/', $content, $matches);
        if (isset($matches[1])) {
            echo "✅ Inertia Component: {$matches[1]}\n";
        }
    } else {
        echo "❌ No Inertia data found\n";
        echo "Content preview: " . substr($content, 0, 200) . "...\n";
    }
} catch (Exception $e) {
    echo "❌ Error: {$e->getMessage()}\n";
    echo "File: {$e->getFile()}:{$e->getLine()}\n";
}

echo "\n=== Testing /proveedores ===\n";
$request2 = Illuminate\Http\Request::create('/proveedores', 'GET');
$request2->setUserResolver(fn() => $user);

try {
    $response2 = $kernel->handle($request2);
    
    echo "Status: {$response2->status()}\n";
    echo "Content-Type: {$response2->headers->get('Content-Type')}\n";
    
    $content2 = $response2->getContent();
    if (strpos($content2, 'data-page') !== false) {
        preg_match('/"component":"([^"]+)"/', $content2, $matches2);
        if (isset($matches2[1])) {
            echo "✅ Inertia Component: {$matches2[1]}\n";
        }
    } else {
        echo "❌ No Inertia data found\n";
        echo "Content preview: " . substr($content2, 0, 200) . "...\n";
    }
} catch (Exception $e) {
    echo "❌ Error: {$e->getMessage()}\n";
    echo "File: {$e->getFile()}:{$e->getLine()}\n";
}

echo "\n=== Component Files Check ===\n";
$productosFile = 'resources/js/pages/productos.tsx';
$proveedoresFile = 'resources/js/pages/proveedores.tsx';

echo "productos.tsx exists: " . (file_exists($productosFile) ? "✅ YES" : "❌ NO") . "\n";
echo "proveedores.tsx exists: " . (file_exists($proveedoresFile) ? "✅ YES" : "❌ NO") . "\n";

// Check manifest
$manifest = json_decode(file_get_contents('public/build/manifest.json'), true);
$productosInManifest = isset($manifest['resources/js/pages/productos.tsx']);
$proveedoresInManifest = isset($manifest['resources/js/pages/proveedores.tsx']);

echo "productos in manifest: " . ($productosInManifest ? "✅ YES" : "❌ NO") . "\n";
echo "proveedores in manifest: " . ($proveedoresInManifest ? "✅ YES" : "❌ NO") . "\n";
