[@mel.config {flags: [|"--preamble", "\"use client\";"|]}];

open Lib.Utils;
open Belt;
open Bindings;

module Root = {
  [@mel.module "@radix-ui/react-dropdown-menu"] [@react.component]
  external make:
    (
      ~children: React.element,
      ~defaultOpen: bool=?,
      ~_open: bool=?,
      ~onOpenChange: bool => unit=?,
      ~modal: bool=?,
      ~dir: [ | `ltr | `rtl]=?
    ) =>
    React.element =
    "Root";
};

module Trigger = {
  module T = {
    [@mel.module "@radix-ui/react-dropdown-menu"] [@react.component]
    external make:
      (
        ~asChild: bool=?,
        ~className: string=?,
        ~children: React.element,
        ~ref: ReactDOM.domRef=?
      ) =>
      React.element =
      "Trigger";
  };

  [@react.component]
  let make =
    React.forwardRef((~asChild=false, ~className="", ~children, ref_) => {
      asChild
        ? <Radix.Slot
            className={[|className|] |> cn}
            ref=?{
              Js.Nullable.toOption(ref_)
              ->Belt.Option.map(ReactDOM.Ref.domRef)
            }>
            children
          </Radix.Slot>
        : <T
            className={[|className|] |> cn}
            ref=?{
              Js.Nullable.toOption(ref_)
              ->Belt.Option.map(ReactDOM.Ref.domRef)
            }>
            children
          </T>
    });
};

module Group = {
  [@mel.module "@radix-ui/react-dropdown-menu"] [@react.component]
  external make: (~children: React.element) => React.element = "Group";
};

module Portal = {
  [@mel.module "@radix-ui/react-dropdown-menu"] [@react.component]
  external make:
    (~children: React.element, ~forceMount: bool=?) => React.element =
    "Portal";
};

module Sub = {
  [@mel.module "@radix-ui/react-dropdown-menu"] [@react.component]
  external make: (~children: React.element) => React.element = "Sub";
};

module RadioGroup = {
  [@mel.module "@radix-ui/react-dropdown-menu"] [@react.component]
  external make: (~children: React.element) => React.element = "RadioGroup";
};

module SubTrigger = {
  module T = {
    [@mel.module "@radix-ui/react-dropdown-menu"] [@react.component]
    external make:
      (~className: string=?, ~inset: bool=?, ~children: React.element) =>
      React.element =
      "SubTrigger";
  };

  [@react.component]
  let make = (~className=?, ~inset=?, ~children) =>
    <T
      className={cn([|
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        Option.isSome(inset) ? "pl-8" : "",
        className->Option.getWithDefault(""),
      |])}>
      children
      <RadixIcons.ChevronRight className="ml-auto h-4 w-4" />
    </T>;
};

module Content = {
  module T = {
    [@mel.module "@radix-ui/react-dropdown-menu"] [@react.component]
    external make:
      (
        ~className: string=?,
        ~asChild: bool=?,
        ~sideOffset: int=?,
        ~children: React.element,
        ~ref: ReactDOM.domRef=?
      ) =>
      React.element =
      "Content";
  };

  [@react.component]
  let make =
    React.forwardRef(
      (~className=?, ~asChild=false, ~sideOffset=4, ~children, ref_) =>
      <Portal>
        <T
          className={cn([|
            "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className->Option.getWithDefault(""),
          |])}
          asChild
          sideOffset
          ref=?{
            Js.Nullable.toOption(ref_)->Belt.Option.map(ReactDOM.Ref.domRef)
          }>
          children
        </T>
      </Portal>
    );
};

module MenuItem = {
  module T = {
    [@mel.module "@radix-ui/react-dropdown-menu"] [@react.component]
    external make:
      (
        ~className: string=?,
        ~asChild: bool=?,
        ~disabled: bool=?,
        ~textValue: string=?,
        ~inset: bool=?,
        ~onSelect: ReactEvent.Mouse.t => unit=?,
        ~children: React.element
      ) =>
      React.element =
      "Item";
  };

  [@react.component]
  let make =
      (
        ~className=?,
        ~asChild=false,
        ~disabled=false,
        ~textValue="",
        ~inset=?,
        ~onSelect=?,
        ~children,
      ) => {
    <T
      asChild
      disabled
      textValue
      ?onSelect
      className={cn([|
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        Option.isSome(inset) ? "pl-8" : "",
        className->Option.getWithDefault(""),
      |])}>
      children
    </T>;
  };
};
