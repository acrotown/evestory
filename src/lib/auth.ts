import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/nextauth";

export type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
};

export async function getSession() {
  return (await getServerSession(authOptions)) as Session;
}
