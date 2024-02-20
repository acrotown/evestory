import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

export enum Mode {
  Edit = "edit",
  Create = "create",
  Delete = "delete",
  Preview = "preview",
}

export function useSubEventSearchParams() {
  return useQueryStates(
    {
      event_id: parseAsString.withDefault(""),
      sub_event_id: parseAsString.withDefault(""),
      mode: parseAsStringEnum<Mode>(Object.values(Mode)),
    },
    {
      history: "replace",
    },
  );
}
