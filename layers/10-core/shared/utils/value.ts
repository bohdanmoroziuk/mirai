export const mapValueOr = <
  TValue,
  TMappedValue,
  TFallback = TMappedValue,
>(
  value: Nullish<TValue>,
  mapper: (value: TValue) => TMappedValue,
  fallback: TFallback,
): TMappedValue | TFallback => {
  return isPresent(value)
    ? mapper(value)
    : fallback
}
