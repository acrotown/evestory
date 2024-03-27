"use client";

import { EyeOpenIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { deleteEvent } from "../_actions/delete-event";

export default function PreviewButton({
  design,
  slug,
}: {
  design: string;
  slug: string;
}) {
  let router = useRouter();

  let action = useAction(deleteEvent, {
    onSuccess(data) {
      if (!data.ok) {
        console.error(data.message);
        toast.error(data.message);
        return;
      }

      toast.success("Event deleted successfully.");
    },
  });

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            disabled={action.status === "executing"}
            variant="ghost"
            onClick={() => {
              router.push(`/event/${slug}/preview`);
              // router.push(`/preview/${slug}`);
            }}
          >
            {action.status === "executing" ? (
              <ReloadIcon className="h-5 w-5 animate-spin" />
            ) : (
              <EyeOpenIcon className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Preview event</TooltipContent>
      </Tooltip>
    </>
  );
}
