import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\FactusController::store
* @see app/Http/Controllers/Api/FactusController.php:25
* @route '/api/factus/invoices'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/factus/invoices',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\FactusController::store
* @see app/Http/Controllers/Api/FactusController.php:25
* @route '/api/factus/invoices'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FactusController::store
* @see app/Http/Controllers/Api/FactusController.php:25
* @route '/api/factus/invoices'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\FactusController::store
* @see app/Http/Controllers/Api/FactusController.php:25
* @route '/api/factus/invoices'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\FactusController::store
* @see app/Http/Controllers/Api/FactusController.php:25
* @route '/api/factus/invoices'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const FactusController = { store }

export default FactusController