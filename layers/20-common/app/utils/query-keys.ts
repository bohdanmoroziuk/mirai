type DetailInput<TParams extends object> = {
  params: TParams
}

type ListInput<TQuery extends object> = {
  query?: TQuery
}

/**
 * Extracts route params from a detail-query input.
 *
 * @param input Detail-query input containing `params`.
 * @returns The input's route params.
 */
export const getDetailParams = <TParams extends object>(
  input: DetailInput<TParams>,
): TParams => {
  return input.params
}

/**
 * Extracts the optional query object from a list-query input.
 *
 * @param input List-query input that may contain `query`.
 * @returns The query object, or `undefined` when it was not provided.
 */
export const getListQuery = <TQuery extends object>(
  input: ListInput<TQuery>,
): Optional<TQuery> => {
  return input.query
}

/**
 * Creates query and mutation keys for a resource.
 *
 * Keys use these shapes:
 * - `all`: `[resource]`
 * - `query(name)`: `[resource, 'queries', name]`
 * - `query(name, input)`: `[resource, 'queries', name, input]`
 * - `lists`: `[resource, 'queries', 'list']`
 * - `list(query)`: `[resource, 'queries', 'list', query]`
 * - `details`: `[resource, 'queries', 'detail']`
 * - `detail(params)`: `[resource, 'queries', 'detail', params]`
 * - `mutation(name)`: `[resource, 'mutations', name]`
 * - `create`, `update`, `delete`: prebuilt mutation keys
 *
 * Empty/nullish query inputs are omitted from the key.
 *
 * @param resourceName Resource name used as the root key segment.
 * @returns A typed factory for resource query and mutation keys.
 */
export const createResourceKeys = <const TResourceName extends string>(
  resourceName: TResourceName,
) => {
  const all = () => [resourceName] as const

  const queries = () => [...all(), 'queries'] as const
  const mutations = () => [...all(), 'mutations'] as const

  const query = <
    const TQueryName extends string,
    TInput extends object = Record<string, never>,
  >(
    queryName: TQueryName,
    input?: Nullable<TInput>,
  ) => {
    if (isNullish(input)) return [...queries(), queryName] as const
    if (isEmpty(input)) return [...queries(), queryName] as const

    return [...queries(), queryName, input] as const
  }

  const mutation = <const TMutationName extends string>(
    mutationName: TMutationName,
  ) => {
    return [...mutations(), mutationName] as const
  }

  const lists = () => [...queries(), 'list'] as const
  const details = () => [...queries(), 'detail'] as const

  const list = <TQuery extends object>(query?: Nullable<TQuery>) => {
    if (isNullish(query)) return lists()
    if (isEmpty(query)) return lists()

    return [...lists(), query] as const
  }

  const detail = <TParams extends object>(params: TParams) => {
    return [...details(), params] as const
  }

  return {
    all,

    query,
    mutation,

    lists,
    list,

    details,
    detail,

    create: () => mutation('create'),
    update: () => mutation('update'),
    delete: () => mutation('delete'),
  }
}
