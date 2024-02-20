"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { getEvent } from "@/lib/db/events";

import { updateEventInfo } from "../_action";
import { UpdateEventInformationSchema } from "../_schema/event-information";

export default function EventInformationForm({
  event,
}: {
  event: Awaited<ReturnType<typeof getEvent>>;
}) {
  const form = useForm<z.infer<typeof UpdateEventInformationSchema>>({
    resolver: zodResolver(UpdateEventInformationSchema),
    defaultValues: {
      id: event?.id,
      name: event?.name,
      description: event?.description || "",
      url: event?.url,
    },
  });
  const router = useRouter();

  let { execute, status } = useAction(updateEventInfo, {
    onSuccess(data, input) {
      if (data.ok) {
        toast.success("Event updated successfully.");
        if (event?.url !== input.url) {
          router.replace(`/event/${input.url}/event-information`);
        }
      } else {
        if (data.errors?.url) {
          form.setError("url", {
            message: data.errors.url.map((e) => e).join(", "),
          });
        }
        toast.error(data.message);
      }
    },
  });
  let isSubmitting = status === "executing";

  let onSubmit = async (data: z.infer<typeof UpdateEventInformationSchema>) => {
    execute(data);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Wedding name</FormLabel>
                  <FormControl>
                    <Input placeholder="The One With The Proposal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
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
                      placeholder="The One With The Proposal #ChandlerMonica"
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
                      placeholder="chandler-and-monica"
                      rightElement=".evestory.day"
                      onChange={(e) => {
                        onChange(e.target.value.replace(/[^a-zA-Z0-9]/g, "-"));
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
              );
            }}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? (
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
    </>
  );
}
