module Person = {
  @module("@radix-ui/react-icons") @react.component
  external make: (~className: string=?) => React.element = "PersonIcon"
}

module Reload = {
  @module("@radix-ui/react-icons") @react.component
  external make: (~className: string=?) => React.element = "ReloadIcon"
}
