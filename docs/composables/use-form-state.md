# useFormState

`useFormState` manages typed reactive form state and restores it to its initial values.

## Purpose

Use it when a form needs reusable state initialization and reset behavior without duplicating state management in the component.

The composable is generic, so the state shape and value types are inferred from the type argument or the initial-state source.

## API

```ts
function useFormState<TState extends Record<string, unknown>>(
  initialState: MaybeRefOrGetter<TState>,
): {
  state: TState
  resetState: () => void
}
```

`initialState` can be:

* a plain object;
* a ref or computed ref;
* a getter function.

## Usage

```ts
type LoginFormState = {
  email: string
  password: string
}

const initialState: LoginFormState = {
  email: '',
  password: '',
}

const { state, resetState } = useFormState(initialState)

state.email = 'user@example.com'

resetState()
// state.email === ''
// state.password === ''
```

## Reactive initial state

Pass a getter when the initial state comes from props or another reactive source:

```ts
const props = defineProps<{
  initialState: LoginFormState
}>()

const { state, resetState } = useFormState(() => props.initialState)
```

When `resetState` is called, the getter is evaluated again. This means reset uses the current value from the source, rather than only the value available when the composable was created.

## Behavior

`useFormState` creates a shallow copy of the initial state before making it reactive. Reset updates the existing `state` object with `Object.assign`, so consumers keep the same reactive reference.

The initial state is not mutated when form fields change. Top-level fields are copied, but nested objects and arrays remain shared references. For nested form state, provide a deep-cloned initial state or reset nested values explicitly.

## Notes

Use a complete initial state with the expected value types. For example, use `''` for an initially empty string field instead of `undefined` when the form field is typed as a string.

Keep validation and submission workflows outside this composable. `useFormState` is responsible only for state initialization and reset behavior.

## Related files

```txt
layers/20-common/app/composables/useFormState.ts
docs/composables/use-form-state.md
```
