"use client";

import { ExternalLinkIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

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

// TODO: any for now, fix types @see https://github.com/drizzle-team/drizzle-orm/issues/695
export default function CardEvent({
  event,
}: {
  event: Awaited<ReturnType<typeof getEvents>>[0];
}) {
  let router = useRouter();

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
                href={
                  process.env.NODE_ENV === "production"
                    ? `https://${event.url}.evestory.day`
                    : `http://${event.url}.localhost:3000`
                }
                className="group flex items-center"
              >
                <span className="relative">
                  {process.env.NODE_ENV === "production"
                    ? `https://${event.url}.evestory.day`
                    : `http://${event.url}.localhost:3000`}
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
                    {process.env.NODE_ENV === "production"
                      ? `https://${event.url}.evestory.day`
                      : `http://${event.url}.localhost:3000`}
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
        <p className="text-sm font-semibold text-muted-foreground">
          {event.grooms?.name} <HeartFilledIcon /> {event.brides?.name}
        </p>

        <p className="mt-6 text-sm text-muted-foreground">
          Updated{" "}
          {formatDistanceToNow(new Date(event.updatedAt as string), {
            addSuffix: true,
          })}
        </p>
      </CardContent>
    </Card>
  );
}
