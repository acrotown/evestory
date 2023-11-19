// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Utils from "../../../lib/Utils.bs.mjs";
import * as Core__Option from "@rescript/core/src/Core__Option.bs.mjs";
import * as JsxRuntime from "react/jsx-runtime";
import * as ReactTabs from "@radix-ui/react-tabs";

var Internal = {};

function Tabs__Content(props) {
  return JsxRuntime.jsx(ReactTabs.Content, {
              className: Utils.cn([
                    "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    Core__Option.getWithDefault(props.className, "")
                  ]),
              value: props.value,
              children: props.children
            });
}

var make = Tabs__Content;

export {
  Internal ,
  make ,
}
/* Utils Not a pure module */