[@mel.config {flags: [|"--preamble", "\"use client\";"|]}];

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
  React.forwardRef(
    (
      ~className=?,
      ~asChild=false,
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
      ~onClick: ReactEvent.Mouse.t => unit=_ => (),
      ~onContextMenu: ReactEvent.Mouse.t => unit=_ => (),
      ~onDoubleClick: ReactEvent.Mouse.t => unit=_ => (),
      ~onDrag: ReactEvent.Drag.t => unit=_ => (),
      ~onDragEnd: ReactEvent.Drag.t => unit=_ => (),
      ~onDragEnter: ReactEvent.Drag.t => unit=_ => (),
      ~onDragExit: ReactEvent.Drag.t => unit=_ => (),
      ~onDragLeave: ReactEvent.Drag.t => unit=_ => (),
      ~onDragOver: ReactEvent.Drag.t => unit=_ => (),
      ~onDragStart: ReactEvent.Drag.t => unit=_ => (),
      ~onDrop: ReactEvent.Drag.t => unit=_ => (),
      ~onMouseDown: ReactEvent.Mouse.t => unit=_ => (),
      ~onMouseEnter: ReactEvent.Mouse.t => unit=_ => (),
      ~onMouseLeave: ReactEvent.Mouse.t => unit=_ => (),
      ~onMouseMove: ReactEvent.Mouse.t => unit=_ => (),
      ~onMouseOut: ReactEvent.Mouse.t => unit=_ => (),
      ~onMouseOver: ReactEvent.Mouse.t => unit=_ => (),
      ~onMouseUp: ReactEvent.Mouse.t => unit=_ => (),
      ref_,
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

    asChild
      ? <Radix.Slot
          className=cn
          ref=?{
            Js.Nullable.toOption(ref_)->Belt.Option.map(ReactDOM.Ref.domRef)
          }>
          children
        </Radix.Slot>
      : <button
          ref=?{
            Js.Nullable.toOption(ref_)->Belt.Option.map(ReactDOM.Ref.domRef)
          }
          type_="button"
          className=cn
          onClick
          onContextMenu
          onDoubleClick
          onDrag
          onDragEnd
          onDragEnter
          onDragExit
          onDragLeave
          onDragOver
          onDragStart
          onDrop
          onMouseDown
          onMouseEnter
          onMouseLeave
          onMouseMove
          onMouseOut
          onMouseOver
          onMouseUp>
          children
        </button>;
  });
