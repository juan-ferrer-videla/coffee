import { getRemoteCourses, getUsersToRemoteCourses } from "@/_actions/actions";
import { CreateCourse } from "./create-remote-course";
import { Suspense } from "react";
import { GridSkeleton } from "@/components/grid-skeleton";

import { InscriptionTable } from "../presential/inscription-table";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { RemoteCourse } from "./remote-course";

const RemoteCourses = async () => {
  const courses = await getRemoteCourses();

  return (
    <ul className="mb-6 sm:mb-10 md:mb-16">
      {courses.map((course) => (
        <li key={course.id}>
          <RemoteCourse {...course} />
        </li>
      ))}
    </ul>
  );
};

export default async function Courses() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users-to-remote-courses"],
    queryFn: getUsersToRemoteCourses,
  });

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight lg:text-5xl xl:text-6xl">
          Cursos Remotos
        </h1>
        <p className="mb-8 max-w-2xl scroll-m-20 text-lg font-light text-muted-foreground sm:mb-12 md:mb-16">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam facere
        </p>
      </div>
      <CreateCourse />
      <Suspense fallback={<GridSkeleton />}>
        <RemoteCourses />
      </Suspense>
      <h2 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Cursos remotos
      </h2>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <InscriptionTable />
      </HydrationBoundary>
    </>
  );
}
