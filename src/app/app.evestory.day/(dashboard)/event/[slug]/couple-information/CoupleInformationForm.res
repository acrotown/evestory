@@directive("'use client'")

@react.component
let make = () => {
  let form = CoupleInformationModule.Form.use(
    ~config={
      defaultValues: {
        event_name: "",
        description: None,
        is_show_groom_name_first: false,
        groom_name: "",
        bride_name: "",
        website_url: "",
      },
    },
  )
  let formState = form->CoupleInformationModule.Form.formState
  let isValid = formState.isValid
  <MaxWidthWrapper> {"hello"->React.string} </MaxWidthWrapper>
}
