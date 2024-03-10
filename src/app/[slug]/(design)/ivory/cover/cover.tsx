"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";

import { cn, titleCase } from "@/lib/utils";

import { type EventType } from "./page";

export default function Cover({ event }: { event: NonNullable<EventType> }) {
  let [day, date, month, year] = format(
    new Date(event.date),
    "EEE do MMM yyyy",
  ).split(" ");

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col space-y-5 py-60"
    >
      <div>
        <h2
          className={cn(
            "text-center font-style_script text-7xl text-[#5E7054]",
          )}
        >
          <Balancer>{titleCase(event.grooms?.name || "")}</Balancer>
        </h2>
        <h2
          className={cn(
            "text-center font-style_script text-7xl text-[#5E7054]",
          )}
        >
          <Balancer>&</Balancer>
        </h2>
        <h2
          className={cn(
            "text-center font-style_script text-7xl text-[#5E7054]",
          )}
        >
          <Balancer>{titleCase(event.brides?.name || "")}</Balancer>
        </h2>
      </div>

      <p className="text-center text-sm uppercase tracking-[0.2em] text-[#5E7054]">
        <Balancer>we invite to join our wedding celebration</Balancer>
      </p>

      <div className="flex items-center justify-evenly font-style_script">
        <p className="w-32 text-center font-style_script text-xl font-medium uppercase tracking-[0.2em] text-[#5E7054]">
          <Balancer>{month}</Balancer>
        </p>
        <div className="border-x-2 border-[#CFA985] px-6 text-center text-2xl font-bold uppercase tracking-[0.2em] text-[#5E7054] max-md:mx-3">
          <p>{day}</p>
          <p>{date}</p>
        </div>
        <p className="w-32 text-center text-xl font-medium uppercase tracking-[0.2em] text-[#5E7054]">
          <Balancer>{year}</Balancer>
        </p>
      </div>
    </motion.div>
  );
}
