# arfa-types

TypeScript types and JSX declarations for the [Arfa JS](https://www.npmjs.com/package/create-arfa) framework.

This package provides the type system that powers **JSX**, **components**, and **routing** in Arfa apps.

---

## ✨ What it provides

- A global `JSX` declaration so `.tsx` files compile against Arfa’s runtime (`h`, `Fragment`).
- Exported helper types:
  - `PropsWithChildren<P>` – adds `children` to any props type
  - `Component<P>` – minimal function component type
  - `FC<P>` – alias for `Component<P>` with `children`
  - `PageComponent<P>` – same as `Component<P>`, meant for pages
  - `ComponentProps<T>` – extract props from a component
- Router helpers:
  - `PageModule` – describes modules returned by `import.meta.glob`
  - `RouteModules` – record of all page modules
  - `GuardFn` – function signature for layout guards (protected routes)
- JSX IntrinsicElements typing:
  - Permissive attributes (supports `class`, `className`, `id`, `style`, `on*` events, etc.)
  - Custom element support via string index

---

## 📦 Install

```bash
npm i -D arfa-types
```
