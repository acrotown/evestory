"use client";

import { format } from "date-fns";
import Balancer from "react-wrap-balancer";

export default function EventDate({ date: eventDate }: { date: string }) {
  let eventDate_ = format(new Date(eventDate), "E d MMM yyyy");

  let [day, date, month, year] = eventDate_.split(" ");

  return (
    <div className="flex items-center justify-evenly">
      <p className="w-32 text-center text-3xl font-medium uppercase tracking-[0.2em] text-[#fff]">
        <Balancer>{month}</Balancer>
      </p>
      <div className="border-x-2 border-[#fff] px-6 text-center text-3xl font-bold uppercase tracking-[0.2em] text-[#fff] max-md:mx-3">
        <p>{day}</p>
        <p>{date}</p>
      </div>
      <p className="w-32 text-center text-3xl font-medium uppercase tracking-[0.2em] text-[#fff]">
        <Balancer>{year}</Balancer>
      </p>
    </div>
  );
}
