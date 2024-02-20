import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function NotFound() {
  return (
    <MaxWidthWrapper className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-center font-display text-4xl">
        <Balancer>Whoops! Pulp Fiction moment</Balancer>
      </h1>
      <p className="mt-3 text-center text-xl">
        <Balancer>
          The content you&apos;re looking for is as elusive as Marsellus
          Wallace&apos;s briefcase.
        </Balancer>
      </p>
      <p className="mt-3 text-center text-xl">
        <Balancer>Not to worry, though. Let&apos;s retrace our steps.</Balancer>
      </p>
      <p className="text-center text-xl">
        Go back to the{" "}
        <Link className="font-semibold underline underline-offset-2" href="/">
          dashboard.
        </Link>
      </p>
      <Image
        src="/_static/404-animation.gif"
        width="800"
        height="800"
        alt="Not Found"
      />
    </MaxWidthWrapper>
  );
}
