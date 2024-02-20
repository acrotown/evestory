@react.component
let default = () => {
  <MaxWidthWrapper>
    <React.Suspense>
      <section className="max-w-xl flex-1 py-10">
        <div className="space-y-0">
          <h3 className="font-display text-4xl"> {"Couple Information"->React.string} </h3>
          <p className="text-muted-foreground">
            {"Detail for couple information."->React.string}
          </p>
        </div>
        <div className="flex pt-8">
          // <CoupleInformationForm event={event} />
        </div>
      </section>
      <Next.Image
        src="/_static/couple-information.png"
        alt="Couple Information"
        priority=true
        width={300}
        height={400}
        className="sticky top-24 w-[300px] self-baseline pt-4 2xl:w-[400px]"
      />
    </React.Suspense>
  </MaxWidthWrapper>
}
