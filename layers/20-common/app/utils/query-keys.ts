/**
 * Creates query and mutation keys for a resource.
 *
 * Keys use these shapes:
 * - `all`: `[resource]`
 * - `lists`: `[resource, 'list']`
 * - `list(query)`: `[resource, 'list', query]`
 * - `details`: `[resource, 'detail']`
 * - `detail(params)`: `[resource, 'detail', params]`
 * - mutations: `[resource, 'mutation', action]`
 *
 * @param resourceName Resource name used as the root key segment.
 * @returns A typed factory for resource query and mutation keys.
 */
export const createResourceKeys = <const TResourceName extends string>(
  resourceName: TResourceName,
) => {
  const all = [resourceName] as const

  const lists = [...all, 'list'] as const
  const details = [...all, 'detail'] as const
  const mutations = [...all, 'mutation'] as const

  return {
    all,
    lists,
    list: <TQuery>(query: TQuery) => [...lists, query] as const,
    details,
    detail: <TParams>(params: TParams) => [...details, params] as const,
    create: () => [...mutations, 'create'] as const,
    update: () => [...mutations, 'update'] as const,
    delete: () => [...mutations, 'delete'] as const,
  }
}
