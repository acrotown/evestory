module Clsx = {
  // type classValue =
  //   | ClassArray
  //   | ClassDictionary
  //   | String
  //   | Int
  //   | Bool

  // type classDictionary = Js.Dict.t<Js.Json.t>
  // type classArray = array<classValue>
  @module("clsx")
  external clsx: string => string = "clsx"
}

module Nanoid = {
  @module("nanoid")
  external customAlphabet: (string, int) => string = "customAlphabet"
}

module TailwindMerge = {
  @module("tailwind-merge")
  external twMerge: array<string> => string = "twMerge"
}
let cn = (inputs: array<'a>): string => {
  inputs->Array.map(Clsx.clsx)->TailwindMerge.twMerge
}

let nanoid = Nanoid.customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  9,
)

module Metadata = {
  type metadata = {
    "title": string,
    "description": string,
    "image": string,
    "icons": string,
    "noIndex": bool,
  }

  external constructMetadata: metadata => {
    "title": string,
    "description": string,
    "openGraph": {"title": string, "description": string, "images": array<{"url": string}>},
    "twitter": {
      "card": string,
      "title": string,
      "description": string,
      "images": array<string>,
      "creator": string,
    },
    "icons": string,
    "metadataBase": string,
    "themeColor": string,
    "robots": {"index": bool, "follow": bool},
  } = "constructMetadata"
}
