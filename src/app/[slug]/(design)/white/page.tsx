import CoverPage from "./cover/page";

export default async function Page({ params }: { params: { slug: string } }) {
  return <CoverPage params={params} />;
}
