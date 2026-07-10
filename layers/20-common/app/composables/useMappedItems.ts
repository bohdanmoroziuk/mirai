export const useMappedItems = <
  TItem,
  TMappedItem,
>(
  items: MaybeRefOrGetter<Nullish<TItem[]>>,
  mapper: (item: TItem) => TMappedItem,
): ComputedRef<TMappedItem[]> => {
  return computed(() => {
    return toValueOr(items, []).map(mapper)
  })
}
