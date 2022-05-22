---
title: TypeScript Type Utility
description: Generic utility type
icon: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg
tags:
  - typescript
---

```ts
// Used for making complex object type
// to be plain object
type Flatten<T> = {
  [K in keyof T]: T[K];
};

// Partially making field `K` required,
// and should be the keyof `T`
type RequiredPick<T, K extends keyof T> = Flatten<
  {
    [P in K]-?: T[P];
  } & Omit<T, K>
>;

// Partially making field `K` non nullable,
// and should be the keyof `T`
type NonNullablePick<T, K extends keyof T> = Flatten<
  {
    [P in K]-?: NonNullable<T[P]>;
  } & Omit<T, K>
>;

// Partially making field `K` optional,
// and should be the keyof `T`
type PartialPick<T, K extends keyof T> = Flatten<
  {
    [P in K]?: T[P] | null;
  } & Omit<T, K>
>;

// Partially making field `K` readonly,
// and should be the keyof `T`
type ReadonlyPick<T, K extends keyof T> = Flatten<
  {
    readonly [P in K]: T[P];
  } & Omit<T, K>
>;
```
