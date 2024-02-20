"use client";

import { useParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { togglePublish } from "../_actions/publish-switch";

export default function PublishSwitch({
  isPublished,
}: {
  isPublished: boolean;
}) {
  let { slug } = useParams();

  let action = useAction(togglePublish, {
    onSuccess(data, input) {
      if (!data.ok) {
        toast.error("Failed to update event.");
        return;
      }

      if (input.isPublished) {
        toast.success("Event published.");
      } else {
        toast.success("Event unpublished.");
      }
    },
  });

  if (!slug) return null;

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={isPublished}
        onCheckedChange={(e) =>
          action.execute({
            slug: slug as string,
            isPublished: e,
          })
        }
      />
      <Label>Publish event</Label>
    </div>
  );
}
