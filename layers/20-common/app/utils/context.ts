import type { InjectionKey } from 'vue'

/**
 * Creates a typed Vue injection key for a shared context value.
 *
 * @param name Description used to identify the key during debugging.
 * @returns A unique injection key for values of type `T`.
 */
export const createContextKey = <T>(name: string): InjectionKey<T> => {
  return Symbol(name) as InjectionKey<T>
}

/**
 * Creates a typed pair of helpers for providing and consuming shared context.
 *
 * The consumer throws when no value has been provided for the context.
 *
 * @param name Context name used for the injection key and missing-context error.
 * @returns Helpers for sharing and consuming the context value.
 */
export const createContext = <T>(name: string) => {
  const key = createContextKey<T>(name)

  /**
   * Provides the context value to descendant components.
   *
   * @param value Context value to share.
   */
  const shareContext = (value: T) => {
    provide(key, value)
  }

  /**
   * Injects the nearest shared context value.
   *
   * @returns The shared context value.
   * @throws When no value has been provided for this context.
   */
  const useContext = (): T => {
    const context = inject(key)

    if (isDefined(context)) return context

    throw new Error(`${name} is not shared`)
  }

  return {
    shareContext,
    useContext,
  }
}
