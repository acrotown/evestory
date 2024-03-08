import { Background } from "./background";
import { BottomNav } from "./bottom-nav";

export default function RightSectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="relative h-[100svh]">
        <Background />

        <div className="relative z-20 h-full overflow-auto scrollbar-hide max-lg:mx-4">
          {children}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
