[@mel.config {flags: [|"--preamble", "\"use client\";"|]}];

open Lib.Utils;
open Ui;
open Bindings;

[@react.component]
let make = () => {
  let useTheme = NextThemes.Theme.useTheme();
  let setTheme = NextThemes.Theme.setTheme(useTheme);

  <DropdownMenuRoot>
    <DropdownMenuTrigger
      className={
        [|
          Button.button_variants({
            variant: "ghost",
            size: "icon",
            className: "",
          }),
        |]
        |> cn
      }>
      <>
        <RadixIcons.Sun
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <RadixIcons.Moon
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span className="sr-only"> {React.string("Toggle theme")} </span>
      </>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuMenuItem onSelect={_ => setTheme(`light)}>
        <RadixIcons.Sun className="mr-2" />
        <span> {React.string("Light")} </span>
      </DropdownMenuMenuItem>
      <DropdownMenuMenuItem onSelect={_ => setTheme(`dark)}>
        <RadixIcons.Moon className="mr-2" />
        <span> {React.string("Dark")} </span>
      </DropdownMenuMenuItem>
      <DropdownMenuMenuItem onSelect={_ => setTheme(`system)}>
        <RadixIcons.Laptop className="mr-2" />
        <span> {React.string("System")} </span>
      </DropdownMenuMenuItem>
    </DropdownMenuContent>
  </DropdownMenuRoot>;
};
