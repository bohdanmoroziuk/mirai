export const useMappedValueOr = <
  TValue,
  TMappedValue,
  TFallback = TMappedValue,
>(
  value: MaybeRefOrGetter<Nullish<TValue>>,
  mapper: (value: TValue) => TMappedValue,
  fallback: TFallback,
): ComputedRef<TMappedValue | TFallback> => {
  return computed(() => {
    return mapValueOr(value, mapper, fallback)
  })
}
