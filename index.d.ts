// arfa-types/src/index.d.ts

// ---------- Core node types ----------
export type PrimitiveChild = string | number | boolean | null | undefined;
export type ArfaNode = PrimitiveChild | VNode | ArfaNode[];

export interface VNode {
  type: string | Component<any>;
  props: Record<string, any> & { children?: ArfaNode };
}

// ---------- Component utility types ----------
export type PropsWithChildren<P = {}> = P & { children?: ArfaNode };

export type Component<P = {}> = (props: PropsWithChildren<P>) => ArfaNode;
export type FC<P = {}> = Component<P>;

// Helpful aliases
export type PageComponent<P = {}> = Component<P>;

// ---------- Runtime function types (types only; values live in arfa-runtime) ----------
export type JSXFactory = (
  type: string | Component<any>,
  props: Record<string, any> | null,
  ...children: any[]
) => VNode;

export type FragmentComponent = (props: PropsWithChildren) => ArfaNode;

// ---------- Router helpers ----------
export type GuardFn = (
  params?: any,
  pathname?: string
) => boolean | Promise<boolean>;

export type PageModule = {
  default: PageComponent<any>;
  protect?: GuardFn;
  protectRedirect?: string;
} & Record<string, any>;

export type RouteModules = Record<string, PageModule>;

// ---------- Minimal DOM/JSX typings ----------
type EventHandler<E extends Event = Event> = (event: E) => void;

interface DOMAttributes {
  // Common attributes
  id?: string;
  class?: string;
  className?: string;
  title?: string;
  role?: string;
  style?: string | Partial<CSSStyleDeclaration>;

  // Allow any attribute (incl. any "on*" handler) for broad compatibility
  [key: string]: any;

  // Commonly used event handlers with better typing
  onClick?: EventHandler<MouseEvent>;
  onDblClick?: EventHandler<MouseEvent>;
  onMouseDown?: EventHandler<MouseEvent>;
  onMouseUp?: EventHandler<MouseEvent>;
  onMouseEnter?: EventHandler<MouseEvent>;
  onMouseLeave?: EventHandler<MouseEvent>;
  onInput?: EventHandler<InputEvent>;
  onChange?: EventHandler<Event>;
  onSubmit?: EventHandler<SubmitEvent>;
  onKeyDown?: EventHandler<KeyboardEvent>;
  onKeyUp?: EventHandler<KeyboardEvent>;
}

type IntrinsicElementProps<TagName extends keyof HTMLElementTagNameMap> =
  DOMAttributes & {
    children?: ArfaNode;
  };

// ---------- Global JSX namespace ----------
declare global {
  namespace JSX {
    type Element = ArfaNode;

    type IntrinsicElements = {
      [K in keyof HTMLElementTagNameMap]: IntrinsicElementProps<K>;
    } & {
      [elemName: string]: DOMAttributes & { children?: ArfaNode };
    };
  }

  // optional runtime globals (set in app bootstrap)
  // These are typed here so TS won't complain when you write (globalThis as any).h
  var h: JSXFactory | undefined;
  var Fragment: FragmentComponent | undefined;
}

export {};
