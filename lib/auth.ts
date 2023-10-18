import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/prisma"

import { EventProps, UserProps } from "./types"

export type Session = {
  user: {
    id: string
    email: string
    name: string
  }
}

export async function getSession() {
  return (await getServerSession(authOptions)) as Session
}

export function getSearchParams(url: string) {
  const searchParams = new URL(url).searchParams
  const params: Record<string, string> = {}
  searchParams.forEach((value, key) => {
    params[key] = value
  })
  return params
}

type WithUserAuthHandler<T extends boolean> = {
  (
    req: Request,
    res: Response,
    session: Session,
    user: T extends true ? UserProps : undefined,
  ): void
}

export const withUserAuth =
  <T extends boolean = false>(
    handler: WithUserAuthHandler<T>,
    { needUserDetails }: { needUserDetails?: T } = {},
  ) =>
  async (req: Request, res: Response) => {
    const session = await getSession()
    if (!session.user.id) {
      return new Response("Unauthorized: Login required.", { status: 401 })
    }

    if (req.method === "GET")
      return handler(
        req,
        res,
        session,
        undefined as T extends true ? UserProps : undefined,
      )

    if (needUserDetails) {
      const user = (await db.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          name: true,
          email: true,
        },
      })) as UserProps

      return handler(
        req,
        res,
        session,
        user as T extends true ? UserProps : undefined,
      )
    }

    return handler(
      req,
      res,
      session,
      undefined as T extends true ? UserProps : undefined,
    )
  }

type WithAuthHandler = {
  ({
    req,
    params,
    searchParams,
    session,
    event,
  }: {
    req: Request
    params: Record<string, string>
    searchParams: Record<string, string>
    session: Session
    event: EventProps
  }): Promise<Response>
}

export const withAuth =
  (handler: WithAuthHandler) =>
  async (
    req: Request,
    { params }: { params: Record<string, string> | undefined },
  ) => {
    const session = await getSession()

    if (!session.user.id) {
      return new Response("Unauthorized: Login required.", { status: 401 })
    }
    const searchParams = getSearchParams(req.url)
    const { slug } = params || {}

    const eventData = await db.event.findUnique({
      where: { url: slug },
      select: {
        id: true,
        name: true,
        description: true,
        isShowGroomNameFirst: true,
        groomName: true,
        groomInstagram: true,
        groomPhoto: true,
        isShowGroomParentsName: true,
        groomParentsName: true,
        brideName: true,
        brideInstagram: true,
        bridePhoto: true,
        isShowBrideParentsName: true,
        brideParentsName: true,
        published: true,
        url: true,
        date: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!eventData) {
      return new Response("Not found.", { status: 404 })
    }

    if (eventData.user.id !== session.user.id) {
      return new Response(
        "Forbidden: You do not have permission to access this resource.",
        {
          status: 403,
        },
      )
    }

    return handler({
      req,
      params: params || {},
      searchParams,
      session,
      event: eventData as EventProps,
    })
  }

interface WithSessionHandler {
  ({
    req,
    params,
    // searchParams,
    session,
  }: {
    req: Request
    params: Record<string, string>
    // searchParams: Record<string, string>;
    session: Session
  }): Promise<Response>
}

export const withSession =
  (handler: WithSessionHandler) =>
  async (req: Request, { params }: { params: Record<string, string> }) => {
    const session = await getSession()

    if (!session?.user?.id) {
      return new Response("Unauthorized: Login required.", { status: 401 })
    }
    return handler({
      req,
      params: params || {},
      session,
    })
  }
