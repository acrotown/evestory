import EventAuth from "./auth"

export default function EventLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <EventAuth>{children}</EventAuth>
}
