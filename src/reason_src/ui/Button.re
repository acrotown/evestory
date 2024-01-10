open Bindings;
open Lib;

let config: CVA.cvaConfig = {
  variants:
    Js.Dict.fromArray([|
      (
        "variant",
        Js.Dict.fromArray([|
          (
            "default",
            "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          ),
          (
            "destructive",
            "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
          ),
          (
            "outline",
            "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
          ),
          (
            "secondary",
            "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
          ),
          ("ghost", "hover:bg-accent hover:text-accent-foreground"),
          ("link", "text-primary underline-offset-4 hover:underline"),
        |]),
      ),
      (
        "size",
        Js.Dict.fromArray([|
          ("default", "px-4 py-2 rounded-md"),
          ("sm", "h-8 rounded-md px-3 text-xs"),
          ("lg", "h-10 rounded-md px-8"),
          ("icon", "h-9 w-9"),
        |]),
      ),
    |]),
  defaultVariants:
    Js.Dict.fromArray([|("variant", "default"), ("size", "default")|]),
};

let button_variants =
  CVA.make(
    ~defaultClasses=
      "inline-flex select-none items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    config,
  );

[@react.component]
let make =
    (
      ~className=?,
      ~asChild=?,
      ~variant: [
         | `default
         | `destructive
         | `outline
         | `secondary
         | `ghost
         | `link
       ]=`default,
      ~size: [ | `default | `sm | `lg | `icon]=`default,
      ~children,
    ) => {
  let variant_to_string =
    switch (variant) {
    | `default => "default"
    | `destructive => "destructive"
    | `outline => "outline"
    | `secondary => "secondary"
    | `ghost => "ghost"
    | `link => "link"
    };

  let size_to_string =
    switch (size) {
    | `default => "default"
    | `sm => "sm"
    | `lg => "lg"
    | `icon => "icon"
    };

  let cn =
    [|
      button_variants({
        className: className |> Js.Option.getWithDefault(""),
        size: size_to_string,
        variant: variant_to_string,
      }),
    |]
    |> Utils.cn;

  switch (asChild) {
  | Some(_) =>
    <Bindings.Radix.Slot className=cn> children </Bindings.Radix.Slot>
  | None => <button className=cn> children </button>
  };
};
