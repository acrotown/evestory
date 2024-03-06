"use client";

import { useMediaQuery } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

let templates = [
  {
    name: "Ivory", // Ivory is a type of white color
    description:
      "Perfect for showcasing your work in a beautiful and modern layout.",
    image: "https://generated.vusercontent.net/placeholder.svg",
  },
  {
    name: "Marigold", // Marigold is a type of orange color
    description:
      "Perfect for showcasing your work in a beautiful and modern layout.",
    image: "https://generated.vusercontent.net/placeholder.svg",
  },
  {
    name: "Scarlet", // Scarlet is a type of red color
    description:
      "Clean and elegant design for sharing your thoughts with the world.",
    image: "https://generated.vusercontent.net/placeholder.svg",
  },
  {
    name: "Rosewood", // Rosewood is a type of pink color
    description:
      "Start selling online with this stylish and feature-rich store.",
    image: "https://generated.vusercontent.net/placeholder.svg",
  },
  {
    name: "Dandelion", // Dandelion is a type of yellow color
    description:
      "Start selling online with this stylish and feature-rich store.",
    image: "https://generated.vusercontent.net/placeholder.svg",
  },
  {
    name: "Moss", // Moss is a type of green color
    description:
      "Sleek and professional template for your next big software project.",
    image: "https://generated.vusercontent.net/placeholder.svg",
  },
  {
    name: "Arctic", // Arctic is a type of blue color
    description:
      "Sleek and professional template for your next big software project.",
    image: "https://generated.vusercontent.net/placeholder.svg",
  },
  {
    name: "Onyx", // Onyx is a type of black color
    description:
      "Sleek and professional template for your next big software project.",
    image: "https://generated.vusercontent.net/placeholder.svg",
  },
  {
    name: "Iris", // Iris is a type of purple color
    description:
      "Sleek and professional template for your next big software project.",
    image: "https://generated.vusercontent.net/placeholder.svg",
  },
  {
    name: "Brunette", // Brunette is a type of brown color
    description:
      "Sleek and professional template for your next big software project.",
    image: "https://generated.vusercontent.net/placeholder.svg",
  },
];

export default function TemplateList() {
  let [open, setOpen] = useState(false);
  let isDesktop = useMediaQuery(IS_DESKTOP);

  return (
    <>
      <div className="grid w-full grid-cols-1 items-stretch justify-center gap-10 pt-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
        {templates.map((template, index) => (
          <Link
            key={template.name + "-" + index}
            className="flex w-full max-w-sm scale-100 flex-col overflow-hidden rounded-lg border shadow-sm transition-transform hover:scale-105"
            href="#"
            onClick={() => setOpen(true)}
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
                <h3 className="text-xl font-bold leading-none">
                  {template.name}
                </h3>
                <p className="truncate-2-lines text-sm text-muted-foreground">
                  {template.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Template name</DialogTitle>
              <DialogDescription>
                Choose your design template for your event page.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
              <Carousel_ />
            </div>

            <DialogFooter>
              <Button variant="secondary">Preview</Button>
              <Button>Use this template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Template name</DrawerTitle>
              <DrawerDescription>
                Choose your design template for your event page.
              </DrawerDescription>

              <div className="flex justify-center">
                <Carousel_ />
              </div>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Use this template</Button>
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
