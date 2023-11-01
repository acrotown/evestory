@react.component
let make = (~className: option<string>=?, ~children: React.element) => {
  switch className {
  | Some(className) =>
    <div className={Utils.cn(["mx-auto w-full max-w-screen-xl px-6 lg:px-6", className])}>
      children
    </div>
  | None => <div className="mx-auto w-full max-w-screen-xl px-6 lg:px-6"> children </div>
  }
}
