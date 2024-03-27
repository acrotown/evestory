import Image from "next/image";

import { cn } from "@/lib/utils";

export default async function RootWrapper({
  children,
  className,
  coverImage,
}: {
  children: React.ReactNode;
  className?: string;
  coverImage?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 overflow-x-hidden md:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      <div className="sticky top-4 z-10 m-4 hidden rounded-2xl shadow-inner md:block xl:col-span-2">
        <div className="p-5">
          <Image
            src={coverImage || "/_static/placeholder.svg"}
            fill
            objectFit="cover"
            alt="hasdf"
            className="rounded-2xl"
          />
        </div>
      </div>

      {children}
    </div>
  );
}
