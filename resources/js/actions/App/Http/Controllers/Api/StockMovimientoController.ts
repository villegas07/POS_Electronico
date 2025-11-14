import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\StockMovimientoController::store
* @see app/Http/Controllers/Api/StockMovimientoController.php:15
* @route '/api/stock/movimientos'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/stock/movimientos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\StockMovimientoController::store
* @see app/Http/Controllers/Api/StockMovimientoController.php:15
* @route '/api/stock/movimientos'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StockMovimientoController::store
* @see app/Http/Controllers/Api/StockMovimientoController.php:15
* @route '/api/stock/movimientos'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\StockMovimientoController::store
* @see app/Http/Controllers/Api/StockMovimientoController.php:15
* @route '/api/stock/movimientos'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\StockMovimientoController::store
* @see app/Http/Controllers/Api/StockMovimientoController.php:15
* @route '/api/stock/movimientos'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const StockMovimientoController = { store }

export default StockMovimientoController