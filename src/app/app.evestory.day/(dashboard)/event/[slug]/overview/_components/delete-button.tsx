"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Trash2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
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

import { deleteEvent } from "../_actions/delete-event";

export default function DeleteButton({ slug }: { slug: string }) {
  let [isOpen, setIsOpen] = useState(false);

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
      <Button
        size="icon"
        disabled={action.status === "executing"}
        variant="ghost"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {action.status === "executing" ? (
          <ReloadIcon className="h-5 w-5 animate-spin" />
        ) : (
          <Trash2Icon className="h-5 w-5" />
        )}
      </Button>

      <AlertDialog
        open={isOpen}
        onOpenChange={(e) => {
          setIsOpen(e);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              event from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                action.execute({ slug });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
