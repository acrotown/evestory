import { redirect } from "next/navigation";

export default function Page({ params }: { params: { slug: string } }) {
  return redirect(`/event/${params.slug}/overview`);
}
