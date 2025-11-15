<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // POS and management pages
    Route::get('pos', function () {
        return Inertia::render('pos');
    })->name('pos');

    Route::get('productos', function () {
        return Inertia::render('productos');
    })->name('productos');

    Route::get('proveedores', function () {
        return Inertia::render('proveedores');
    })->name('proveedores');

    Route::get('clientes', function () {
        return Inertia::render('clientes');
    })->name('clientes');

    Route::get('facturas', function () {
        return Inertia::render('facturas');
    })->name('facturas');

    Route::get('factus-settings', function () {
        return Inertia::render('factus-settings');
    })->name('factus-settings');

    Route::get('test', function () {
        return Inertia::render('test');
    })->name('test');

    Route::get('caja', function () {
        return Inertia::render('caja');
    })->name('caja');

    Route::get('caja/{id}', function ($id) {
        return Inertia::render('caja/show', ['id' => $id]);
    })->name('caja.show');

    // API routes for Caja
    Route::post('api/cajas/abrir', [\App\Http\Controllers\Api\CajaController::class, 'abrir'])->name('api.cajas.abrir');
    Route::get('api/cajas/activa', [\App\Http\Controllers\Api\CajaController::class, 'cajaActiva'])->name('api.cajas.activa');
    Route::post('api/cajas/{caja}/cerrar', [\App\Http\Controllers\Api\CajaController::class, 'cerrar'])->name('api.cajas.cerrar');
    Route::get('api/cajas/{caja}/resumen', [\App\Http\Controllers\Api\CajaController::class, 'resumen'])->name('api.cajas.resumen');
    Route::post('api/cajas/{caja}/movimientos', [\App\Http\Controllers\Api\CajaController::class, 'registrarMovimiento'])->name('api.cajas.movimientos');
    Route::get('api/cajas', [\App\Http\Controllers\Api\CajaController::class, 'index'])->name('api.cajas.index');
    Route::get('api/cajas/{caja}', [\App\Http\Controllers\Api\CajaController::class, 'show'])->name('api.cajas.show');
});

require __DIR__.'/settings.php';
