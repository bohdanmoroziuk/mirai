import { isDefined } from './common'

type CompactedObject<T extends Record<PropertyKey, unknown>> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K]
} & {
  [K in keyof T as undefined extends T[K] ? K : never]?: Exclude<
    T[K],
    undefined
  >
}

export const compactObject = <
  T extends Record<PropertyKey, unknown>,
>(
  value: T,
): CompactedObject<T> => {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => isDefined(item)),
  ) as CompactedObject<T>
}

export const hasDefinedProperty = (
  value: Record<string, unknown>,
): boolean => {
  return Object.values(value).some(isDefined)
}
