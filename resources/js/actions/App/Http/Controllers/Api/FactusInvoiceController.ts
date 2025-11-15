import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\FactusInvoiceController::index
* @see app/Http/Controllers/Api/FactusInvoiceController.php:27
* @route '/api/facturas'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/facturas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\FactusInvoiceController::index
* @see app/Http/Controllers/Api/FactusInvoiceController.php:27
* @route '/api/facturas'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FactusInvoiceController::index
* @see app/Http/Controllers/Api/FactusInvoiceController.php:27
* @route '/api/facturas'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\FactusInvoiceController::index
* @see app/Http/Controllers/Api/FactusInvoiceController.php:27
* @route '/api/facturas'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\FactusInvoiceController::index
* @see app/Http/Controllers/Api/FactusInvoiceController.php:27
* @route '/api/facturas'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\FactusInvoiceController::index
* @see app/Http/Controllers/Api/FactusInvoiceController.php:27
* @route '/api/facturas'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\FactusInvoiceController::index
* @see app/Http/Controllers/Api/FactusInvoiceController.php:27
* @route '/api/facturas'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Api\FactusInvoiceController::show
* @see app/Http/Controllers/Api/FactusInvoiceController.php:61
* @route '/api/facturas/{factura}'
*/
export const show = (args: { factura: string | number } | [factura: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/facturas/{factura}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\FactusInvoiceController::show
* @see app/Http/Controllers/Api/FactusInvoiceController.php:61
* @route '/api/facturas/{factura}'
*/
show.url = (args: { factura: string | number } | [factura: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { factura: args }
    }

    if (Array.isArray(args)) {
        args = {
            factura: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        factura: args.factura,
    }

    return show.definition.url
            .replace('{factura}', parsedArgs.factura.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FactusInvoiceController::show
* @see app/Http/Controllers/Api/FactusInvoiceController.php:61
* @route '/api/facturas/{factura}'
*/
show.get = (args: { factura: string | number } | [factura: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\FactusInvoiceController::show
* @see app/Http/Controllers/Api/FactusInvoiceController.php:61
* @route '/api/facturas/{factura}'
*/
show.head = (args: { factura: string | number } | [factura: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\FactusInvoiceController::show
* @see app/Http/Controllers/Api/FactusInvoiceController.php:61
* @route '/api/facturas/{factura}'
*/
const showForm = (args: { factura: string | number } | [factura: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\FactusInvoiceController::show
* @see app/Http/Controllers/Api/FactusInvoiceController.php:61
* @route '/api/facturas/{factura}'
*/
showForm.get = (args: { factura: string | number } | [factura: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\FactusInvoiceController::show
* @see app/Http/Controllers/Api/FactusInvoiceController.php:61
* @route '/api/facturas/{factura}'
*/
showForm.head = (args: { factura: string | number } | [factura: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const FactusInvoiceController = { index, show }

export default FactusInvoiceController