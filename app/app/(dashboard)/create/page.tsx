"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import Balancer from "react-wrap-balancer"
import { z } from "zod"

import InputForm from "@/components/form/input"
import { HomeHeader } from "@/components/home-header"
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

const FormSchema = z.object({
  groomName: z
    .string({
      required_error: "Groom name is required.",
    })
    .min(3, {
      message: "Groom name must be at least 3 characters long.",
    }),
  brideName: z
    .string({
      required_error: "Bride name is required.",
    })
    .min(3, {
      message: "Bride name must be at least 3 characters long.",
    }),
  weddingDate: z.date({
    required_error: "Wedding date is required.",
  }),
  weddingName: z
    .string({
      required_error: "Wedding name is required.",
    })
    .min(3, {
      message: "Wedding name must be at least 3 characters long.",
    }),
  websiteURL: z
    .string({
      required_error: "Website URL is required.",
    })
    .min(3, {
      message: "Website URL must be at least 3 characters long.",
    }),
})

export default function Create() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data)
  }

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col">
      <section className="pt-10">
        <div className="container">
          <div className="flex flex-col space-y-1">
            <h1 className="font-display text-5xl">
              <Balancer>Start crafting your wedding website.</Balancer>
            </h1>
            {/* <h2 className="text-muted-foreground">
              Fill in the form below to get started.
            </h2> */}
          </div>

          <div className="pt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-4"
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
                  name="weddingDate"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Wedding date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
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

                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  control={form.control}
                  name="weddingName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Wedding name</FormLabel>
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
                            onChange={(e) => {
                              onChange(
                                e.target.value.replace(/[^a-zA-Z0-9]/g, "-")
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

                <Button type="submit">Next</Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </main>
  )
}
