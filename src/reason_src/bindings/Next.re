module Image = {
  [@mel.module "next/image"] [@mel.scope "default"] [@react.component]
  external make:
    (
      ~src: string,
      ~alt: string,
      ~width: int=?,
      ~height: int=?,
      ~fill: bool=?,
      ~quality: int=?,
      ~priority: bool=?,
      ~placeholder: [ | `blur | `empty]=?,
      ~objectFit: [@mel.string] [
                    | `fill
                    | `contain
                    | `cover
                    | `none
                    | [@mel.as "scale-down"] `scale_down
                  ]
                    =?,
      ~objectPosition: string=?,
      ~layout: string=?,
      ~sizes: string=?,
      ~unoptimized: bool=?,
      ~lazyBoundary: string=?,
      ~lazyRoot: string=?,
      ~loading: [@mel.string] [ | `eager | [@mel.as "lazy"] `lazy_]=?,
      ~className: string=?
    ) =>
    React.element =
    "default";
};

module Link = {
  [@mel.module "next/link"] [@react.component]
  external make:
    (
      ~href: string,
      ~_as: string=?,
      ~replace: bool=?,
      ~scroll: bool=?,
      ~shallow: bool=?,
      ~passHref: bool=?,
      ~prefetch: bool=?,
      ~locale: string=?,
      ~className: string=?,
      ~children: React.element
    ) =>
    React.element =
    "default";
};
