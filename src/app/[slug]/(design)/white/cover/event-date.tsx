"use client";

import { format } from "date-fns";

export default function EventDate({ eventDate }: { eventDate: string }) {
  let [date, month, year] = format(new Date(eventDate), "do MMM yyyy").split(
    " ",
  );

  return (
    <div className="border-x-2 border-[#A59D40] px-6 text-center text-lg font-bold uppercase tracking-[0.2em] text-foreground max-md:mx-3">
      <p>{date}</p>
      <p>{month}</p>
      <p>{year}</p>
    </div>
  );
}
