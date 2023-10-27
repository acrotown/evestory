"use client"

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

export default function Create() {
  const form = useForm<z.infer<typeof CreateEventSchema>>({
    resolver: zodResolver(CreateEventSchema),
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof CreateEventSchema>) => {
    setIsLoading(true)

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const { message } = await res.json()

    if (res.status === 201) {
      setIsLoading(false)
      toast(message)
      router.push(`/event/${data.websiteURL}/overview`)
    }
  }

  return (
    <MaxWidthWrapper>
      <section className="pt-10">
        <div className="flex flex-col space-y-1">
          <h1 className="font-display text-5xl">
            <Balancer>Start crafting your wedding website.</Balancer>
          </h1>
          {/* <h2 className="text-muted-foreground">
            Fill in the form below to get started.
          </h2> */}
        </div>

        <div className="flex flex-col-reverse pt-8 lg:flex-row lg:space-x-11">
          <Form {...form}>
            <form
              method="POST"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col space-y-4"
            >
              <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="w-full">
                  <InputForm
                    control={form.control}
                    name="groomName"
                    label="Groom name"
                    placeholder="Chandler Bing"
                  />
                </div>

                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="brideName"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Bride name</FormLabel>
                          <FormControl>
                            <Input placeholder="Monica Geller" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Event date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormDescription>
                        You can change it later.
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Event name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="The One With The Proposal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name="websiteURL"
                render={({ field: { onChange, ...field } }) => {
                  return (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="chandler-and-monica"
                          rightElement=".evestory.day"
                          onChange={(e) => {
                            onChange(
                              e.target.value.replace(/[^a-zA-Z0-9]/g, "-"),
                            )
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your website URL:{" "}
                        <span className="font-semibold">
                          {field.value
                            ? `https://${field.value}.evestory.day`
                            : "https://chandler-and-monica.evestory.day"}
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <Button
                type="submit"
                disabled={isLoading}
                aria-disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <ReloadIcon className="mr-2 animate-spin" />{" "}
                    <span>Creating...</span>
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </form>
          </Form>

          <Image
            src="/_static/create-wedding-site.png"
            alt="Create Wedding Site"
            priority
            width={420}
            height={420}
            className="self-center"
          />
        </div>
      </section>
    </MaxWidthWrapper>
  )
}
