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

    Route::get('test', function () {
        return Inertia::render('test');
    })->name('test');
});

require __DIR__.'/settings.php';
