import { getEvents } from "@/_actions/actions";
import { CreateEvent } from "./create-event";
import { Event } from "./event";
import { Suspense } from "react";
import { GridSkeleton } from "@/components/grid-skeleton";

const Events = async () => {
  const events = await getEvents();

  return (
    <ul className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
      {events.map((event) => (
        <li key={event.title} className="w-full">
          <Event {...event} />
        </li>
      ))}
    </ul>
  );
};

export default async function EventPage() {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight lg:text-5xl xl:text-6xl">
          Eventos
        </h1>
        <p className="mb-8 max-w-2xl scroll-m-20 text-lg font-light text-muted-foreground sm:mb-12 md:mb-16">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam facere
        </p>
      </div>
      <CreateEvent />
      <Suspense fallback={<GridSkeleton />}>
        <Events />
      </Suspense>
    </>
  );
}
