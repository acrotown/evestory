// module Form =

type rec input = {
  id: string,
  password: string,
  hobbies: array<hobby>,
}
and hobby = {value: string}

module Formm = ReactHookForm.Make({
  type t = input
})

module Id = Formm.MakeInput({
  type t = string
  let name = "id"
  let config = ReactHookForm.Rules.make({
    required: true,
    minLength: 3,
    maxLength: 10,
  })
})
