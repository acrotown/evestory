import { PersonIcon } from "@radix-ui/react-icons"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Overview() {
  return (
    <MaxWidthWrapper>
      <section className="pt-10">
        <div className="space-y-6">
          <h1 className="font-display text-5xl">Dashboard</h1>

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
      </section>
    </MaxWidthWrapper>
  )
}
