module Internal = {
  @module("@radix-ui/react-tabs") @react.component
  external make: (~className: string=?, ~children: React.element) => React.element = "List"
}

@react.component
let make = (~className as cn=?, ~children) =>
  <Internal
    className={Utils.cn([
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      cn->Option.getWithDefault(""),
    ])}>
    children
  </Internal>
