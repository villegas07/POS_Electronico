import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ProveedorController::index
* @see app/Http/Controllers/Api/ProveedorController.php:12
* @route '/api/proveedores'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/proveedores',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ProveedorController::index
* @see app/Http/Controllers/Api/ProveedorController.php:12
* @route '/api/proveedores'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProveedorController::index
* @see app/Http/Controllers/Api/ProveedorController.php:12
* @route '/api/proveedores'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::index
* @see app/Http/Controllers/Api/ProveedorController.php:12
* @route '/api/proveedores'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::index
* @see app/Http/Controllers/Api/ProveedorController.php:12
* @route '/api/proveedores'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::index
* @see app/Http/Controllers/Api/ProveedorController.php:12
* @route '/api/proveedores'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::index
* @see app/Http/Controllers/Api/ProveedorController.php:12
* @route '/api/proveedores'
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
* @see \App\Http\Controllers\Api\ProveedorController::store
* @see app/Http/Controllers/Api/ProveedorController.php:17
* @route '/api/proveedores'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/proveedores',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ProveedorController::store
* @see app/Http/Controllers/Api/ProveedorController.php:17
* @route '/api/proveedores'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProveedorController::store
* @see app/Http/Controllers/Api/ProveedorController.php:17
* @route '/api/proveedores'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::store
* @see app/Http/Controllers/Api/ProveedorController.php:17
* @route '/api/proveedores'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::store
* @see app/Http/Controllers/Api/ProveedorController.php:17
* @route '/api/proveedores'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\ProveedorController::show
* @see app/Http/Controllers/Api/ProveedorController.php:34
* @route '/api/proveedores/{proveedor}'
*/
export const show = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/proveedores/{proveedor}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ProveedorController::show
* @see app/Http/Controllers/Api/ProveedorController.php:34
* @route '/api/proveedores/{proveedor}'
*/
show.url = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proveedor: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { proveedor: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            proveedor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        proveedor: typeof args.proveedor === 'object'
        ? args.proveedor.id
        : args.proveedor,
    }

    return show.definition.url
            .replace('{proveedor}', parsedArgs.proveedor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProveedorController::show
* @see app/Http/Controllers/Api/ProveedorController.php:34
* @route '/api/proveedores/{proveedor}'
*/
show.get = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::show
* @see app/Http/Controllers/Api/ProveedorController.php:34
* @route '/api/proveedores/{proveedor}'
*/
show.head = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::show
* @see app/Http/Controllers/Api/ProveedorController.php:34
* @route '/api/proveedores/{proveedor}'
*/
const showForm = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::show
* @see app/Http/Controllers/Api/ProveedorController.php:34
* @route '/api/proveedores/{proveedor}'
*/
showForm.get = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::show
* @see app/Http/Controllers/Api/ProveedorController.php:34
* @route '/api/proveedores/{proveedor}'
*/
showForm.head = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Api\ProveedorController::update
* @see app/Http/Controllers/Api/ProveedorController.php:39
* @route '/api/proveedores/{proveedor}'
*/
export const update = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/proveedores/{proveedor}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Api\ProveedorController::update
* @see app/Http/Controllers/Api/ProveedorController.php:39
* @route '/api/proveedores/{proveedor}'
*/
update.url = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proveedor: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { proveedor: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            proveedor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        proveedor: typeof args.proveedor === 'object'
        ? args.proveedor.id
        : args.proveedor,
    }

    return update.definition.url
            .replace('{proveedor}', parsedArgs.proveedor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProveedorController::update
* @see app/Http/Controllers/Api/ProveedorController.php:39
* @route '/api/proveedores/{proveedor}'
*/
update.put = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::update
* @see app/Http/Controllers/Api/ProveedorController.php:39
* @route '/api/proveedores/{proveedor}'
*/
update.patch = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::update
* @see app/Http/Controllers/Api/ProveedorController.php:39
* @route '/api/proveedores/{proveedor}'
*/
const updateForm = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::update
* @see app/Http/Controllers/Api/ProveedorController.php:39
* @route '/api/proveedores/{proveedor}'
*/
updateForm.put = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::update
* @see app/Http/Controllers/Api/ProveedorController.php:39
* @route '/api/proveedores/{proveedor}'
*/
updateForm.patch = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Api\ProveedorController::destroy
* @see app/Http/Controllers/Api/ProveedorController.php:56
* @route '/api/proveedores/{proveedor}'
*/
export const destroy = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/proveedores/{proveedor}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\ProveedorController::destroy
* @see app/Http/Controllers/Api/ProveedorController.php:56
* @route '/api/proveedores/{proveedor}'
*/
destroy.url = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proveedor: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { proveedor: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            proveedor: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        proveedor: typeof args.proveedor === 'object'
        ? args.proveedor.id
        : args.proveedor,
    }

    return destroy.definition.url
            .replace('{proveedor}', parsedArgs.proveedor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ProveedorController::destroy
* @see app/Http/Controllers/Api/ProveedorController.php:56
* @route '/api/proveedores/{proveedor}'
*/
destroy.delete = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::destroy
* @see app/Http/Controllers/Api/ProveedorController.php:56
* @route '/api/proveedores/{proveedor}'
*/
const destroyForm = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ProveedorController::destroy
* @see app/Http/Controllers/Api/ProveedorController.php:56
* @route '/api/proveedores/{proveedor}'
*/
destroyForm.delete = (args: { proveedor: number | { id: number } } | [proveedor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const ProveedorController = { index, store, show, update, destroy }

export default ProveedorController