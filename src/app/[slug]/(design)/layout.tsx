import Image from "next/image";

import { cn, constructMetadata } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  let title = `${params.slug?.toUpperCase()}`;
  let description = `${params.slug?.toUpperCase()} wedding invitation.`;

  return constructMetadata({
    title,
    description,
  });
}

export default async function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 overflow-x-hidden md:grid-cols-2 xl:grid-cols-3",
      )}
    >
      <div className="sticky top-4 z-10 m-4 hidden rounded-2xl shadow-inner md:block xl:col-span-2">
        <div className="p-5">
          <Image
            // src="https://picsum.photos/2000/2000"
            src="/_static/placeholder.svg"
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
