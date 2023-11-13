module Card = {
  @react.component
  let make = (~children, ~className=?) => {
    <div
      className={Utils.cn([
        "rounded-xl border bg-card text-card-foreground shadow",
        className->Option.getWithDefault(""),
      ])}>
      children
    </div>
  }
}

module Header = {
  @react.component
  let make = (~children, ~className=?) => {
    <div
      className={Utils.cn(["flex flex-col space-y-1.5 p-6", className->Option.getWithDefault("")])}>
      children
    </div>
  }
}

module Title = {
  @react.component
  let make = (~children, ~className=?) => {
    <h1
      className={Utils.cn([
        "font-semibold leading-none tracking-tight",
        className->Option.getWithDefault(""),
      ])}>
      children
    </h1>
  }
}

module Description = {
  @react.component
  let make = (~children, ~className=?) => {
    <p
      className={Utils.cn(["text-sm text-muted-foreground", className->Option.getWithDefault("")])}>
      children
    </p>
  }
}

module Content = {
  @react.component
  let make = (~children, ~className=?) => {
    <div className={Utils.cn(["p-6 pt-0", className->Option.getWithDefault("")])}> children </div>
  }
}

module Footer = {
  @react.component
  let make = (~children, ~className=?) => {
    <div className={Utils.cn(["flex items-center p-6 pt-0", className->Option.getWithDefault("")])}>
      children
    </div>
  }
}
