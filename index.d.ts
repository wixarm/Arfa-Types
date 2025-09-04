// ---------- This package is for using ts components in Arfa JS framework ----------
// ---------- https://www.npmjs.com/package/create-arfa ----------
// ---------- Core node types ----------
export type PrimitiveChild = string | number | boolean | null | undefined;
export type ArfaNode = PrimitiveChild | VNode | ArfaNode[];

export interface VNode {
  type: string | Component<any> | symbol; // Add symbol to support Fragment
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
  type: string | Component<any> | symbol, // Add symbol to support Fragment
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
  // Optional guard metadata supported by your router's _layout
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
    type Element = ArfaNode;

    interface ElementClass {
      // This can be empty, it's just for type checking
    }

    interface ElementAttributesProperty {
      props: {};
    }

    interface ElementChildrenAttribute {
      children: {};
    }

    // Define Fragment as a function component that returns its children
    interface Fragment extends FunctionComponent<{}> {
      // This tells TypeScript that Fragment is a valid JSX element type
    }

    interface FunctionComponent<P = {}> {
      (props: PropsWithChildren<P>, context?: any): ArfaNode;
    }

    type IntrinsicElements = {
      [K in keyof HTMLElementTagNameMap]: IntrinsicElementProps<K>;
    } & {
      [elemName: string]: DOMAttributes & { children?: ArfaNode };
    };
  }

  var h: JSXFactory | undefined;
  var Fragment: FragmentComponent | undefined;
}

// Export Fragment for explicit usage
export declare const Fragment: FragmentComponent;

// Add this to help TypeScript understand JSX Fragment syntax
declare module JSX {
  interface IntrinsicElements {
    // This allows <>...</> syntax
    fragment: { children?: ArfaNode };
  }
}

export {};
