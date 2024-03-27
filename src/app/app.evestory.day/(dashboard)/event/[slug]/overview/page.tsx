import { PersonIcon } from "@radix-ui/react-icons";
import { Suspense } from "react";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEventBySlug } from "@/lib/db/events";

import DeleteButton from "./_components/delete-button";
import PreviewButton from "./_components/preview-button";
import PublishSwitch from "./_components/publish-switch";

export default async function Overview({
  params,
}: {
  params: { slug: string };
}) {
  let { slug } = params;

  let event = await getEventBySlug(slug);

  return (
    <MaxWidthWrapper>
      <section className="pt-10">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="font-display text-4xl">Dashboard</h1>
              <div className="flex gap-2">
                <DeleteButton slug={slug} />
                <PreviewButton slug={slug} design={event.design} />
                <PublishSwitch isPublished={!!event?.isPublished} />
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="guest_list">Guest List</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle>Total Guests</CardTitle>
                      <PersonIcon />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">219</div>
                    </CardContent>
                  </Card>
                  <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle>Total Guests</CardTitle>
                      <PersonIcon />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">219</div>
                    </CardContent>
                  </Card>
                  <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle>Total Guests</CardTitle>
                      <PersonIcon />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">219</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Suspense>
      </section>
    </MaxWidthWrapper>
  );
}
