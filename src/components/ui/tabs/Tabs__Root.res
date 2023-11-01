@module("@radix-ui/react-tabs") @react.component
external make: (
  ~defaultValue: string=?,
  ~value: string=?,
  ~onChange: string => unit=?,
  ~className: string=?,
  ~children: React.element,
) => React.element = "Root"
