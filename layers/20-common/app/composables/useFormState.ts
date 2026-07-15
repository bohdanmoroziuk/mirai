// TODO: Determine whether the state has actually changed.
export const useFormState = <
  TState extends Record<string, unknown>,
>(
  initialState: MaybeRefOrGetter<TState>,
) => {
  const getInitialState = () => {
    return { ...toValue(initialState) }
  }

  const state = reactive(getInitialState())

  const resetState = () => {
    Object.assign(state, getInitialState())
  }

  return {
    state,
    resetState,
  }
}
