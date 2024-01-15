module Provider = {
  [@mel.module "next-themes"] [@react.component]
  external make:
    (
      ~children: React.element,
      ~attribute: string=?,
      ~defaultTheme: string=?,
      ~enableSystem: bool=?,
      ~disableTransitionOnChange: bool=?,
      ~storageKey: string=?
    ) =>
    React.element =
    "ThemeProvider";
};

module Theme = {
  type t = {
    theme: string,
    setTheme: string => unit,
    themes: [ | `dark | `light | `system],
  };

  [@mel.module "next-themes"] external useTheme: unit => t = "useTheme";

  [@mel.send]
  external setTheme: (t, [ | `dark | `light | `system]) => unit = "setTheme";
};
