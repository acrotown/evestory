"use client"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { APP_DOMAIN } from "@/lib/constants"

export default function CardEvent({
  event,
}: {
  event: {
    name: string
    groomName: string
    brideName: string
    url: string
    updatedAt: Date
    published: boolean
  }
}) {
  const router = useRouter()

  return (
    <Card
      className="cursor-pointer"
      onClick={() => {
        router.push(`${APP_DOMAIN}/event/${event.url}/overview`)
      }}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {event.name}
          <Badge variant={event.published ? "default" : "secondary"}>
            {event.published ? "Published" : "Draft"}
          </Badge>
        </CardTitle>
        <CardDescription>
          <Button
            asChild
            variant={"link"}
            className="pl-0 text-muted-foreground"
          >
            <Link href={`https://${event.url}.evestory.day`}>
              {`https://${event.url}.evestory.day`}
            </Link>
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <p className="text-sm text-muted-foreground">
          {event.groomName} and {event.brideName}
        </p> */}

        <p className="text-sm text-muted-foreground">
          Updated{" "}
          {formatDistanceToNow(new Date(event.updatedAt), { addSuffix: true })}
        </p>
      </CardContent>
    </Card>
  )
}
