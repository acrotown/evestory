import { DefaultSession } from "next-auth"

export interface UserProps extends DefaultSession {
  user: {
    name: string
    email: string
    image: string
    id: string
    createdAt: string
  }
}
