export type Primitives<T> = T extends { value: infer U } ? U : never
