// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as $$Image from "next/image";
import * as MaxWidthWrapper from "../../../../../../components/MaxWidthWrapper.bs.mjs";
import * as JsxRuntime from "react/jsx-runtime";

function CoupleInformationPage$default(props) {
  return JsxRuntime.jsx(MaxWidthWrapper.make, {
              children: JsxRuntime.jsxs(React.Suspense, {
                    children: [
                      JsxRuntime.jsxs("section", {
                            children: [
                              JsxRuntime.jsxs("div", {
                                    children: [
                                      JsxRuntime.jsx("h3", {
                                            children: "Couple Information",
                                            className: "font-display text-4xl"
                                          }),
                                      JsxRuntime.jsx("p", {
                                            children: "Detail for couple information.",
                                            className: "text-muted-foreground"
                                          })
                                    ],
                                    className: "space-y-0"
                                  }),
                              JsxRuntime.jsx("div", {
                                    className: "flex pt-8"
                                  })
                            ],
                            className: "max-w-xl flex-1 py-10"
                          }),
                      JsxRuntime.jsx($$Image.default.default, {
                            src: "/_static/couple-information.png",
                            alt: "Couple Information",
                            width: 300,
                            height: 400,
                            priority: true,
                            className: "sticky top-24 w-[300px] self-baseline pt-4 2xl:w-[400px]"
                          })
                    ]
                  })
            });
}

var $$default = CoupleInformationPage$default;

export {
  $$default ,
  $$default as default,
}
/* react Not a pure module */
