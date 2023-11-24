"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

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
import { useAction } from "@/hooks/use-action"
import { cn } from "@/lib/utils"
import { CreateEventSchema } from "@/schemas/create-event.schema"

import { createEvent } from "./action"

export default function CreateEventForm() {
  let form = useForm<z.infer<typeof CreateEventSchema>>({
    resolver: zodResolver(CreateEventSchema),
  })
  let router = useRouter()

  let { call, loading } = useAction(createEvent, {
    onSuccess(data) {
      console.log("data", data)
      toast.success("Event created successfully")
      router.replace(`/event/${data?.url}/overview`)
    },
    onError(error) {
      console.log("error", error)
      toast.error(error)
    },
  })

  let onSubmit = async (data: z.infer<typeof CreateEventSchema>) => {
    call(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-4"
      >
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="w-full">
            <FormField
              control={form.control}
              name="groomName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Groom name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Chandler Bing"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )
              }}
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
                      <Input
                        disabled={loading}
                        placeholder="Monica Geller"
                        {...field}
                      />
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
                <FormLabel htmlFor="eventDate">Event date</FormLabel>
                <input
                  disabled={loading}
                  className="hidden"
                  name="eventDate"
                  value={field.value?.toString()}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={loading}
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

                <FormDescription>You can change it later.</FormDescription>

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
                <FormLabel>Wedding name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
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
                    disabled={loading}
                    placeholder="chandler-monica"
                    rightElement=".evestory.day"
                    onChange={(e) => {
                      onChange(
                        e.target.value
                          .replace(/[^a-zA-Z0-9]/g, "-")
                          .toLowerCase(),
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
                      : "https://chandler-monica.evestory.day"}
                  </span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <Button type="submit" disabled={loading} aria-disabled={loading}>
          {loading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
              <span>Creating event...</span>
            </>
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Form>
  )
}
