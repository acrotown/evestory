[@react.component]
let make = (~className=?, ~children) => {
  <div
    className={Lib.Utils.cn([|
      "mx-auto w-full max-w-screen-xl px-6 lg:px-6",
      className->Belt.Option.getWithDefault(""),
    |])}>
    children
  </div>;
};
