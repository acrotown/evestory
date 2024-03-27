"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";

import { cn } from "@/lib/utils";

import { EventTypeForPublic } from "../../type";

export default function Cover({
  event,
}: {
  event: NonNullable<EventTypeForPublic>;
}) {
  let [day, date, month, year] = format(
    new Date(event.date),
    "EEE do MMM yyyy",
  ).split(" ");

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col space-y-5 pb-32 pt-80"
    >
      <h1
        className={cn("text-center font-sorts_mill_goudy text-7xl text-swamp")}
      >
        <Balancer>
          {event?.grooms?.name} & {event?.brides?.name}
        </Balancer>
      </h1>
      <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground">
        <Balancer>invite you to their wedding</Balancer>
      </p>

      <div className="flex items-center justify-evenly">
        <p className="w-32 text-center text-sm font-medium uppercase tracking-[0.2em] text-swamp">
          <Balancer>{month}</Balancer>
        </p>
        <div className="border-x-2 border-[#000] px-6 text-center text-lg font-bold uppercase tracking-[0.2em] text-swamp max-md:mx-3">
          <p>{day}</p>
          <p>{date}</p>
        </div>
        <p className="w-32 text-center text-sm font-medium uppercase tracking-[0.2em] text-swamp">
          <Balancer>{year}</Balancer>
        </p>
      </div>
    </motion.div>
  );
}
