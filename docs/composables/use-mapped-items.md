# useMappedItems

`useMappedItems` maps a nullable or reactive array into a computed array.

It is useful when UI components need select items, navigation items, or other derived lists from data that may still be loading.

## Purpose

`useMappedItems` keeps nullish array handling consistent.

Instead of repeating fallback logic in components, pass a `MaybeRefOrGetter` list and a mapper.

## API

```ts
function useMappedItems<TItem, TMappedItem>(
  items: MaybeRefOrGetter<Nullish<TItem[]>>,
  mapper: (item: TItem) => TMappedItem,
): ComputedRef<TMappedItem[]>
```

## Usage

```ts
const collectionItems = useMappedItems(collections, (collection) => {
  return {
    label: collection.title,
    value: collection.id,
  }
})
```

## Behavior

`useMappedItems` returns a computed ref.

If `items` is `null` or `undefined`, the computed value is an empty array.

If `items` contains values, each value is passed to `mapper`.

## Notes

Use `useMappedItems` for reusable app mapping logic.

Keep feature-specific mapping functions in the relevant feature layer.

Do not use it when a direct computed expression is clearer.
