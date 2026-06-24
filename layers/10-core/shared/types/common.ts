export type Nullable<T> = T | null

export type Nullish<T> = T | null | undefined

export type Falsy = false | 0 | 0n | '' | null | undefined

export type Truthy<T> = T extends Falsy ? never : T
