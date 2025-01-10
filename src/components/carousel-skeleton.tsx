import React from "react";
import { Skeleton } from "./ui/skeleton";

export const CarouselSkeleton = () => {
  return (
    <div className="mb-6 flex overflow-hidden">
      <div className="h-96 min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
      <div className="h-96 min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 md:pl-4 lg:basis-1/3">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
      <div className="h-96 min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 md:pl-4 lg:basis-1/3">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
    </div>
  );
};
