import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { Nullish } from '@core/shared/types/common'

export const toValueOr = <
  TValue,
  TFallback = TValue,
>(
  value: MaybeRefOrGetter<Nullish<TValue>>,
  fallback: TFallback,
): NonNullable<TValue> | TFallback => {
  return toValue(value) ?? fallback
}

export const mapValueOr = <
  TValue,
  TMappedValue,
  TFallback = TMappedValue,
>(
  value: MaybeRefOrGetter<Nullish<TValue>>,
  mapper: (value: TValue) => TMappedValue,
  fallback: TFallback,
): TMappedValue | TFallback => {
  const resolvedValue = toValue(value)

  if (isNullish(resolvedValue)) {
    return fallback
  }

  return mapper(resolvedValue)
}
