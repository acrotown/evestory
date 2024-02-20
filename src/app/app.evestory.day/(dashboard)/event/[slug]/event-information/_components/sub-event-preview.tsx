import {
  CalendarIcon,
  ClockIcon,
  DashIcon,
  DotFilledIcon,
  SewingPinFilledIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import { subEvents } from "#/drizzle/schema";

import { getSubEvent } from "../_action/get-sub-event";
import { Mode, useSubEventSearchParams } from "../hooks";

export function SubEventPreview() {
  let [subEvent, setSubEvent] = useState<
    typeof subEvents.$inferSelect | undefined
  >(undefined);
  let [isFetching, setIsFetching] = useState(false);
  let [subEventSP, setSubEventSP] = useSubEventSearchParams();

  useEffect(() => {
    async function fetch() {
      if (
        subEventSP.mode === Mode.Preview &&
        subEventSP.sub_event_id !== null
      ) {
        setIsFetching(true);
        let res = await getSubEvent(subEventSP.sub_event_id);
        if (res) {
          setSubEvent(res);
        } else {
          toast.error("Schedule not found.");
          setSubEventSP({
            mode: null,
            sub_event_id: null,
            event_id: null,
          });
        }

        setIsFetching(false);
      }
    }

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return <Loading />;
  }

  if (!subEvent) {
    return <div>Sub Event not found</div>;
  }

  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="text-2xl font-bold leading-none">{subEvent?.name}</div>
      <Balancer>
        <p className="text-muted-foreground">
          {subEvent?.description || "No description available."}
        </p>
      </Balancer>

      <div className="space-y-1.5">
        <div className="flex flex-row items-center space-x-2 text-sm text-muted-foreground">
          <CalendarIcon className="h-5 w-5" />
          <time>{format(new Date(subEvent.date), "PPP")}</time>
        </div>
        <div className="flex flex-row items-center space-x-2 text-sm text-muted-foreground">
          <ClockIcon className="h-5 w-5" />
          <div className="flex flex-row items-center">
            <time>{format(new Date(subEvent.startTime), "kk:mm")}</time>
            <DashIcon className="h-5 w-5" />
            <time>{format(new Date(subEvent.endTime), "kk:mm")}</time>
          </div>
        </div>
        <div className="flex flex-row items-center text-sm text-muted-foreground">
          <SewingPinFilledIcon className="h-5 w-5" />
          <div className="flex flex-row items-center space-x-1">
            <div>{subEvent.location}</div>
            <DotFilledIcon className="h-5 w-5" />
            <div>{subEvent.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Loading() {
  return (
    <div className="flex w-full flex-col space-y-4">
      <Skeleton className="h-9 w-full" />
    </div>
  );
}
