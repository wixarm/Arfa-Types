// index.d.ts
export type Primitive = string | number | boolean | null | undefined;

export type VNode = any;
export type ReactishNode = VNode | Primitive | Array<ReactishNode>;

export type Component<P = {}> = (props: P) => ReactishNode | null;
export type FC<P = {}> = Component<P>;
export type PropsWithChildren<P> = P & { children?: ReactishNode };
export type ComponentProps<T> = T extends Component<infer P> ? P : never;

/**
 * Simple HTML attribute map — permissive to avoid coupling to DOM typings.
 * If you want stricter attribute types later we can extend this.
 */
export interface IntrinsicAttributes {
  key?: string | number;
}

/**
 * By default allow any intrinsic element / attributes.
 * You can replace `any` with stricter attribute maps if you want HTML autocomplete.
 */
export interface IntrinsicElements {
  [elemName: string]: any;
}

declare global {
  function h(
    type: string | Function,
    props: Record<string, any> | null,
    ...children: any[]
  ): VNode;
  function Fragment(props: { children?: any }): any;

  namespace JSX {
    type Element = VNode;
    type ElementClass = any;
    interface ElementAttributesProperty {
      props: any;
    }
    interface ElementChildrenAttribute {
      children: any;
    }

    interface IntrinsicAttributes
      extends import("arfa-types").IntrinsicAttributes {}
    interface IntrinsicElements
      extends import("arfa-types").IntrinsicElements {}
  }
}

export {};
