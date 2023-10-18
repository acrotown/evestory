import { db } from "@/lib/prisma"
import { constructMetadata } from "@/lib/utils"

export async function generateMetadata({
  params,
}: {
  params: { domain: string }
}) {
  const title = `${params.domain.toUpperCase()}`
  const description = `${params.domain.toUpperCase()} is a wedding invitation website.`

  return constructMetadata({
    title,
    description,
  })
}

export async function generateStaticParams() {
  const domains =
    process.env.VERCEL_ENV === "production"
      ? await db.event.findMany({
          select: {
            url: true,
          },
        })
      : []

  return domains.map(({ url }) => ({
    domain: url,
  }))
}
export default function Domain({ params }: { params: { domain: string } }) {
  return (
    <div>
      <h1>Domain {params.domain}</h1>
    </div>
  )
}
