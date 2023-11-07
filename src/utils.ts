export function map3<A, B>(fn: (a: A) => B, a1: A, a2: A, a3: A): [B, B, B] {
  return [fn(a1), fn(a2), fn(a3)];
}
