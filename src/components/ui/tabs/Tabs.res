@@directive("'use client'")

module Root = Tabs__Root

module List = {
  @react.component
  let make = (~className=?, ~children) => {
    let cn = switch className {
    | None => ""
    | Some(className) => className
    }

    <Tabs__List
      className={Utils.cn([
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        cn,
      ])}>
      children
    </Tabs__List>
  }
}

module Trigger = {
  @react.component
  let make = (~className=?, ~value, ~children) => {
    let cn = switch className {
    | None => ""
    | Some(className) => className
    }

    <Tabs__Trigger
      className={Utils.cn([
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        cn,
      ])}
      value>
      children
    </Tabs__Trigger>
  }
}

module Content = {
  @react.component
  let make = (~children, ~className=?, ~value) => {
    let cn = switch className {
    | None => ""
    | Some(className) => className
    }

    <Tabs__Content
      className={Utils.cn([
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        cn,
      ])}
      value>
      children
    </Tabs__Content>
  }
}
