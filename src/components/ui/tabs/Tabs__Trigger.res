module Internal = {
  @module("@radix-ui/react-tabs") @react.component
  external make: (~className: string=?, ~value: string, ~children: React.element) => React.element =
    "Trigger"
}

@react.component
let make = (~className=?, ~value, ~children) =>
  <Internal
    className={Utils.cn([
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className->Option.getWithDefault(""),
    ])}
    value>
    children
  </Internal>
