import {
  CalendarHeartIcon,
  GiftIcon,
  HeartPulseIcon,
  ImagesIcon,
  MessageSquareHeartIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { db } from "@/lib/drizzle";
import { cn, constructMetadata, wsrv } from "@/lib/utils";
import { alice, cormorant } from "@/styles/fonts";

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}) {
  const title = `${params.domain.toUpperCase()}`;
  const description = `${params.domain.toUpperCase()} is a wedding invitation website.`;

  return constructMetadata({
    title,
    description,
  });
}

let getEvent = async (url: string) => {
  let res = await db.query.events.findFirst({
    where(fields, { eq }) {
      return eq(fields.url, url);
    },
    with: {
      grooms: true,
      brides: true,
    },
  });

  return res;
};

export default async function Domain({
  params,
}: {
  params: { domain: string };
}) {
  let domain = params.domain.split(".");
  if (domain.length === 0 || !domain[0]) {
    throw notFound();
  }

  let event = await getEvent(domain[0]);
  // let event = await getEvent("chandler-monica");

  if (!event || !event?.isPublished) {
    throw notFound();
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
        alice.className,
      )}
    >
      <div className="sticky top-4 z-10 m-4 hidden rounded-2xl shadow-inner shadow-green-500 md:block xl:col-span-2">
        <div className="p-5">
          <Image
            src="https://picsum.photos/2000/2000"
            fill
            objectFit="cover"
            alt="hasdf"
            className="rounded-2xl"
          />
        </div>
      </div>

      <div className="relative">
        <div className="relative h-[100svh]">
          <Background />

          <div className="z-10 h-full overflow-auto scrollbar-hide max-lg:mx-4">
            <Couple event={event} />
            <Couple event={event} />
            <Couple event={event} />
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

function Couple({ event }: { event: Awaited<ReturnType<typeof getEvent>> }) {
  return (
    <div className="flex flex-col space-y-10 pb-32 pt-80">
      <h1
        className={cn(
          "text-center text-5xl text-[#555650]",
          cormorant.className,
        )}
      >
        <Balancer>
          {event?.grooms?.name} & {event?.brides?.name}
        </Balancer>
      </h1>
      <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground">
        <Balancer>invite you to join in the celebration of their</Balancer>
      </p>
      <h1
        className={cn(
          "text-center text-5xl text-[#555650]",
          cormorant.className,
        )}
      >
        <Balancer>Wedding</Balancer>
      </h1>

      <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground">
        <Balancer>on</Balancer>
      </p>

      <div className="flex items-center justify-evenly">
        <p className="w-32 text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground">
          <Balancer>hotel name</Balancer>
        </p>
        <div className="border-x-2 border-[#A59D40] px-6 text-center text-lg font-bold uppercase tracking-[0.2em] text-foreground max-md:mx-3">
          <p>27th</p>
          <p>August</p>
          <p>2025</p>
        </div>
        <p className="w-32 text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground">
          <Balancer>New York City</Balancer>
        </p>
      </div>

      <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground">
        <Balancer>1pm onwards. Reception to follow.</Balancer>
      </p>
    </div>
  );
}

function BottomNav() {
  let navs = [
    {
      icon: UsersIcon,
      label: "Couple",
    },
    {
      icon: CalendarHeartIcon,
      label: "Event",
    },
    {
      icon: MessageSquareHeartIcon,
      label: "Wishes",
    },
    {
      icon: HeartPulseIcon,
      label: "Stories",
    },
    {
      icon: ImagesIcon,
      label: "Galleries",
    },
    {
      icon: GiftIcon,
      label: "Gift",
    },
  ];

  return (
    <div className="absolute inset-x-0 bottom-4 mx-auto h-16 max-w-lg rounded-full border border-gray-200 bg-white font-sans shadow-lg  dark:border-gray-600 dark:bg-gray-700">
      <div className={cn("grid h-full max-w-lg", `grid-cols-${navs.length}`)}>
        {navs.map((nav, index) => {
          return (
            <Tooltip key={nav.label}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-100 dark:hover:bg-gray-800",
                    [
                      index === 0 ? "rounded-s-full" : "",
                      index === navs.length - 1 ? "rounded-e-full" : "",
                    ],
                  )}
                >
                  <nav.icon className="h-6 w-6" color="#4A55A2" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{nav.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}

function BottomNav3() {
  return (
    <div className="absolute inset-x-0 bottom-4 mx-auto h-16 w-[90%] rounded-full border border-gray-200 bg-white px-4 dark:border-gray-600 dark:bg-gray-700">
      {/* <div className="flex h-full items-center justify-around px-6"> */}
      <div className="mx-auto grid h-full max-w-lg grid-cols-6">
        {/* <div className="flex cursor-pointer flex-col items-center space-y-1"> */}
        <div className="group inline-flex flex-col items-center justify-center rounded-s-full px-5 hover:bg-gray-50 dark:hover:bg-gray-800">
          <UsersIcon className="h-6 w-6" />
          <p className="text-sm text-muted-foreground">Couple</p>
        </div>
        <div className="flex cursor-pointer flex-col items-center space-y-1">
          <CalendarHeartIcon className="h-6 w-6" />
          <p className="text-xs text-muted-foreground">Event</p>
        </div>
        <div className="flex cursor-pointer flex-col items-center space-y-1">
          <MessageSquareHeartIcon className="h-6 w-6" />
          <p className="text-xs text-muted-foreground">Wishes</p>
        </div>
        <div className="flex cursor-pointer flex-col items-center space-y-1">
          <HeartPulseIcon className="h-6 w-6" />
          <p className="text-xs text-muted-foreground">Stories</p>
        </div>
        <div className="flex cursor-pointer flex-col items-center space-y-1">
          <ImagesIcon className="h-6 w-6" />
          <p className="text-xs text-muted-foreground">Galleries</p>
        </div>
        <div className="flex cursor-pointer flex-col items-center space-y-1">
          <GiftIcon className="h-6 w-6" />
          <p className="text-xs text-muted-foreground">Gift</p>
        </div>
      </div>
    </div>
  );
}

// function BottomNav2() {
//   return (
//     <div className="fixed bottom-0 z-20 h-[70px] w-full border-t-2 bg-background shadow-2xl">
//       <div className="flex h-full items-center justify-around px-6">
//         <div className="flex cursor-pointer flex-col items-center space-y-1">
//           <UsersIcon className="h-6 w-6" />
//           <p className="text-sm text-muted-foreground">Couple</p>
//         </div>
//         <div className="flex cursor-pointer flex-col items-center space-y-1">
//           <CalendarHeartIcon className="h-6 w-6" />
//           <p className="text-xs text-muted-foreground">Event</p>
//         </div>
//         <div className="flex cursor-pointer flex-col items-center space-y-1">
//           <MessageSquareHeartIcon className="h-6 w-6" />
//           <p className="text-xs text-muted-foreground">Wishes</p>
//         </div>
//         <div className="flex cursor-pointer flex-col items-center space-y-1">
//           <HeartPulseIcon className="h-6 w-6" />
//           <p className="text-xs text-muted-foreground">Stories</p>
//         </div>
//         <div className="flex cursor-pointer flex-col items-center space-y-1">
//           <ImagesIcon className="h-6 w-6" />
//           <p className="text-xs text-muted-foreground">Galleries</p>
//         </div>
//         <div className="flex cursor-pointer flex-col items-center space-y-1">
//           <GiftIcon className="h-6 w-6" />
//           <p className="text-xs text-muted-foreground">Gift</p>
//         </div>
//       </div>
//     </div>
//   );
// }

function Background() {
  return (
    <>
      {/* <div className="absolute top-0 -z-10 w-full">
        <Image
          src="https://wsrv.nl/?url=https://utfs.io/f/527dbbda-9b92-48b5-b702-a5823f14ae1d-2gr9.svg"
          alt="Create Wedding Site"
          priority
          width={400}
          height={300}
          className="pointer-events-none mx-auto"
        />
      </div> */}
      <div className="absolute top-0 -z-10 w-full">
        <Image
          src={wsrv(
            "https://res.cloudinary.com/evestory/image/upload/v1709576084/templates/standard/ivory/top.svg",
          )}
          alt="Create Wedding Site"
          priority
          width={400}
          height={300}
          className="pointer-events-none mx-auto"
        />
      </div>
      {/* <div className="absolute top-0 -z-10 w-full">
        <Image
          src="/_static/templates/standard/ivory/top.svg"
          alt="Create Wedding Site"
          priority
          width={400}
          height={300}
          className="pointer-events-none mx-auto"
        />
      </div> */}
      <div className="absolute left-0 top-0 -z-10 opacity-30">
        <Image
          src={
            "https://res.cloudinary.com/evestory/image/upload/v1709576084/templates/standard/ivory/top-left.svg"
          }
          // src={wsrv(
          //   "https://res.cloudinary.com/evestory/image/upload/v1709576084/templates/standard/ivory/top-left.svg",
          // )}
          alt="Create Wedding Site"
          priority
          width={250}
          height={250}
          className="pointer-events-none"
        />
      </div>
      <div className="absolute right-0 top-0 -z-10 opacity-30">
        <Image
          src={
            "https://res.cloudinary.com/evestory/image/upload/v1709576084/templates/standard/ivory/top-right.svg"
          }
          // src={wsrv(
          //   "https://res.cloudinary.com/evestory/image/upload/v1709576084/templates/standard/ivory/top-right.svg"
          // )}
          alt="Create Wedding Site"
          priority
          width={250}
          height={250}
          className="pointer-events-none"
        />
      </div>
      <div className="absolute bottom-0 right-0 -z-10 opacity-30">
        <Image
          src={wsrv(
            "https://res.cloudinary.com/evestory/image/upload/v1709576084/templates/standard/ivory/bottom-right.svg",
          )}
          alt="Create Wedding Site"
          priority
          width={250}
          height={250}
          className="pointer-events-none"
        />
      </div>
    </>
  );
}
