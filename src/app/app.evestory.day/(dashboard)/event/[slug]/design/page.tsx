import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { db } from "@/lib/drizzle";
import { events } from "#/drizzle/schema";

import TemplateList from "./_components/template-list";

let getCurrentDesign = async (slug: string) => {
  return await db
    .select({ design: events.design })
    .from(events)
    .where(eq(events.url, slug));
};

export default async function Design({ params }: { params: { slug: string } }) {
  let [currentDesign] = await getCurrentDesign(params.slug);

  if (!currentDesign?.design) {
    notFound();
  }

  return (
    <MaxWidthWrapper>
      <section className="pt-10">
        <div className="">
          <h1 className="font-display text-4xl">Choose your design template</h1>
          <p className="text-muted-foreground">
            <Balancer>
              Browse the collection of stunning templates. Click on a template
              to select it for customization.
            </Balancer>
          </p>
        </div>

        <TemplateList
          slug={params.slug}
          currentDesign={currentDesign?.design}
        />
      </section>
    </MaxWidthWrapper>
  );
}
