"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { InstagramLogoIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { CoupleInformationSchema } from "@/app/app.evestory.day/(dashboard)/event/[slug]/couple-information/_schema/update-couple-information";
import InputForm from "@/components/form/input";
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
import InputFile from "@/components/ui/input-file";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { getEvent } from "@/lib/db/events";

import { updateCoupleInformation, updatePhoto } from "../_action";

export default function CoupleInformationForm({
  event,
}: {
  event: Awaited<ReturnType<typeof getEvent>>;
}) {
  const form = useForm<z.infer<typeof CoupleInformationSchema>>({
    resolver: zodResolver(CoupleInformationSchema),
    defaultValues: {
      eventId: event?.id,
      groomId: event?.grooms?.id,
      brideId: event?.brides?.id,
      isShowGroomNameFirst: !!event?.isShowGroomNameFirst,
      isShowGroomParentsName: !!event?.grooms?.isShowParentsName,
      groomName: event?.grooms?.name,
      groomInstagram: event?.grooms?.instagramUsername || "",
      groomPhoto: event?.grooms?.photoUrl || "",
      groomParentsName: event?.grooms?.parentsName || "",
      isShowBrideParentsName: !!event?.brides?.isShowParentsName,
      brideName: event?.brides?.name,
      brideInstagram: event?.brides?.instagramUsername || "",
      bridePhoto: event?.brides?.photoUrl || "",
      brideParentsName: event?.brides?.parentsName || "",
    },
  });
  const router = useRouter();

  let { execute, status } = useAction(updateCoupleInformation, {
    onSuccess(data) {
      if (data.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
  });

  let updatePhotoAction = useAction(updatePhoto, {
    onSuccess(data) {
      if (!data.ok && data.data === null) {
        toast.error(data.message);
        return;
      }

      if (data.data) {
        if ("groomPhotoUrl" in data.data) {
          form.setValue("groomPhoto", data.data.groomPhotoUrl as string);
        }

        if ("bridePhotoUrl" in data.data) {
          form.setValue("bridePhoto", data.data.bridePhotoUrl as string);
        }
      }
      toast.success(data.message);
      router.refresh();
    },
  });

  let isLoading =
    status === "executing" || updatePhotoAction.status === "executing";

  const onSubmit = async (data: z.infer<typeof CoupleInformationSchema>) => {
    execute(data);
  };

  if (!event?.id) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-4"
      >
        <div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="isShowGroomNameFirst"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Show grooms name first</FormLabel>
                    <FormDescription>
                      Turn this on if you want to show the grooms name first.
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
                    <FormLabel>Show grooms parents name</FormLabel>
                    <FormDescription>
                      Turn this on if you want to show the grooms parents name.
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
                  );
                }}
              />
            ) : null}
            <FormField
              control={form.control}
              name="isShowBrideParentsName"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Show brides parents name</FormLabel>
                    <FormDescription>
                      Turn this on if you want to show the brides parents name.
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
                          autoCapitalize="words"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            ) : null}
          </div>
        </div>

        <Separator />

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
                );
              }}
            />
          </div>
        </div>

        <div className=":flex-row flex flex-row space-y-4 md:space-x-4 md:space-y-0">
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
                        onChange={(url) => {
                          if (event.grooms?.id === undefined) {
                            return;
                          }
                          updatePhotoAction.execute({
                            groomId: event.grooms.id,
                            groomPhoto: url,
                          });
                        }}
                        value={field.value}
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
              name="bridePhoto"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Bride photo</FormLabel>
                    <FormControl>
                      <InputFile
                        endPoint="imageUploader"
                        onChange={(url) => {
                          if (event.brides?.id === undefined) {
                            return;
                          }
                          updatePhotoAction.execute({
                            brideId: event.brides.id,
                            bridePhoto: url,
                          });
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
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
                        placeholder="chandlerbing"
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
              name="brideInstagram"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Bride&apos;s instagram</FormLabel>
                    <FormControl>
                      <Input
                        leftElement={<InstagramLogoIcon />}
                        placeholder="monicageller"
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
  );
}
