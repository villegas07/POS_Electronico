// Addon: productosIndex and proveedoresIndex route helpers
// Append these to resources/js/routes/index.ts

import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'

/**
 * Productos index
 */
export const productosIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: productosIndex.url(options),
    method: 'get',
})

productosIndex.definition = {
    methods: ["get","head"],
    url: '/productos',
} satisfies RouteDefinition<["get","head"]>

productosIndex.url = (options?: RouteQueryOptions) => {
    return productosIndex.definition.url + queryParams(options)
}

productosIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: productosIndex.url(options),
    method: 'get',
})

productosIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: productosIndex.url(options),
    method: 'head',
})

const productosIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: productosIndex.url(options),
    method: 'get',
})

productosIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: productosIndex.url(options),
    method: 'get',
})

productosIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: productosIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

productosIndex.form = productosIndexForm

/**
 * Proveedores index
 */
export const proveedoresIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proveedoresIndex.url(options),
    method: 'get',
})

proveedoresIndex.definition = {
    methods: ["get","head"],
    url: '/proveedores',
} satisfies RouteDefinition<["get","head"]>

proveedoresIndex.url = (options?: RouteQueryOptions) => {
    return proveedoresIndex.definition.url + queryParams(options)
}

proveedoresIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proveedoresIndex.url(options),
    method: 'get',
})

proveedoresIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: proveedoresIndex.url(options),
    method: 'head',
})

const proveedoresIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: proveedoresIndex.url(options),
    method: 'get',
})

proveedoresIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: proveedoresIndex.url(options),
    method: 'get',
})

proveedoresIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: proveedoresIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

proveedoresIndex.form = proveedoresIndexForm
