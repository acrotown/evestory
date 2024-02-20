import { useMediaQuery } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Mode, useSubEventSearchParams } from "../hooks";
import { SubEventForm } from "./sub-event-form";
import { SubEventPreview } from "./sub-event-preview";

export default function SubEventModal() {
  let [subEventSP, setSubEventSP] = useSubEventSearchParams();
  let [open, setOpen] = useState(false);
  let isDesktop = useMediaQuery("(min-width: 768px)");

  let mode =
    subEventSP.mode === Mode.Create
      ? "Create"
      : subEventSP.mode === Mode.Edit
      ? "Edit"
      : subEventSP.mode === Mode.Preview
      ? "Preview"
      : "";

  let handleOpenChange = (e: boolean) => {
    if (!e) {
      setSubEventSP({
        mode: null,
        sub_event_id: null,
        event_id: null,
      });
      setOpen(e);
    }
  };

  useEffect(() => {
    if (subEventSP.mode === Mode.Edit && subEventSP.sub_event_id !== null) {
      setOpen(true);
    } else if (
      subEventSP.mode === Mode.Create &&
      subEventSP.event_id !== null
    ) {
      setOpen(true);
    } else if (subEventSP.mode === Mode.Preview) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [subEventSP]);

  return isDesktop ? (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        {subEventSP.mode === Mode.Preview && <SubEventPreview />}
        {subEventSP.mode &&
          [Mode.Create, Mode.Edit].includes(subEventSP.mode) && (
            <>
              <DialogHeader>
                <DialogTitle>{mode} schedule</DialogTitle>
                <DialogDescription>
                  {mode} a schedule to the wedding day.
                </DialogDescription>
              </DialogHeader>
              <SubEventForm />
            </>
          )}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          {subEventSP.mode === Mode.Preview && <SubEventPreview />}
          {subEventSP.mode &&
            [Mode.Create, Mode.Edit].includes(subEventSP.mode) && (
              <>
                <DrawerTitle>{mode} schedule</DrawerTitle>
                <DrawerDescription>
                  {mode} a schedule to the wedding day.
                </DrawerDescription>
                <SubEventForm />
              </>
            )}
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
