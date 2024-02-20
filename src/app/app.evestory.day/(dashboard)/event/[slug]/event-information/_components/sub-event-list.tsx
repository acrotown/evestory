"use client";

import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import React, { useState } from "react";
import Balancer from "react-wrap-balancer";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getEvent } from "@/lib/db/events";
import { cn } from "@/lib/utils";

import { deleteSubEvent } from "../_action/delete-sub-event";
import { Mode, useSubEventSearchParams } from "../hooks";
import SubEventEmpty from "./sub-event-empty";
import SubEventModal from "./sub-event-modal";

export default function SubEventList({
  event,
}: {
  event: Awaited<ReturnType<typeof getEvent>>;
}) {
  let router = useRouter();
  let [subEventSP, setSubEventSP] = useSubEventSearchParams();
  let groupByDate = (event: Awaited<ReturnType<typeof getEvent>>) => {
    return event?.subEvents
      .sort((a, b) => {
        let startTime = new Date(a.startTime).getTime();
        let endTime = new Date(b.startTime).getTime();

        return startTime - endTime;
      })
      .reduce((acc, se) => {
        let date = format(new Date(se.date), "yyyy-MM-dd");

        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date]?.push(se);

        return acc;
      }, {} as Record<string, Array<(typeof event.subEvents)[number]>>);
  };

  let groupedSubEvents = groupByDate(event);

  let hasSubEvents = event?.subEvents.length > 0;

  let handleEdit = (item: (typeof event.subEvents)[number]) => {
    setSubEventSP({
      sub_event_id: item.id,
      mode: Mode.Edit,
    });
  };

  let handlePreview = (item: (typeof event.subEvents)[number]) => {
    setSubEventSP({
      sub_event_id: item.id,
      mode: Mode.Preview,
    });
  };

  let handleCreate = () => {
    setSubEventSP({
      event_id: event.id,
      mode: Mode.Create,
    });
  };

  let deleteAction = useAction(deleteSubEvent, {
    onSuccess(data) {
      if (data.ok) {
        router.refresh();
        setSubEventSP({ mode: null, sub_event_id: null });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError(error) {
      console.log(error);
      toast.error("Failed to delete schedule.");
    },
  });

  let handleDelete = (id: string) => {
    setSubEventSP({ mode: Mode.Delete, sub_event_id: id });
  };

  let handleCancelDelete = () => {
    setSubEventSP({ mode: null, sub_event_id: null });
  };

  let handleConfirmDelete = () => {
    if (!subEventSP.sub_event_id && subEventSP.mode !== Mode.Delete) {
      return;
    }
    deleteAction.execute({ id: subEventSP.sub_event_id });
  };

  if (!event) {
    return null;
  }

  return (
    <>
      <Card
        className={cn(
          "mt-8 flex flex-col border border-dashed",
          !hasSubEvents && "min-h-[350px]",
        )}
      >
        {hasSubEvents ? (
          <div className="relative my-6 ml-6 border-l-2">
            {groupedSubEvents &&
              Object.keys(groupedSubEvents).map((key) => {
                let subEvent = groupedSubEvents?.[key];
                return (
                  <React.Fragment key={key}>
                    <CardHeader className="relative left-[-13px] flex flex-row items-center space-x-4 pl-0 pt-0">
                      <div className="h-6 w-6 rounded-full border-4 border-background bg-governor-bay" />
                      <CardTitle className="!mt-0 text-xl font-bold leading-none">
                        {format(new Date(key), "PPP")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent key={key} className="w-full space-y-3">
                      {subEvent?.map((item) => {
                        return (
                          <Card
                            key={item.id}
                            className="relative hover:cursor-pointer hover:border hover:border-governor-bay"
                            onClick={() => {
                              handlePreview(item);
                            }}
                          >
                            <CardContent className="flex min-h-[48px] justify-between pt-6">
                              <div className="flex items-start space-x-4">
                                <div className="flex flex-col">
                                  <time className="text-sm font-bold">
                                    {format(new Date(item.startTime), "kk:mm")}
                                  </time>
                                  <time className="text-sm font-bold">
                                    {format(new Date(item.endTime), "kk:mm")}
                                  </time>
                                </div>
                                <div>
                                  <CardTitle className="text-2xl leading-none">
                                    <Balancer>{item.name}</Balancer>
                                  </CardTitle>
                                  <CardDescription>
                                    <Balancer>{item.description}</Balancer>
                                  </CardDescription>
                                </div>
                              </div>
                              <div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                      <DotsVerticalIcon />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(item);
                                      }}
                                    >
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(item.id);
                                      }}
                                    >
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </CardContent>
                  </React.Fragment>
                );
              })}
          </div>
        ) : (
          <SubEventEmpty onClickCreate={handleCreate} />
        )}

        {hasSubEvents && (
          <CardFooter>
            <Button className="w-full" onClick={handleCreate}>
              Create more schedule
            </Button>
          </CardFooter>
        )}
      </Card>

      <AlertDialog
        open={!!subEventSP.sub_event_id && subEventSP.mode === Mode.Delete}
        onOpenChange={(e) => {
          if (!e) {
            setSubEventSP({ mode: null, sub_event_id: null });
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              schedule from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <SubEventModal />
    </>
  );
}
