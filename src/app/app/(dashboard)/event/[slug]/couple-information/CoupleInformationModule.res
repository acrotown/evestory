type rec input = {
  event_name: string,
  description: option<string>,
  is_show_groom_name_first: bool,
  groom_name: string,
  bride_name: string,
  website_url: string,
}
module Form = ReactHookForm.Make({
  type t = input
})

module FormInput = {
  module EventName = Form.MakeInput({
    type t = string
    let name = "event_name"
    let config = ReactHookForm.Rules.make({
      required: true,
      minLength: 3,
    })
  })
}
