"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { InstagramLogoIcon, ReloadIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { mutate } from "swr"
import { z } from "zod"

import InputForm from "@/components/form/input"
import { Button } from "@/components/ui/button"
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
import InputFile from "@/components/ui/input-file"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { getEvent } from "@/lib/db/events"
import { CoupleInformationSchema } from "@/schemas/update-couple-information"

export default function CoupleInformationForm({
  event,
}: {
  event: Awaited<ReturnType<typeof getEvent>>
}) {
  const form = useForm<z.infer<typeof CoupleInformationSchema>>({
    resolver: zodResolver(CoupleInformationSchema),
    defaultValues: {
      eventName: event?.name,
      description: event?.description || "",
      websiteURL: event?.url,
      isShowGroomNameFirst: event?.isShowGroomNameFirst,
      isShowGroomParentsName: event?.isShowGroomParentsName,
      groomName: event?.groomName,
      groomInstagram: event?.groomInstagram || "",
      groomPhoto: event?.groomPhoto || "",
      groomParentsName: event?.groomParentsName || "",
      isShowBrideParentsName: event?.isShowBrideParentsName,
      brideName: event?.brideName,
      brideInstagram: event?.brideInstagram || "",
      bridePhoto: event?.bridePhoto || "",
      brideParentsName: event?.brideParentsName || "",
    },
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof CoupleInformationSchema>) => {
    setIsLoading(true)
    fetch("/api/events/" + event?.url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.status === 200) {
          router.refresh()
          await mutate("/api/events/" + event?.url)
          toast.success("Event updated successfully.")
        } else {
          const error = await res.text()
          toast.error(error || "Something went wrong.")
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-4"
      >
        <div>
          {/* <h3 className="mb-4 text-lg font-medium">
        Email Notifications
      </h3> */}

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="isShowGroomNameFirst"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Show groom name first</FormLabel>
                    <FormDescription>
                      Turn this on if you want to show the groom name first.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isShowGroomParentsName"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Show groom parents name</FormLabel>
                    <FormDescription>
                      Turn this on if you want to show the groom parents name.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.getValues("isShowGroomParentsName") ? (
              <FormField
                control={form.control}
                name="groomParentsName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Groom parents name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="The Son of Mr. Charles Bing and Mrs. Nora Tyler Bing"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            ) : null}
            <FormField
              control={form.control}
              name="isShowBrideParentsName"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Show bride parents name</FormLabel>
                    <FormDescription>
                      Turn this on if you want to show the bride parents name.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.getValues("isShowBrideParentsName") ? (
              <FormField
                control={form.control}
                name="brideParentsName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Bride parents name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="The Daughter of Mr. Jack Geller and Mrs. Judy Geller"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            ) : null}
          </div>
        </div>

        <Separator />

        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Wedding name</FormLabel>
                <FormControl>
                  <Input placeholder="The One With The Proposal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="The One With The Proposal #ChandlerAndMonica"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

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

        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="w-full">
            <FormField
              control={form.control}
              name="groomPhoto"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Groom photo</FormLabel>
                    <FormControl>
                      <InputFile
                        endPoint="imageUploader"
                        onChange={async (url) => {
                          fetch("/api/events/" + event?.url + "/update-image", {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ groomPhoto: url }),
                          }).then(async (res) => {
                            if (res.status === 200) {
                              field.onChange(url)
                              router.refresh()
                              await mutate("/api/events/" + event?.url)
                              toast.success("Groom photo updated successfully.")
                            } else {
                              const error = await res.text()
                              toast.error(error || "Something went wrong.")
                            }
                          })
                        }}
                        value={field.value}
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
              name="bridePhoto"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Bride photo</FormLabel>
                    <FormControl>
                      <InputFile
                        endPoint="imageUploader"
                        onChange={async (url) => {
                          fetch("/api/events/" + event?.url + "/update-image", {
                            method: "PATCH",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ bridePhoto: url }),
                          }).then(async (res) => {
                            if (res.status === 200) {
                              field.onChange(url)
                              router.refresh()
                              await mutate("/api/events/" + event?.url)
                              toast.success("Bride photo updated successfully.")
                            } else {
                              const error = await res.text()
                              toast.error(error || "Something went wrong.")
                            }
                          })
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="w-full">
            <FormField
              control={form.control}
              name="groomInstagram"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Groom&apos;s instagram</FormLabel>
                    <FormControl>
                      <Input
                        leftElement={<InstagramLogoIcon />}
                        placeholder="@chandlerbing"
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
              name="brideInstagram"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Bride&apos;s instagram</FormLabel>
                    <FormControl>
                      <Input
                        leftElement={<InstagramLogoIcon />}
                        placeholder="@monicageller"
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
                      onChange(e.target.value.replace(/[^a-zA-Z0-9]/g, "-"))
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

        <Button type="submit" disabled={isLoading} aria-disabled={isLoading}>
          {isLoading ? (
            <>
              <ReloadIcon className="mr-2 animate-spin" />
              <span>Saving changes...</span>
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </Form>
  )
}
