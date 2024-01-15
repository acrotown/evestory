type cvaConfig = {
  variants: Js.Dict.t(Js.Dict.t(string)),
  defaultVariants: Js.Dict.t(string),
};

[@deriving abstract]
type cvaProps = {
  className: string,
  [@mel.optional]
  variants: option(Js.Dict.t(string)),
  [@mel.optional]
  defaultVariants: option(Js.Dict.t(string)),
};

[@deriving abstract]
type cvaProps2 = {
  className: string,
  // TODO: `variant` and `size` should be generic from `cvaConfig`.variants
  variant: string,
  size: string,
};

// type t = (~defaultClasses: string, cvaConfig, cvaProps) => string;
type t = (~defaultClasses: string, cvaConfig, cvaProps2) => string;

[@mel.module "class-variance-authority"] external make: t = "cva";
