<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProveedorController;

Route::apiResource('proveedores', ProveedorController::class)
	->parameters(['proveedores' => 'proveedor'])
	->names([
		'index' => 'api.proveedores.index',
		'store' => 'api.proveedores.store',
		'show' => 'api.proveedores.show',
		'update' => 'api.proveedores.update',
		'destroy' => 'api.proveedores.destroy',
	]);

Route::apiResource('productos', \App\Http\Controllers\Api\ProductoController::class)
	->parameters(['productos' => 'producto'])
	->names([
		'index' => 'api.productos.index',
		'store' => 'api.productos.store',
		'show' => 'api.productos.show',
		'update' => 'api.productos.update',
		'destroy' => 'api.productos.destroy',
	]);

Route::post('stock/movimientos', [\App\Http\Controllers\Api\StockMovimientoController::class, 'store']);
Route::get('productos/{producto}/stock', [\App\Http\Controllers\Api\StockController::class, 'show']);
Route::post('pos/ventas', [\App\Http\Controllers\Api\PosController::class, 'store']);
Route::post('pos/ventas/{venta}/devoluciones', [\App\Http\Controllers\Api\DevolucionController::class, 'store']);
Route::post('factus/invoices', [\App\Http\Controllers\Api\FactusController::class, 'store']);
