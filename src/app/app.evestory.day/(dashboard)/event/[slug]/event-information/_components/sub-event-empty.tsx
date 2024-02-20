import { CalendarIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

export default function SubEventEmpty({
  onClickCreate,
}: {
  onClickCreate: () => void;
}) {
  return (
    <div className="flex min-h-[350px] items-center justify-center">
      <CardContent className="mx-auto flex flex-col items-center justify-center text-center">
        <CalendarIcon className="h-10 w-10 text-muted-foreground" />
        <h3 className="text-md my-4 font-semibold">Ouch, no schedule added</h3>
        <Button size="sm" onClick={onClickCreate}>
          Add schedule
        </Button>
      </CardContent>
    </div>
  );
}
