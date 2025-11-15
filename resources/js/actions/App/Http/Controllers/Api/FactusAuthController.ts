import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\FactusAuthController::authenticate
* @see app/Http/Controllers/Api/FactusAuthController.php:24
* @route '/api/factus/auth/authenticate'
*/
export const authenticate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authenticate.url(options),
    method: 'post',
})

authenticate.definition = {
    methods: ["post"],
    url: '/api/factus/auth/authenticate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\FactusAuthController::authenticate
* @see app/Http/Controllers/Api/FactusAuthController.php:24
* @route '/api/factus/auth/authenticate'
*/
authenticate.url = (options?: RouteQueryOptions) => {
    return authenticate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FactusAuthController::authenticate
* @see app/Http/Controllers/Api/FactusAuthController.php:24
* @route '/api/factus/auth/authenticate'
*/
authenticate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authenticate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\FactusAuthController::authenticate
* @see app/Http/Controllers/Api/FactusAuthController.php:24
* @route '/api/factus/auth/authenticate'
*/
const authenticateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: authenticate.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\FactusAuthController::authenticate
* @see app/Http/Controllers/Api/FactusAuthController.php:24
* @route '/api/factus/auth/authenticate'
*/
authenticateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: authenticate.url(options),
    method: 'post',
})

authenticate.form = authenticateForm

/**
* @see \App\Http\Controllers\Api\FactusAuthController::refreshAccessToken
* @see app/Http/Controllers/Api/FactusAuthController.php:47
* @route '/api/factus/auth/refresh'
*/
export const refreshAccessToken = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refreshAccessToken.url(options),
    method: 'post',
})

refreshAccessToken.definition = {
    methods: ["post"],
    url: '/api/factus/auth/refresh',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\FactusAuthController::refreshAccessToken
* @see app/Http/Controllers/Api/FactusAuthController.php:47
* @route '/api/factus/auth/refresh'
*/
refreshAccessToken.url = (options?: RouteQueryOptions) => {
    return refreshAccessToken.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FactusAuthController::refreshAccessToken
* @see app/Http/Controllers/Api/FactusAuthController.php:47
* @route '/api/factus/auth/refresh'
*/
refreshAccessToken.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refreshAccessToken.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\FactusAuthController::refreshAccessToken
* @see app/Http/Controllers/Api/FactusAuthController.php:47
* @route '/api/factus/auth/refresh'
*/
const refreshAccessTokenForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: refreshAccessToken.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\FactusAuthController::refreshAccessToken
* @see app/Http/Controllers/Api/FactusAuthController.php:47
* @route '/api/factus/auth/refresh'
*/
refreshAccessTokenForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: refreshAccessToken.url(options),
    method: 'post',
})

refreshAccessToken.form = refreshAccessTokenForm

/**
* @see \App\Http\Controllers\Api\FactusAuthController::status
* @see app/Http/Controllers/Api/FactusAuthController.php:70
* @route '/api/factus/auth/status'
*/
export const status = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/api/factus/auth/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\FactusAuthController::status
* @see app/Http/Controllers/Api/FactusAuthController.php:70
* @route '/api/factus/auth/status'
*/
status.url = (options?: RouteQueryOptions) => {
    return status.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\FactusAuthController::status
* @see app/Http/Controllers/Api/FactusAuthController.php:70
* @route '/api/factus/auth/status'
*/
status.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\FactusAuthController::status
* @see app/Http/Controllers/Api/FactusAuthController.php:70
* @route '/api/factus/auth/status'
*/
status.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\FactusAuthController::status
* @see app/Http/Controllers/Api/FactusAuthController.php:70
* @route '/api/factus/auth/status'
*/
const statusForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\FactusAuthController::status
* @see app/Http/Controllers/Api/FactusAuthController.php:70
* @route '/api/factus/auth/status'
*/
statusForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\FactusAuthController::status
* @see app/Http/Controllers/Api/FactusAuthController.php:70
* @route '/api/factus/auth/status'
*/
statusForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: status.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

status.form = statusForm

const FactusAuthController = { authenticate, refreshAccessToken, status }

export default FactusAuthController