module Root = {
  [@mel.module "@radix-ui/react-dialog"] [@react.component]
  external make:
    (
      ~children: React.element,
      /* The open state of the dialog when it is initially rendered. Use when you do not need to control its open state. */
      ~defaultOpen: bool=?,
      /* The controlled open state of the dialog. Must be used in conjunction with onOpenChange. */
      ~_open: bool=?,
      /* Event handler called when the open state of the dialog changes. */
      ~onOpenChange: bool => unit=?,
      /* The modality of the dialog. When set to true, interaction with outside elements will be disabled and only dialog content will be visible to screen readers. */
      ~modal: bool=?
    ) =>
    React.element =
    "Root";
};

module Trigger = {
  [@mel.module "@radix-ui/react-dialog"] [@react.component]
  external make:
    (~asChild: bool=?, ~children: React.element, ~className: string=?) =>
    React.element =
    "Trigger";
};

module Portal = {
  module P = {
    [@mel.module "@radix-ui/react-dialog"] [@react.component]
    external make:
      (
        ~children: React.element,
        ~forceMount: bool=?,
        ~container: Dom.htmlElement=?
      ) =>
      // ~container: string=?
      React.element =
      "Portal";
  };
  module SpreadProps = {
    [@react.component]
    let make = (~children, ~props) => {
      React.cloneElement(children, props);
    };
  };

  let make = (~children, ~forceMount, ~container, ~props) => {
    <SpreadProps props> <P forceMount container> children </P> </SpreadProps>;
  };
};

module Content = {
  [@mel.module "@radix-ui/react-dialog"] [@react.component]
  external make:
    (
      ~children: React.element,
      ~asChild: bool=?,
      ~forceMount: bool=?,
      ~onOpenAutoFocus: ReactEvent.Focus.t => unit=?,
      ~onCloseAutoFocus: ReactEvent.Focus.t => unit=?,
      ~onEscapeKeyDown: ReactEvent.Keyboard.t => unit=?,
      ~onPointerDownOutside: ReactEvent.Pointer.t => unit=?,
      ~onInteractionOutside: ReactEvent.Focus.t => unit=?
    ) =>
    React.element =
    "Content";
};

module Overlay = {
  [@mel.module "@radix-ui/react-dialog"] [@react.component]
  external make:
    (~children: React.element, ~asChild: bool=?, ~forceMount: bool=?) =>
    React.element =
    "Overlay";
};

module Close = {
  [@mel.module "@radix-ui/react-dialog"] [@react.component]
  external make: (~asChild: bool=?, ~children: React.element) => React.element =
    "Close";
};

module Title = {
  [@mel.module "@radix-ui/react-dialog"] [@react.component]
  external make: (~asChild: bool=?, ~children: React.element) => React.element =
    "Title";
};

module Description = {
  [@mel.module "@radix-ui/react-dialog"] [@react.component]
  external make: (~asChild: bool=?, ~children: React.element) => React.element =
    "Description";
};
