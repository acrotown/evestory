"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useMediaQuery } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { IS_DESKTOP } from "@/lib/constants";
import { titleCase } from "@/lib/utils";
import { events } from "#/drizzle/schema";

import { chooseTemplateAction } from "../_actions/choose-template";

let fallbackImage = "https://generated.vusercontent.net/placeholder.svg";

type Template = {
  name: (typeof events.design.enumValues)[number];
  image: string;
  premium: boolean;
};

let premiumTemplates: Array<Template> = [
  {
    name: "ivory", // Ivory is a type of white color
    image: fallbackImage,
    premium: true,
  },
  {
    name: "alabaster", // Ivory is a type of white color
    image: fallbackImage,
    premium: true,
  },
  // {
  //   name: "Marigold", // Marigold is a type of orange color
  //   image: fallbackImage,
  //   premium: true,
  // },
  // {
  //   name: "Scarlet", // Scarlet is a type of red color
  //   image: fallbackImage,
  //   premium: true,
  // },
  // {
  //   name: "Rosewood", // Rosewood is a type of pink color
  //   image: fallbackImage,
  //   premium: true,
  // },
  // {
  //   name: "Dandelion", // Dandelion is a type of yellow color
  //   image: fallbackImage,
  //   premium: true,
  // },
  // {
  //   name: "Moss", // Moss is a type of green color
  //   image: fallbackImage,
  //   premium: true,
  // },
  // {
  //   name: "Arctic", // Arctic is a type of blue color
  //   image: fallbackImage,
  //   premium: true,
  // },
  // {
  //   name: "Onyx", // Onyx is a type of black color
  //   image: fallbackImage,
  //   premium: true,
  // },
  // {
  //   name: "Iris", // Iris is a type of purple color
  //   image: fallbackImage,
  //   premium: true,
  // },
  // {
  //   name: "Brunette", // Brunette is a type of brown color
  //   image: fallbackImage,
  //   premium: true,
  // },
];

let freeTemplates: Array<Template> = [
  {
    name: "white", // Cotton is a type of white color
    image: fallbackImage,
    premium: false,
  },
  // {
  //   name: "Lemon", // Lemon is a type of yellow color
  //   image: fallbackImage,
  //   premium: false,
  // },
  // {
  //   name: "Mint", // Mint is a type of green color
  //   image: fallbackImage,
  //   premium: false,
  // },
  // {
  //   name: "Sky", // Sky is a type of blue color
  //   image: fallbackImage,
  //   premium: false,
  // },
  // {
  //   name: "Lavender", // Lavender is a type of purple color
  //   image: fallbackImage,
  //   premium: false,
  // },
  // {
  //   name: "Peach", // Peach is a type of orange color
  //   image: fallbackImage,
  //   premium: false,
  // },
  // {
  //   name: "Cherry", // Cherry is a type of red color
  //   image: fallbackImage,
  //   premium: false,
  // },
  // {
  //   name: "Plum", // Plum is a type of purple color
  //   image: fallbackImage,
  //   premium: false,
  // },
  // {
  //   name: "Chocolate", // Chocolate is a type of brown color
  //   image: fallbackImage,
  //   premium: false,
  // },
  {
    name: "black", // Coal is a type of black color
    image: fallbackImage,
    premium: false,
  },
];

let templates = [...premiumTemplates, ...freeTemplates];

export default function TemplateList({
  slug,
  currentDesign,
}: {
  slug: string;
  currentDesign: (typeof events.design.enumValues)[number];
}) {
  let [open, setOpen] = useState(false);
  let isDesktop = useMediaQuery(IS_DESKTOP);
  let [template, setTemplate] = useState<Pick<Template, "name">>({
    name: "white",
  });
  let router = useRouter();

  let action = useAction(chooseTemplateAction, {
    onSuccess(data) {
      if (data.ok) {
        toast.success(data.message);
        router.refresh();
      } else {
        toast.error(data.message);
      }
    },
    onError(err) {
      toast.error(err.serverError || "Error choosing template.");
    },
  });
  let isLoading = action.status === "executing";

  let handleChooseTemplate = () => {
    action.execute({
      name: template.name,
      url: slug,
    });
  };

  return (
    <>
      <div className="grid w-full grid-cols-1 items-stretch justify-center gap-10 pt-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
        {templates.map((template, index) => (
          <Link
            key={template.name + "-" + index}
            className="flex w-full max-w-sm scale-100 flex-col overflow-hidden rounded-lg border shadow-sm transition-transform hover:scale-105"
            href="#"
            onClick={() => {
              setTemplate({ name: template.name });
              setOpen(true);
            }}
          >
            <div className="aspect-[16/9] w-full">
              <Image
                alt="Preview"
                className="object-cover"
                height="297"
                src={template.image}
                style={{
                  aspectRatio: "528/297",
                  objectFit: "cover",
                }}
                width="528"
              />
            </div>
            <div className="bg-gradient-to-b from-muted/50 to-muted p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold leading-none">
                    {titleCase(template.name)}
                    {currentDesign === template.name && ` - current`}
                  </h3>
                  <Badge variant={template.premium ? "default" : "secondary"}>
                    {template.premium ? "Premium" : "Free"}
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>{template.name}</DialogTitle>
              <DialogDescription>
                Choose your design template for your event page.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
              <Carousel_ />
            </div>

            <DialogFooter>
              <Button variant="secondary">Preview</Button>
              <Button disabled={isLoading} onClick={handleChooseTemplate}>
                {isLoading && <ReloadIcon className="mr-2 animate-spin" />}
                Use this template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{template.name}</DrawerTitle>
              <DrawerDescription>
                Choose your design template for your event page.
              </DrawerDescription>

              <div className="flex justify-center">
                <Carousel_ />
              </div>
            </DrawerHeader>
            <DrawerFooter>
              <Button disabled={isLoading} onClick={handleChooseTemplate}>
                {isLoading && <ReloadIcon className="mr-2 animate-spin" />}
                Use this template
              </Button>
              <Button variant="secondary">Preview</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

export function Carousel_() {
  let isMedium = useMediaQuery("(min-width: 640px)");

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {isMedium && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}
