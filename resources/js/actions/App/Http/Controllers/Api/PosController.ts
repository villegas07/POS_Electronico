import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\PosController::store
* @see app/Http/Controllers/Api/PosController.php:17
* @route '/api/pos/ventas'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/pos/ventas',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\PosController::store
* @see app/Http/Controllers/Api/PosController.php:17
* @route '/api/pos/ventas'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\PosController::store
* @see app/Http/Controllers/Api/PosController.php:17
* @route '/api/pos/ventas'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\PosController::store
* @see app/Http/Controllers/Api/PosController.php:17
* @route '/api/pos/ventas'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\PosController::store
* @see app/Http/Controllers/Api/PosController.php:17
* @route '/api/pos/ventas'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const PosController = { store }

export default PosController