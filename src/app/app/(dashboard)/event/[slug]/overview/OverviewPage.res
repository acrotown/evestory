@@directive("'use client'")

module D = {
  @decco
  type t = {
    name: string,
    age: int,
  }
  external toJson: 'a => Js.Json.t = "%identity"
}

@react.component
let default = () => {
  <MaxWidthWrapper>
    <section className="pt-10">
      <React.Suspense fallback={<div> {"Loading..."->React.string} </div>}>
        <div className="space-y-6">
          <h1 className="font-display text-4xl"> {"Dashboard"->React.string} </h1>
          <Tabs.Root defaultValue="overview" className="space-y-4">
            <Tabs.List>
              <Tabs.Trigger value="overview" className="bg-slate-50">
                {"Overview"->React.string}
              </Tabs.Trigger>
              <Tabs.Trigger value="guest_list"> {"Guest List"->React.string} </Tabs.Trigger>
              <Tabs.Trigger value="other"> {"Other"->React.string} </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="overview">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card.Card className="w-full">
                  <Card.Header
                    className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Card.Title> {"Total Guests"->React.string} </Card.Title>
                    <RadixIcon.Person />
                  </Card.Header>
                  <Card.Content>
                    <div className="text-2xl font-bold"> {"219"->React.string} </div>
                  </Card.Content>
                </Card.Card>
                <Card.Card className="w-full">
                  <Card.Header
                    className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Card.Title> {"Total Guests"->React.string} </Card.Title>
                    <RadixIcon.Person />
                  </Card.Header>
                  <Card.Content>
                    <div className="text-2xl font-bold"> {"146"->React.string} </div>
                  </Card.Content>
                </Card.Card>
                <Card.Card className="w-full">
                  <Card.Header
                    className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Card.Title> {"Total Guests"->React.string} </Card.Title>
                    <RadixIcon.Person />
                  </Card.Header>
                  <Card.Content>
                    <div className="text-2xl font-bold"> {"421"->React.string} </div>
                  </Card.Content>
                </Card.Card>
              </div>
            </Tabs.Content>
            <Tabs.Content value="guest_list">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card.Card className="w-full">
                  <Card.Header
                    className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Card.Title> {"Total Guests"->React.string} </Card.Title>
                    <RadixIcon.Person />
                  </Card.Header>
                  <Card.Content>
                    <div className="text-2xl font-bold"> {"219"->React.string} </div>
                  </Card.Content>
                </Card.Card>
              </div>
            </Tabs.Content>
            <Tabs.Content value="other">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card.Card className="w-full">
                  <Card.Header
                    className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Card.Title> {"Total Guests"->React.string} </Card.Title>
                    <RadixIcon.Person />
                  </Card.Header>
                  <Card.Content>
                    <div className="text-2xl font-bold"> {"219"->React.string} </div>
                  </Card.Content>
                </Card.Card>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </React.Suspense>
    </section>
  </MaxWidthWrapper>
}
