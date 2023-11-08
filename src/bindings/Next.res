module Image = {
  type placeholder = [#blur | #empty]
  // type loading = [#eager | @as("lazy") #lazyy]
  type loading = [#eager | #"lazy"]

  @module("next/image") @react.component
  external make: (
    ~src: string,
    ~alt: string,
    ~width: int=?,
    ~height: int=?,
    ~fill: bool=?,
    ~quality: int=?,
    ~priority: bool=?,
    ~placeholder: placeholder=?,
    ~objectFit: string=?,
    ~objectPosition: string=?,
    ~layout: string=?,
    ~sizes: string=?,
    ~unoptimized: bool=?,
    ~lazyBoundary: string=?,
    ~lazyRoot: string=?,
    ~loading: loading=?,
    ~className: string=?,
  ) => React.element = "default"
}

module Link = {
  type url = {}
  type locale = [
    | #StringLocale(string)
    | @as(false) #false_
  ]
  @module("next/link") @react.component
  external make: (
    /*
     * The path or URL to navigate to. It can also be an object.
     *
     * @example https://nextjs.org/docs/api-reference/next/link#with-url-object
     */
    // ~href: Url,
    // ~href: string,
    ~href: locale,
    /*
     * Optional decorator for the path that will be shown in the browser URL bar. Before Next.js 9.5.3 this was used for dynamic routes, check our [previous docs](https://github.com/vercel/next.js/blob/v9.5.2/docs/api-reference/next/link.md#dynamic-routes) to see how it worked. Note: when this path differs from the one provided in `href` the previous `href`/`as` behavior is used as shown in the [previous docs](https://github.com/vercel/next.js/blob/v9.5.2/docs/api-reference/next/link.md#dynamic-routes).
     */
    // as?: Url,

    @as("as") ~as_: string=?,
    /*
     * Replace the current `history` state instead of adding a new url into the stack.
     *
     * @defaultValue `false`
     */
    ~replace: bool=?,
    /*
     * Whether to override the default scroll behavior
     *
     * @example https://nextjs.org/docs/api-reference/next/link#disable-scrolling-to-the-top-of-the-page
     *
     * @defaultValue `true`
     */
    ~scroll: bool=?,
    /*
     * Update the path of the current page without rerunning [`getStaticProps`](/docs/basic-features/data-fetching/get-static-props.md), [`getServerSideProps`](/docs/basic-features/data-fetching/get-server-side-props.md) or [`getInitialProps`](/docs/api-reference/data-fetching/get-initial-props.md).
     *
     * @defaultValue `false`
     */
    ~shallow: bool=?,
    /*
     * Forces `Link` to send the `href` property to its child.
     *
     * @defaultValue `false`
     */
    ~passHref: bool=?,
    /*
     * Prefetch the page in the background.
     * Any `<Link />` that is in the viewport (initially or through scroll) will be preloaded.
     * Prefetch can be disabled by passing `prefetch={false}`. When `prefetch` is set to `false`, prefetching will still occur on hover. Pages using [Static Generation](/docs/basic-features/data-fetching/get-static-props.md) will preload `JSON` files with the data for faster page transitions. Prefetching is only enabled in production.
     *
     * @defaultValue `true`
     */
    ~prefetch: bool=?,
    /*
     * The active locale is automatically prepended. `locale` allows for providing a different locale.
     * When `false` `href` has to include the locale as the default behavior is disabled.
     */
    // ~locale: string | false,
    // ~locale: [#String(string) | #False]=?,
    ~locale: locale=?,
    /*
     * Enable legacy link behavior.
     * @defaultValue `false`
     * @see https://github.com/vercel/next.js/commit/489e65ed98544e69b0afd7e0cfc3f9f6c2b803b7
     */
    ~legacyBehavior: bool=?,
    /*
     * Optional event handler for when the mouse pointer is moved onto Link
     */
    // onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>,
    /*
     * Optional event handler for when Link is touched.
     */
    // onTouchStart?: React.TouchEventHandler<HTMLAnchorElement>,
    /*
     * Optional event handler for when Link is clicked.
     */
    // onClick?: React.MouseEventHandler<HTMLAnchorElement>,
    ~className: string=?,
    ~children: React.element=?,
  ) => React.element = "default"
}
