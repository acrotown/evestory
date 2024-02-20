import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { subEvents } from "#/drizzle/schema";

import { createSubEvent } from "../_action/create-sub-event";
import { getSubEvent } from "../_action/get-sub-event";
import { updateSubEvent } from "../_action/update-sub-event";
import { CreateOrUpdateSubEventSchema } from "../_schema/create-sub-event";
import { Mode, useSubEventSearchParams } from "../hooks";

export function SubEventForm() {
  let [eventForUpdate, setEventForUpdate] = useState<
    typeof subEvents.$inferSelect | undefined
  >(undefined);
  let [isFetching, setIsFetching] = useState(false);
  let [subEventSP, setSubEventSP] = useSubEventSearchParams();

  useEffect(() => {
    async function fetch() {
      if (subEventSP.mode === Mode.Edit && subEventSP.sub_event_id !== null) {
        setIsFetching(true);
        let res = await getSubEvent(subEventSP.sub_event_id);
        setEventForUpdate(res);
        if (res) {
          form.reset({
            id: res.id,
            name: res.name,
            description: res.description ?? "",
            date: new Date(res.date),
            startTime: format(new Date(res.startTime), "HH:mm"),
            endTime: format(new Date(res.endTime), "HH:mm"),
            location: res.location ?? "",
            address: res.address ?? "",
          });
        }

        setIsFetching(false);
      }
    }

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let form = useForm<z.infer<typeof CreateOrUpdateSubEventSchema>>({
    resolver: zodResolver(CreateOrUpdateSubEventSchema),
    defaultValues: {
      id: subEventSP.sub_event_id,
      eventId: subEventSP.event_id || eventForUpdate?.eventId,
    },
  });

  let router = useRouter();
  let buttonLabel =
    subEventSP.mode === Mode.Create ? "Create schedule" : "Update schedule";

  let createSubEventAction = useAction(createSubEvent, {
    onSuccess(data) {
      if (data.ok) {
        form.reset();
        router.refresh();
        setSubEventSP({
          mode: null,
          sub_event_id: null,
          event_id: null,
        });
        toast.success(data.message);
      }
    },
  });

  let updateSubEventAction = useAction(updateSubEvent, {
    onSuccess(data) {
      if (data.ok) {
        router.refresh();
        setSubEventSP({
          mode: null,
          sub_event_id: null,
          event_id: null,
        });
        toast.success(data.message);
      }
    },
  });

  let isSubmitting = createSubEventAction.status === "executing";

  let handleSubmit = async (
    data: z.infer<typeof CreateOrUpdateSubEventSchema>,
  ) => {
    if (subEventSP.mode === Mode.Edit) {
      updateSubEventAction.execute(data);
    } else {
      createSubEventAction.execute(data);
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor="name">Schedule name</FormLabel>
                <FormControl>
                  <Input placeholder="Wedding" {...field} />
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
                <FormLabel htmlFor="description">Description</FormLabel>
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
          name="date"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor="date">Schedule date</FormLabel>
                <input
                  disabled={isSubmitting}
                  className="hidden"
                  name="eventDate"
                  value={field.value?.toString()}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={isSubmitting}
                        variant="outline"
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

        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel htmlFor="startTime">Start time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      className="appearance-none"
                      placeholder="09:00"
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
            name="endTime"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel htmlFor="endTime">End time</FormLabel>
                  <FormControl>
                    <Input type="time" placeholder="10:30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor="location">Location</FormLabel>
                <FormControl>
                  <Input placeholder="Central Perk" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor="address">Address</FormLabel>
                <FormControl>
                  {/* TODO:  IDEA -> User can copy paste the google maps link, and then automatically generate/show the maps */}
                  <Input
                    placeholder="The Friends Experience, 130 E 23rd St."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {buttonLabel}
        </Button>
      </form>
    </Form>
  );
}

export function Loading() {
  return (
    <div className="flex w-full flex-col space-y-4">
      <Skeleton className="h-9 w-full" />
    </div>
  );
}
