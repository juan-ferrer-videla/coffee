"use client";

import { useState, type FC, type ComponentProps, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { getParseDate } from "@/lib/utils";

export const InputCalendar: FC<
  ComponentProps<"input"> & { initialDate?: number }
> = ({ initialDate, ...props }) => {
  const [date, setDate] = useState<Date | undefined>(
    initialDate ? new Date(initialDate) : undefined,
  );
  const [value, setValue] = useState(initialDate || 0);

  useEffect(() => {
    if (!date) {
      setValue(0);
      return;
    }
    setValue(date.getTime());
  }, [date]);

  return (
    <div className="space-y-4">
      <Input {...props} value={value || ""} type="hidden" />
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        defaultMonth={date}
        className="w-fit rounded-md border shadow"
      />
      {!!value && <p className="text-sm">{getParseDate(value)}</p>}
    </div>
  );
};
