import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ProductoController::index
* @see app/Http/Controllers/Api/ProductoController.php:12
* @route '/api/productos'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/productos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ProductoController::index
* @see app/Http/Controllers/Api/ProductoController.php:12
* @route '/api/productos'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProductoController::index
* @see app/Http/Controllers/Api/ProductoController.php:12
* @route '/api/productos'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::index
* @see app/Http/Controllers/Api/ProductoController.php:12
* @route '/api/productos'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::index
* @see app/Http/Controllers/Api/ProductoController.php:12
* @route '/api/productos'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::index
* @see app/Http/Controllers/Api/ProductoController.php:12
* @route '/api/productos'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::index
* @see app/Http/Controllers/Api/ProductoController.php:12
* @route '/api/productos'
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
* @see \App\Http\Controllers\Api\ProductoController::store
* @see app/Http/Controllers/Api/ProductoController.php:23
* @route '/api/productos'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/productos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ProductoController::store
* @see app/Http/Controllers/Api/ProductoController.php:23
* @route '/api/productos'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProductoController::store
* @see app/Http/Controllers/Api/ProductoController.php:23
* @route '/api/productos'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::store
* @see app/Http/Controllers/Api/ProductoController.php:23
* @route '/api/productos'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::store
* @see app/Http/Controllers/Api/ProductoController.php:23
* @route '/api/productos'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\ProductoController::show
* @see app/Http/Controllers/Api/ProductoController.php:51
* @route '/api/productos/{producto}'
*/
export const show = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/productos/{producto}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ProductoController::show
* @see app/Http/Controllers/Api/ProductoController.php:51
* @route '/api/productos/{producto}'
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
* @see \App\Http\Controllers\Api\ProductoController::show
* @see app/Http/Controllers/Api/ProductoController.php:51
* @route '/api/productos/{producto}'
*/
show.get = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::show
* @see app/Http/Controllers/Api/ProductoController.php:51
* @route '/api/productos/{producto}'
*/
show.head = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::show
* @see app/Http/Controllers/Api/ProductoController.php:51
* @route '/api/productos/{producto}'
*/
const showForm = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::show
* @see app/Http/Controllers/Api/ProductoController.php:51
* @route '/api/productos/{producto}'
*/
showForm.get = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::show
* @see app/Http/Controllers/Api/ProductoController.php:51
* @route '/api/productos/{producto}'
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

/**
* @see \App\Http\Controllers\Api\ProductoController::update
* @see app/Http/Controllers/Api/ProductoController.php:56
* @route '/api/productos/{producto}'
*/
export const update = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/productos/{producto}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\ProductoController::update
* @see app/Http/Controllers/Api/ProductoController.php:56
* @route '/api/productos/{producto}'
*/
update.url = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{producto}', parsedArgs.producto.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProductoController::update
* @see app/Http/Controllers/Api/ProductoController.php:56
* @route '/api/productos/{producto}'
*/
update.put = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::update
* @see app/Http/Controllers/Api/ProductoController.php:56
* @route '/api/productos/{producto}'
*/
update.patch = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::update
* @see app/Http/Controllers/Api/ProductoController.php:56
* @route '/api/productos/{producto}'
*/
const updateForm = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::update
* @see app/Http/Controllers/Api/ProductoController.php:56
* @route '/api/productos/{producto}'
*/
updateForm.put = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::update
* @see app/Http/Controllers/Api/ProductoController.php:56
* @route '/api/productos/{producto}'
*/
updateForm.patch = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Api\ProductoController::destroy
* @see app/Http/Controllers/Api/ProductoController.php:81
* @route '/api/productos/{producto}'
*/
export const destroy = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/productos/{producto}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\ProductoController::destroy
* @see app/Http/Controllers/Api/ProductoController.php:81
* @route '/api/productos/{producto}'
*/
destroy.url = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{producto}', parsedArgs.producto.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProductoController::destroy
* @see app/Http/Controllers/Api/ProductoController.php:81
* @route '/api/productos/{producto}'
*/
destroy.delete = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::destroy
* @see app/Http/Controllers/Api/ProductoController.php:81
* @route '/api/productos/{producto}'
*/
const destroyForm = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ProductoController::destroy
* @see app/Http/Controllers/Api/ProductoController.php:81
* @route '/api/productos/{producto}'
*/
destroyForm.delete = (args: { producto: number | { id: number } } | [producto: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const ProductoController = { index, store, show, update, destroy }

export default ProductoController