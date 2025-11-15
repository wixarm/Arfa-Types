export type PrimitiveChild = string | number | boolean | null | undefined;
export type ArfaNode = PrimitiveChild | VNode | ArfaNode[];

export interface VNode {
  type: string | Component<any> | symbol;
  props: Record<string, any> & { children?: ArfaNode };
  key?: string | number | null;
  ref?: ((el: HTMLElement | null) => void) | { current: HTMLElement | null };
}

export type PropsWithChildren<P = {}> = P & { children?: ArfaNode };

export type Component<P = {}> = (props: PropsWithChildren<P>) => ArfaNode;
export type FC<P = {}> = Component<P>;
export type PageComponent<P = {}> = Component<P & {
  params?: Record<string, any>;
  query?: Record<string, string>;
  hash?: string;
}>;

export type JSXFactory = (
  type: string | Component<any> | symbol,
  props: Record<string, any> | null,
  ...children: any[]
) => VNode;

export type FragmentComponent = (props: PropsWithChildren) => ArfaNode;

export type GuardFn = (
  params?: any,
  pathname?: string,
  query?: Record<string, string>,
  hash?: string
) => boolean | Promise<boolean>;

export type PageModule = {
  default: PageComponent<any>;
  protect?: GuardFn;
  protectRedirect?: string;
} & Record<string, any>;

export type RouteModules = Record<string, PageModule>;

type EventHandler<E extends Event = Event> = (event: E) => void;

interface CSSProperties {
  [key: string]: string | number | undefined;
}

interface DOMAttributes {
  [key: string]: any;
  key?: string | number | null;
  ref?: ((el: HTMLElement | null) => void) | { current: HTMLElement | null };
  className?: string;
  class?: string;
  style?: CSSProperties | string;
  dangerouslySetInnerHTML?: { __html: string };
  onClick?: EventHandler<MouseEvent>;
  onDblClick?: EventHandler<MouseEvent>;
  onMouseDown?: EventHandler<MouseEvent>;
  onMouseUp?: EventHandler<MouseEvent>;
  onMouseEnter?: EventHandler<MouseEvent>;
  onMouseLeave?: EventHandler<MouseEvent>;
  onMouseMove?: EventHandler<MouseEvent>;
  onMouseOver?: EventHandler<MouseEvent>;
  onMouseOut?: EventHandler<MouseEvent>;
  onInput?: EventHandler<InputEvent>;
  onChange?: EventHandler<Event>;
  onSubmit?: EventHandler<SubmitEvent>;
  onKeyDown?: EventHandler<KeyboardEvent>;
  onKeyUp?: EventHandler<KeyboardEvent>;
  onKeyPress?: EventHandler<KeyboardEvent>;
  onFocus?: EventHandler<FocusEvent>;
  onBlur?: EventHandler<FocusEvent>;
  onScroll?: EventHandler<Event>;
  onWheel?: EventHandler<WheelEvent>;
  onTouchStart?: EventHandler<TouchEvent>;
  onTouchEnd?: EventHandler<TouchEvent>;
  onTouchMove?: EventHandler<TouchEvent>;
  onDrag?: EventHandler<DragEvent>;
  onDragStart?: EventHandler<DragEvent>;
  onDragEnd?: EventHandler<DragEvent>;
  onDrop?: EventHandler<DragEvent>;
}

declare global {
  namespace JSX {
    type Element = ArfaNode;

    interface ElementClass {}
    interface ElementAttributesProperty {
      props: {};
    }
    interface ElementChildrenAttribute {
      children: {};
    }

    interface Fragment {
      children?: ArfaNode;
    }

    type IntrinsicElements = {
      [K in keyof HTMLElementTagNameMap]: DOMAttributes & {
        children?: ArfaNode;
      };
    } & {
      [elemName: string]: DOMAttributes & { children?: ArfaNode };
    };
  }

  function h(
    type: string | Component<any>,
    props: Record<string, any> | null,
    ...children: any[]
  ): VNode;

  function Fragment(props: { children?: ArfaNode }): ArfaNode;
}

export declare const Fragment: FragmentComponent;

export {};
