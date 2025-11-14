import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\StockController::show
* @see app/Http/Controllers/Api/StockController.php:11
* @route '/api/productos/{producto}/stock'
*/
export const show = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/productos/{producto}/stock',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\StockController::show
* @see app/Http/Controllers/Api/StockController.php:11
* @route '/api/productos/{producto}/stock'
*/
show.url = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { producto: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { producto: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            producto: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        producto: typeof args.producto === 'object'
        ? args.producto.id
        : args.producto,
    }

    return show.definition.url
            .replace('{producto}', parsedArgs.producto.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\StockController::show
* @see app/Http/Controllers/Api/StockController.php:11
* @route '/api/productos/{producto}/stock'
*/
show.get = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\StockController::show
* @see app/Http/Controllers/Api/StockController.php:11
* @route '/api/productos/{producto}/stock'
*/
show.head = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\StockController::show
* @see app/Http/Controllers/Api/StockController.php:11
* @route '/api/productos/{producto}/stock'
*/
const showForm = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\StockController::show
* @see app/Http/Controllers/Api/StockController.php:11
* @route '/api/productos/{producto}/stock'
*/
showForm.get = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\StockController::show
* @see app/Http/Controllers/Api/StockController.php:11
* @route '/api/productos/{producto}/stock'
*/
showForm.head = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const StockController = { show }

export default StockController