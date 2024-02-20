import Balancer from "react-wrap-balancer";

import MaxWidthWrapper from "@/components/max-width-wrapper";

import TemplateList from "./_components/template-list";

export default function Design() {
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

        <TemplateList />
      </section>
    </MaxWidthWrapper>
  );
}
