open Ui;

[@react.component]
let make = () => {
  let (open_, setOpen) = React.useState(() => false);

  <SheetRoot _open=open_ onOpenChange={_ => setOpen(prev => prev)}>
    <SheetTrigger>
      <Button
        variant=`ghost
        size=`icon
        className="p-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
        <RadixIcons.ViewVertical />
        <span className="sr-only"> "Toggle Menu"->React.string </span>
      </Button>
    </SheetTrigger>
  </SheetRoot>;
};
