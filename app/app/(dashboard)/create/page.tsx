import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import Balancer from "react-wrap-balancer"
import { toast } from "sonner"
import { z } from "zod"

import InputForm from "@/components/form/input"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CreateEventSchema } from "@/schemas/create-event.schema"

import { createEvent } from "./action"
import CreateEventForm from "./form"

export default function Create() {
  // const form = useForm<z.infer<typeof CreateEventSchema>>({
  //   resolver: zodResolver(CreateEventSchema),
  // })
  // const [isLoading, setIsLoading] = React.useState(false)
  // const router = useRouter()

  // const onSubmit = async (data: z.infer<typeof CreateEventSchema>) => {
  //   const tid = toast("Creating your event...")
  //   setIsLoading(true)

  //   // Check subdomain availability if the user has entered a custom subdomain
  //   if (data.websiteURL) {
  //     const resSubdomain = await fetch("/api/events/subdomain-exists", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ subdomain: data.websiteURL }),
  //     })
  //     const { exists } = await resSubdomain.json()
  //     if (exists) {
  //       setIsLoading(false)
  //       toast.error(
  //         "This subdomain is already taken. Please choose another one.",
  //         {
  //           id: tid,
  //         },
  //       )
  //       return
  //     }
  //   }

  //   const res = await fetch("/api/events", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   })
  //   const { message } = await res.json()

  //   if (res.status === 201) {
  //     setIsLoading(false)
  //     toast.success(message, {
  //       id: tid,
  //     })
  //     router.refresh()
  //     router.push(`/event/${data.websiteURL}/overview`)
  //   }
  // }

  return (
    <MaxWidthWrapper className="flex space-x-11">
      <section className="max-w-xl flex-1 pt-10">
        <div className="flex-col space-y-1">
          <h1 className="font-display text-5xl">
            <Balancer>Start crafting your wedding website.</Balancer>
          </h1>
          {/* <h2 className="text-muted-foreground">
            Fill in the form below to get started.
          </h2> */}
        </div>

        <div className="flex flex-col-reverse pt-8 lg:flex-row lg:space-x-11">
          <CreateEventForm />
        </div>
      </section>
      <Image
        src="/_static/create-wedding-site.png"
        alt="Create Wedding Site"
        priority
        width={420}
        height={420}
        className="self-center pt-10"
      />
    </MaxWidthWrapper>
  )
}
