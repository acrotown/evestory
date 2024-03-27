"use client";

import { DotsHorizontalIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { useMeasure } from "@uidotdev/usehooks";
import { format, formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  let [cardContentRef, { width: cardContentWidth }] = useMeasure();
  let [actionRef, { width: actionWidth }] = useMeasure();
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
      <CardContent>
        <div className="flex flex-col gap-4">
          <div
            ref={cardContentRef}
            className="flex w-full items-start justify-between"
          >
            <div className="flex w-full flex-col gap-1">
              <CardTitle className="flex items-center justify-between">
                {event.name}
              </CardTitle>
              <div className="flex w-full justify-start p-0">
                {event.isPublished ? (
                  <Button
                    asChild
                    variant="link"
                    className="h-auto p-0 text-muted-foreground"
                  >
                    <Link
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      target="_blank"
                      href={url}
                      className="group flex items-center"
                    >
                      <p
                        className="truncate"
                        style={{
                          maxWidth: `${
                            (cardContentWidth || 0) - (actionWidth || 0) - 8
                          }px`,
                        }}
                      >
                        {url}
                        <ExternalLinkIcon className="ml-1 hidden h-4 w-4 group-hover:inline" />
                      </p>
                    </Link>
                  </Button>
                ) : (
                  <Tooltip delayDuration={50} disableHoverableContent>
                    <TooltipTrigger className="cursor-not-allowed" asChild>
                      <Button
                        asChild
                        variant="link"
                        className="cursor-not-allowed pl-0 text-muted-foreground opacity-50"
                        disabled
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <span className="relative">
                          {url}
                          <ExternalLinkIcon className="ml-1 hidden h-4 w-4 group-hover:inline" />
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="text-center">
                      <p>You need to publish the event</p>
                      <p>to visit the link.</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>

            <div ref={actionRef} className="flex items-center gap-2">
              <Badge variant={event.isPublished ? "default" : "secondary"}>
                {event.isPublished ? "Published" : "Draft"}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button size="icon" variant="ghost" className="h-6 w-6">
                    <DotsHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  onClick={(e) => e.stopPropagation()}
                  align="end"
                >
                  <DropdownMenuItem>
                    {event.isPublished ? "Unpublish" : "Publish"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>Preview</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

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

          <p className="text-sm text-muted-foreground">
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
