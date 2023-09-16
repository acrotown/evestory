"use client"

import { useTheme } from "next-themes"
import { Toaster as ToasterSonner } from "sonner"

const Toaster = () => {
  const { theme } = useTheme() as {
    theme: "light" | "dark" | "system" | undefined
  }

  return (
    <ToasterSonner
      closeButton
      toastOptions={{
        style: {
          background: "hsl(var(--background))",
        },
      }}
      theme={theme}
    />
  )
}

export { Toaster }
