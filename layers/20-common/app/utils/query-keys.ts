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
 * List keys are `[resource, 'list']` or `[resource, 'list', query]`.
 * Detail keys are `[resource, 'detail', params]`; mutation keys are grouped
 * under `[resource, 'mutation']`.
 *
 * @param resourceName Resource name used as the root key segment.
 * @returns A typed factory for resource query and mutation keys.
 */
export const createResourceKeys = <const TResourceName extends string>(
  resourceName: TResourceName,
) => {
  const all = [resourceName] as const

  const lists = [...all, 'list'] as const

  const list = <TQuery extends object>(query?: TQuery) => {
    if (isUndefined(query)) return lists
    if (isEmpty(query)) return lists

    return [...lists, query] as const
  }

  const details = [...all, 'detail'] as const

  const detail = <TParams extends object>(params: TParams) => {
    return [...details, params] as const
  }

  const mutations = [...all, 'mutation'] as const

  const mutation = <TMutationName extends string>(
    mutationName: TMutationName,
  ) => {
    return [...mutations, mutationName] as const
  }

  return {
    all,
    lists,
    list,
    details,
    detail,
    mutation,
    create: mutation('create'),
    update: mutation('update'),
    delete: mutation('delete'),
  }
}
