"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <svg
      width="96"
      height="100"
      viewBox="0 0 96 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-6", className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.70105 68.4878L96 31.838C88.8423 13.2163 70.7868 0 49.6445 0C22.2266 0 0 22.2266 0 49.6445C0 56.3146 1.31544 62.6775 3.70105 68.4878ZM71.5285 68.9865L19.98 89.4552C28.2562 95.6321 38.5233 99.289 49.6445 99.289C66.7178 99.289 81.7781 90.6703 90.712 77.5464L71.5285 68.9865Z"
        fill={theme === "light" ? "#020817" : "#F4F5F8"}
      />
    </svg>
  );
}
