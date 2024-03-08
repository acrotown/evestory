"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { CreateEventSchema } from "@/app/app.evestory.day/(dashboard)/create/_schema/create-event.schema";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { createEvent } from "../_action/create-event";

export default function CreateEventForm() {
  let form = useForm<z.infer<typeof CreateEventSchema>>({
    resolver: zodResolver(CreateEventSchema),
  });
  let router = useRouter();

  let { execute, status } = useAction(createEvent, {
    onSuccess(data) {
      if (data.ok && data.data?.url) {
        toast.success(data.message);
        return router.replace(`/event/${data.data.url}/overview`);
      }
      if (!data.ok && data.data === null && data.errors?.url) {
        if (data.errors.url) {
          form.setError("url", {
            message: data.errors.url.map((e) => e).join(", "),
          });
        }
      } else {
        toast.error("Failed to create event.");
      }
    },
    onError(error) {
      console.log(error);
      toast.error(JSON.stringify(error));
    },
  });

  let loading = status === "executing";

  let onSubmit = (data: z.infer<typeof CreateEventSchema>) => {
    execute(data);
  };

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
                );
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
                );
              }}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor="eventDate">Event date</FormLabel>
                <input
                  disabled={loading}
                  className="hidden"
                  name="eventDate"
                  value={field.value?.toISOString()}
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
            );
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
            );
          }}
        />

        <FormField
          control={form.control}
          name="url"
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
                      );
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
            );
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
  );
}
