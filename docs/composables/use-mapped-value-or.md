# useMappedValueOr

`useMappedValueOr` maps a nullable or reactive value into a computed value with a fallback.

It is useful for derived UI state such as error messages, labels, and display values.

## Purpose

`useMappedValueOr` keeps nullish value mapping consistent.

Instead of checking for `null` or `undefined` in each component, pass the value, a mapper, and a fallback.

## API

```ts
function useMappedValueOr<TValue, TMappedValue, TFallback = TMappedValue>(
  value: MaybeRefOrGetter<Nullish<TValue>>,
  mapper: (value: TValue) => TMappedValue,
  fallback: TFallback,
): ComputedRef<TMappedValue | TFallback>
```

## Usage

```ts
const errorMessage = useMappedValueOr(error, getErrorMessage, null)
```

## Behavior

`useMappedValueOr` returns a computed ref.

If `value` is present, the computed value is `mapper(value)`.

If `value` is `null` or `undefined`, the computed value is `fallback`.

## Notes

Use `useMappedValueOr` when the fallback is part of shared UI behavior.

Keep domain mapping logic in feature mappers or workflows when the mapping is feature-specific.
