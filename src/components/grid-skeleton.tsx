import React, { type FC, ComponentProps } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

export const GridSkeleton: FC<ComponentProps<"ul"> & { length?: number }> = ({
  length = 6,
  className,
  ...props
}) => {
  return (
    <ul
      className={cn(
        "mb-6 grid justify-center gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16",
        className,
      )}
      {...props}
    >
      {Array.from({ length }).map((_, index) => (
        <li key={index}>
          <Skeleton className="h-[420px] w-[330px] rounded-xl" />
        </li>
      ))}
    </ul>
  );
};
