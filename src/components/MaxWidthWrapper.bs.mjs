// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Utils from "../lib/Utils.bs.mjs";
import * as JsxRuntime from "react/jsx-runtime";

function MaxWidthWrapper(props) {
  var children = props.children;
  var className = props.className;
  if (className !== undefined) {
    return JsxRuntime.jsx("div", {
                children: children,
                className: Utils.cn([
                      "mx-auto w-full max-w-screen-xl px-6 lg:px-6",
                      className
                    ])
              });
  } else {
    return JsxRuntime.jsx("div", {
                children: children,
                className: "mx-auto w-full max-w-screen-xl px-6 lg:px-6"
              });
  }
}

var make = MaxWidthWrapper;

export {
  make ,
}
/* Utils Not a pure module */