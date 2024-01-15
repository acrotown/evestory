open Lib;
open Belt;

module Root = {
  [@mel.module "@radix-ui/react-tabs"] [@react.component]
  external make:
    (
      ~defaultValue: string=?,
      ~value: string=?,
      ~onChange: string => unit=?,
      ~className: string=?,
      ~children: React.element
    ) =>
    React.element =
    "Root";
};

module Trigger = {
  module T = {
    [@mel.module "@radix-ui/react-tabs"] [@react.component]
    external make:
      (~className: string=?, ~value: string, ~children: React.element) =>
      React.element =
      "Trigger";
  };

  [@react.component]
  let make = (~className=?, ~value, ~children) =>
    <T
      className={Utils.cn([|
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        className->Option.getWithDefault(""),
      |])}
      value>
      children
    </T>;
};

module List = {
  module T = {
    [@mel.module "@radix-ui/react-tabs"] [@react.component]
    external make:
      (~className: string=?, ~children: React.element) => React.element =
      "List";
  };

  [@react.component]
  let make = (~className=?, ~children) =>
    <T
      className={Utils.cn([|
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className->Option.getWithDefault(""),
      |])}>
      children
    </T>;
};

module Content = {
  module T = {
    [@mel.module "@radix-ui/react-tabs"] [@react.component]
    external make:
      (~className: string=?, ~value: string, ~children: React.element) =>
      React.element =
      "Content";
  };

  [@react.component]
  let make = (~className=?, ~value, ~children) =>
    <T
      className={Utils.cn([|
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className->Option.getWithDefault(""),
      |])}
      value>
      children
    </T>;
};
