import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\DevolucionController::store
* @see app/Http/Controllers/Api/DevolucionController.php:16
* @route '/api/pos/ventas/{venta}/devoluciones'
*/
export const store = (args: { venta: number | { id: number } } | [venta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/pos/ventas/{venta}/devoluciones',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\DevolucionController::store
* @see app/Http/Controllers/Api/DevolucionController.php:16
* @route '/api/pos/ventas/{venta}/devoluciones'
*/
store.url = (args: { venta: number | { id: number } } | [venta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { venta: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { venta: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            venta: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        venta: typeof args.venta === 'object'
        ? args.venta.id
        : args.venta,
    }

    return store.definition.url
            .replace('{venta}', parsedArgs.venta.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\DevolucionController::store
* @see app/Http/Controllers/Api/DevolucionController.php:16
* @route '/api/pos/ventas/{venta}/devoluciones'
*/
store.post = (args: { venta: number | { id: number } } | [venta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\DevolucionController::store
* @see app/Http/Controllers/Api/DevolucionController.php:16
* @route '/api/pos/ventas/{venta}/devoluciones'
*/
const storeForm = (args: { venta: number | { id: number } } | [venta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\DevolucionController::store
* @see app/Http/Controllers/Api/DevolucionController.php:16
* @route '/api/pos/ventas/{venta}/devoluciones'
*/
storeForm.post = (args: { venta: number | { id: number } } | [venta: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

const DevolucionController = { store }

export default DevolucionController