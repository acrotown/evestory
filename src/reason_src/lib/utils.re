module Clsx = {
  [@mel.module "clsx"] external clsx: string => string = "clsx";
};

module Nanoid = {
  [@mel.module "nanoid"]
  external customeAlpahbet: (string, int) => string = "customAlphabet";
};

module TailwindMerge = {
  [@mel.module "tailwind-merge"]
  external twMerge: array(string) => string = "twMerge";
};

let cn = inputs => {
  inputs |> Array.map(Clsx.clsx) |> TailwindMerge.twMerge;
};

let nanoid = Nanoid.customeAlpahbet("abcdefghijklmnopqrstuvwxyz", 9);
