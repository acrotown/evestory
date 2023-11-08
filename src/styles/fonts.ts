import { Inter } from "next/font/google"
import localFont from "next/font/local"

export const cal = localFont({
  src: "./CalSans-SemiBold.otf",
  variable: "--font-cal",
})

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
