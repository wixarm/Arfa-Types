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

// Helpful alias for pages
export type PageComponent<P = {}> = Component<P>;

// ---------- Runtime function types (values live in arfa-runtime) ----------
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
  // Optional guard metadata supported by your router’s _layout
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

  // Allow any attribute (incl. custom "on*" handlers)
  [key: string]: any;

  // Common event handlers with better typing
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
    // What a JSX expression returns
    type Element = ArfaNode;

    // Props for intrinsic HTML elements
    type IntrinsicElements = {
      [K in keyof HTMLElementTagNameMap]: IntrinsicElementProps<K>;
    } & {
      // Fallback for custom elements/tags
      [elemName: string]: DOMAttributes & { children?: ArfaNode };
    };
  }

  // Optional runtime globals (you set these in your app bootstrap)
  // Values come from arfa-runtime; types come from here.
  var h: JSXFactory | undefined;
  var Fragment: FragmentComponent | undefined;
}

// Ensure this file is treated as a module by TS
export {};
