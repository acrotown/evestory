import {
  Alice,
  Cormorant,
  Dr_Sugiyama,
  Inter,
  Style_Script,
} from "next/font/google";
import localFont from "next/font/local";

export const cal = localFont({
  src: "./CalSans-SemiBold.otf",
  display: "swap",
  variable: "--font-cal",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// White
export const alice = Alice({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alice",
  display: "swap",
});

export const cormorant = Cormorant({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});
// White

// Black
export const dr_sugiyama = Dr_Sugiyama({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dr-sugiyama",
  display: "swap",
});
// Black

// Ivory
export const style_script = Style_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-style-script",
  display: "swap",
});
// Ivory
