module Internal = {
  @module("@radix-ui/react-tabs") @react.component
  external make: (~className: string=?, ~value: string, ~children: React.element) => React.element =
    "Content"
}

@react.component
let make = (~children, ~className as cn=?, ~value) => {
  // let mp = makeProps(~className, ~value, children, cn)
  <Internal
    className={Utils.cn([
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      cn->Option.getWithDefault(""),
    ])}
    value>
    children
  </Internal>
}
