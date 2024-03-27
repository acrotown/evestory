"use client";

import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";

import { cn } from "@/lib/utils";

import { EventTypeForPublic } from "../../type";
import EventDate from "./event-date";

export default function Cover({
  event,
}: {
  event: NonNullable<EventTypeForPublic>;
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col space-y-5 pb-32 pt-56 text-center text-[#fff]"
    >
      <div>
        <p className="uppercase tracking-[0.2em]">save the date</p>
        <p className="uppercase tracking-[0.2em]">our wedding day</p>
      </div>
      <h1 className={cn("text-center font-dr_sugiyama text-8xl text-[#fff]")}>
        <Balancer>
          {event.grooms?.name} & {event.brides?.name}
        </Balancer>
      </h1>
      <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-[#fff]">
        <Balancer>we invite you to join our wedding</Balancer>
      </p>

      <EventDate date={event.date} />

      <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-[#fff]">
        <Balancer>1pm onwards. Reception to follow.</Balancer>
      </p>
    </motion.div>
  );
}
