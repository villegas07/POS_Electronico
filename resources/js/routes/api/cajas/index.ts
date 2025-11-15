import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\CajaController::abrir
* @see app/Http/Controllers/Api/CajaController.php:34
* @route '/api/cajas/abrir'
*/
export const abrir = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: abrir.url(options),
    method: 'post',
})

abrir.definition = {
    methods: ["post"],
    url: '/api/cajas/abrir',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\CajaController::abrir
* @see app/Http/Controllers/Api/CajaController.php:34
* @route '/api/cajas/abrir'
*/
abrir.url = (options?: RouteQueryOptions) => {
    return abrir.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CajaController::abrir
* @see app/Http/Controllers/Api/CajaController.php:34
* @route '/api/cajas/abrir'
*/
abrir.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: abrir.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\CajaController::abrir
* @see app/Http/Controllers/Api/CajaController.php:34
* @route '/api/cajas/abrir'
*/
const abrirForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: abrir.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\CajaController::abrir
* @see app/Http/Controllers/Api/CajaController.php:34
* @route '/api/cajas/abrir'
*/
abrirForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: abrir.url(options),
    method: 'post',
})

abrir.form = abrirForm

/**
* @see \App\Http\Controllers\Api\CajaController::activa
* @see app/Http/Controllers/Api/CajaController.php:17
* @route '/api/cajas/activa'
*/
export const activa = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activa.url(options),
    method: 'get',
})

activa.definition = {
    methods: ["get","head"],
    url: '/api/cajas/activa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CajaController::activa
* @see app/Http/Controllers/Api/CajaController.php:17
* @route '/api/cajas/activa'
*/
activa.url = (options?: RouteQueryOptions) => {
    return activa.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CajaController::activa
* @see app/Http/Controllers/Api/CajaController.php:17
* @route '/api/cajas/activa'
*/
activa.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\CajaController::activa
* @see app/Http/Controllers/Api/CajaController.php:17
* @route '/api/cajas/activa'
*/
activa.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: activa.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\CajaController::activa
* @see app/Http/Controllers/Api/CajaController.php:17
* @route '/api/cajas/activa'
*/
const activaForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: activa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\CajaController::activa
* @see app/Http/Controllers/Api/CajaController.php:17
* @route '/api/cajas/activa'
*/
activaForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: activa.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\CajaController::activa
* @see app/Http/Controllers/Api/CajaController.php:17
* @route '/api/cajas/activa'
*/
activaForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: activa.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

activa.form = activaForm

/**
* @see \App\Http\Controllers\Api\CajaController::cerrar
* @see app/Http/Controllers/Api/CajaController.php:83
* @route '/api/cajas/{caja}/cerrar'
*/
export const cerrar = (args: { caja: string | number } | [caja: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cerrar.url(args, options),
    method: 'post',
})

cerrar.definition = {
    methods: ["post"],
    url: '/api/cajas/{caja}/cerrar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\CajaController::cerrar
* @see app/Http/Controllers/Api/CajaController.php:83
* @route '/api/cajas/{caja}/cerrar'
*/
cerrar.url = (args: { caja: string | number } | [caja: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { caja: args }
    }

    if (Array.isArray(args)) {
        args = {
            caja: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        caja: args.caja,
    }

    return cerrar.definition.url
            .replace('{caja}', parsedArgs.caja.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CajaController::cerrar
* @see app/Http/Controllers/Api/CajaController.php:83
* @route '/api/cajas/{caja}/cerrar'
*/
cerrar.post = (args: { caja: string | number } | [caja: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cerrar.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\CajaController::cerrar
* @see app/Http/Controllers/Api/CajaController.php:83
* @route '/api/cajas/{caja}/cerrar'
*/
const cerrarForm = (args: { caja: string | number } | [caja: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cerrar.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\CajaController::cerrar
* @see app/Http/Controllers/Api/CajaController.php:83
* @route '/api/cajas/{caja}/cerrar'
*/
cerrarForm.post = (args: { caja: string | number } | [caja: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cerrar.url(args, options),
    method: 'post',
})

cerrar.form = cerrarForm

/**
* @see \App\Http\Controllers\Api\CajaController::resumen
* @see app/Http/Controllers/Api/CajaController.php:140
* @route '/api/cajas/{caja}/resumen'
*/
export const resumen = (args: { caja: string | number } | [caja: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resumen.url(args, options),
    method: 'get',
})

resumen.definition = {
    methods: ["get","head"],
    url: '/api/cajas/{caja}/resumen',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CajaController::resumen
* @see app/Http/Controllers/Api/CajaController.php:140
* @route '/api/cajas/{caja}/resumen'
*/
resumen.url = (args: { caja: string | number } | [caja: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { caja: args }
    }

    if (Array.isArray(args)) {
        args = {
            caja: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        caja: args.caja,
    }

    return resumen.definition.url
            .replace('{caja}', parsedArgs.caja.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CajaController::resumen
* @see app/Http/Controllers/Api/CajaController.php:140
* @route '/api/cajas/{caja}/resumen'
*/
resumen.get = (args: { caja: string | number } | [caja: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resumen.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\CajaController::resumen
* @see app/Http/Controllers/Api/CajaController.php:140
* @route '/api/cajas/{caja}/resumen'
*/
resumen.head = (args: { caja: string | number } | [caja: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: resumen.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\CajaController::resumen
* @see app/Http/Controllers/Api/CajaController.php:140
* @route '/api/cajas/{caja}/resumen'
*/
const resumenForm = (args: { caja: string | number } | [caja: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: resumen.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\CajaController::resumen
* @see app/Http/Controllers/Api/CajaController.php:140
* @route '/api/cajas/{caja}/resumen'
*/
resumenForm.get = (args: { caja: string | number } | [caja: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: resumen.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\CajaController::resumen
* @see app/Http/Controllers/Api/CajaController.php:140
* @route '/api/cajas/{caja}/resumen'
*/
resumenForm.head = (args: { caja: string | number } | [caja: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: resumen.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

resumen.form = resumenForm

/**
* @see \App\Http\Controllers\Api\CajaController::movimientos
* @see app/Http/Controllers/Api/CajaController.php:186
* @route '/api/cajas/{caja}/movimientos'
*/
export const movimientos = (args: { caja: number | { id: number } } | [caja: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: movimientos.url(args, options),
    method: 'post',
})

movimientos.definition = {
    methods: ["post"],
    url: '/api/cajas/{caja}/movimientos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\CajaController::movimientos
* @see app/Http/Controllers/Api/CajaController.php:186
* @route '/api/cajas/{caja}/movimientos'
*/
movimientos.url = (args: { caja: number | { id: number } } | [caja: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { caja: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { caja: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            caja: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        caja: typeof args.caja === 'object'
        ? args.caja.id
        : args.caja,
    }

    return movimientos.definition.url
            .replace('{caja}', parsedArgs.caja.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CajaController::movimientos
* @see app/Http/Controllers/Api/CajaController.php:186
* @route '/api/cajas/{caja}/movimientos'
*/
movimientos.post = (args: { caja: number | { id: number } } | [caja: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: movimientos.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\CajaController::movimientos
* @see app/Http/Controllers/Api/CajaController.php:186
* @route '/api/cajas/{caja}/movimientos'
*/
const movimientosForm = (args: { caja: number | { id: number } } | [caja: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: movimientos.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\CajaController::movimientos
* @see app/Http/Controllers/Api/CajaController.php:186
* @route '/api/cajas/{caja}/movimientos'
*/
movimientosForm.post = (args: { caja: number | { id: number } } | [caja: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: movimientos.url(args, options),
    method: 'post',
})

movimientos.form = movimientosForm

/**
* @see \App\Http\Controllers\Api\CajaController::index
* @see app/Http/Controllers/Api/CajaController.php:173
* @route '/api/cajas'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/cajas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CajaController::index
* @see app/Http/Controllers/Api/CajaController.php:173
* @route '/api/cajas'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CajaController::index
* @see app/Http/Controllers/Api/CajaController.php:173
* @route '/api/cajas'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\CajaController::index
* @see app/Http/Controllers/Api/CajaController.php:173
* @route '/api/cajas'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\CajaController::index
* @see app/Http/Controllers/Api/CajaController.php:173
* @route '/api/cajas'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\CajaController::index
* @see app/Http/Controllers/Api/CajaController.php:173
* @route '/api/cajas'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\CajaController::index
* @see app/Http/Controllers/Api/CajaController.php:173
* @route '/api/cajas'
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
* @see \App\Http\Controllers\Api\CajaController::show
* @see app/Http/Controllers/Api/CajaController.php:220
* @route '/api/cajas/{caja}'
*/
export const show = (args: { caja: number | { id: number } } | [caja: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/cajas/{caja}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CajaController::show
* @see app/Http/Controllers/Api/CajaController.php:220
* @route '/api/cajas/{caja}'
*/
show.url = (args: { caja: number | { id: number } } | [caja: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { caja: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { caja: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            caja: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        caja: typeof args.caja === 'object'
        ? args.caja.id
        : args.caja,
    }

    return show.definition.url
            .replace('{caja}', parsedArgs.caja.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CajaController::show
* @see app/Http/Controllers/Api/CajaController.php:220
* @route '/api/cajas/{caja}'
*/
show.get = (args: { caja: number | { id: number } } | [caja: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\CajaController::show
* @see app/Http/Controllers/Api/CajaController.php:220
* @route '/api/cajas/{caja}'
*/
show.head = (args: { caja: number | { id: number } } | [caja: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\CajaController::show
* @see app/Http/Controllers/Api/CajaController.php:220
* @route '/api/cajas/{caja}'
*/
const showForm = (args: { caja: number | { id: number } } | [caja: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\CajaController::show
* @see app/Http/Controllers/Api/CajaController.php:220
* @route '/api/cajas/{caja}'
*/
showForm.get = (args: { caja: number | { id: number } } | [caja: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\CajaController::show
* @see app/Http/Controllers/Api/CajaController.php:220
* @route '/api/cajas/{caja}'
*/
showForm.head = (args: { caja: number | { id: number } } | [caja: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const cajas = {
    abrir: Object.assign(abrir, abrir),
    activa: Object.assign(activa, activa),
    cerrar: Object.assign(cerrar, cerrar),
    resumen: Object.assign(resumen, resumen),
    movimientos: Object.assign(movimientos, movimientos),
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default cajas