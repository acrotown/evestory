import { cn } from "@/lib/utils";
import { alice } from "@/styles/fonts";

import { BottomNav } from "./bottom-nav";
import { Background } from "./white/background";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("relative", alice.className)}>
      <div className="relative h-[100svh]">
        <Background />

        <div className="z-10 h-full overflow-auto scrollbar-hide max-lg:mx-4">
          {children}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
