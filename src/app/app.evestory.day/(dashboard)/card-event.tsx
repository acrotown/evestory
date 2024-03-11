"use client";

import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { format, formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { APP_DOMAIN } from "@/lib/constants";
import { getEvents } from "@/lib/db/events";
import femaleAvatar from "#/public/_static/female-avatar.svg";
import maleAvatar from "#/public/_static/male-avatar.svg";

// TODO: any for now, fix types @see https://github.com/drizzle-team/drizzle-orm/issues/695
export default function CardEvent({
  event,
}: {
  event: Awaited<ReturnType<typeof getEvents>>[0];
}) {
  let router = useRouter();
  let url =
    process.env.NODE_ENV === "production"
      ? `https://${event.url}.evestory.day`
      : `http://${event.url}.localhost:3000`;

  return (
    <Card
      className="cursor-pointer"
      onClick={() => {
        router.push(`${APP_DOMAIN}/event/${event.url}/overview`);
      }}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {event.name}
          <Badge variant={event.isPublished ? "default" : "secondary"}>
            {event.isPublished ? "Published" : "Draft"}
          </Badge>
        </CardTitle>
        <CardDescription>
          {event.isPublished ? (
            <Button
              asChild
              variant="link"
              className="pl-0 text-muted-foreground"
            >
              <Link
                onClick={(e) => {
                  e.stopPropagation();
                }}
                target="_blank"
                href={url}
                className="group flex items-center"
              >
                <span className="relative">
                  {url}
                  <ExternalLinkIcon className="ml-1 hidden h-4 w-4 group-hover:inline" />
                </span>
              </Link>
            </Button>
          ) : (
            <Tooltip>
              <TooltipTrigger className="cursor-not-allowed">
                <Button
                  asChild
                  variant="link"
                  className="cursor-not-allowed pl-0 text-muted-foreground opacity-50"
                  disabled
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="relative">
                    {url}
                    <ExternalLinkIcon className="ml-1 hidden h-4 w-4 group-hover:inline" />
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                You need to publish the event to view the link.
              </TooltipContent>
            </Tooltip>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <Avatar className="h-6 w-6 items-center justify-center">
                {event.grooms?.photoUrl ? (
                  <AvatarImage
                    src={event.grooms?.photoUrl as string}
                    alt={event.grooms?.name}
                  />
                ) : (
                  <Image src={maleAvatar} alt={event.grooms?.name as string} />
                )}
              </Avatar>

              <p className="text-sm font-semibold text-muted-foreground">
                {event.grooms?.name}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Avatar className="h-6 w-6 items-center justify-center">
                {event.brides?.photoUrl ? (
                  <AvatarImage
                    src={event.brides?.photoUrl as string}
                    alt={event.brides?.name}
                  />
                ) : (
                  <Image
                    src={femaleAvatar}
                    alt={event.brides?.name as string}
                  />
                )}
              </Avatar>

              <p className="text-sm font-semibold text-muted-foreground">
                {event.brides?.name}
              </p>
            </div>
          </div>

          <p className="text-sm font-semibold text-muted-foreground">
            {format(new Date(event.date as string), "EEE, d MMMM yyyy")}
          </p>

          <p className="mt-6 text-xs text-muted-foreground">
            Updated{" "}
            {formatDistanceToNow(new Date(event.updatedAt as string), {
              addSuffix: true,
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
