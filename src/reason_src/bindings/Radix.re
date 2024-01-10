module Slot = {
  [@mel.module "@radix-ui/react-slot"] [@react.component]
  external make:
    (~className: string=?, ~children: React.element) => React.element =
    "Slot";
};
