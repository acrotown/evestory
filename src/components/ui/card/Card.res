module Card = {
  @react.component
  let make = (~children, ~className=?) => {
    let cn = switch className {
    | None => ""
    | Some(className) => className
    }

    <div className={Utils.cn(["rounded-xl border bg-card text-card-foreground shadow", cn])}>
      children
    </div>
  }
}

module Header = {
  @react.component
  let make = (~children, ~className=?) => {
    let cn = switch className {
    | None => ""
    | Some(className) => className
    }

    <div className={Utils.cn(["flex flex-col space-y-1.5 p-6", cn])}> children </div>
  }
}

module Title = {
  @react.component
  let make = (~children, ~className=?) => {
    let cn = switch className {
    | None => ""
    | Some(className) => className
    }

    <h1 className={Utils.cn(["font-semibold leading-none tracking-tight", cn])}> children </h1>
  }
}

module Description = {
  @react.component
  let make = (~children, ~className=?) => {
    let cn = switch className {
    | None => ""
    | Some(className) => className
    }

    <p className={Utils.cn(["text-sm text-muted-foreground", cn])}> children </p>
  }
}

module Content = {
  @react.component
  let make = (~children, ~className=?) => {
    let cn = switch className {
    | None => ""
    | Some(className) => className
    }

    <div className={Utils.cn(["p-6 pt-0", cn])}> children </div>
  }
}

module Footer = {
  @react.component
  let make = (~children, ~className=?) => {
    let cn = switch className {
    | None => ""
    | Some(className) => className
    }

    <div className={Utils.cn(["flex items-center p-6 pt-0", cn])}> children </div>
  }
}
