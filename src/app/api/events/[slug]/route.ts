import { withAuth } from "@/lib/auth"
import { db } from "@/lib/prisma"
import { CoupleInformationSchema } from "@/schemas/update-couple-information"

export const GET = withAuth(async ({ event }) => {
  return Response.json(event, { status: 200 })
})

export const PUT = withAuth(async ({ req, session, params }) => {
  console.log("params", params)
  try {
    const body = await req.json()
    const { slug } = params
    const data = CoupleInformationSchema.parse(body)

    const res = await db.event.update({
      where: {
        url: slug,
      },
      data: {
        name: data.eventName,
        description: data.description,
        groomName: data.groomName,
        brideName: data.brideName,
        groomInstagram: data.groomInstagram,
        brideInstagram: data.brideInstagram,
        groomPhoto: data.groomPhoto,
        bridePhoto: data.bridePhoto,
        groomParentsName: data.groomParentsName,
        brideParentsName: data.brideParentsName,
        isShowGroomNameFirst: data.isShowGroomNameFirst,
        isShowGroomParentsName: data.isShowGroomParentsName,
        isShowBrideParentsName: data.isShowBrideParentsName,
      },
    })
    return Response.json(
      { message: "Successfully updated event." },
      { status: 200 },
    )
  } catch (err) {
    console.log(err)
    return Response.json(
      { message: "Error updating event." },
      {
        status: 500,
      },
    )
  }
})
