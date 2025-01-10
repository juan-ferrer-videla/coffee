import { getPresentialCourses } from "@/_actions/actions";
import { CreateCourse } from "./create-presential-course";
import { PresentialCourse } from "./course";
import { Suspense } from "react";
import { GridSkeleton } from "@/components/grid-skeleton";

const PresentialCourses = async () => {
  const courses = await getPresentialCourses();

  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id}>
          <PresentialCourse {...course} />
        </li>
      ))}
    </ul>
  );
};

export default function Courses() {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight lg:text-5xl xl:text-6xl">
          Courses
        </h1>
        <p className="mb-8 max-w-2xl scroll-m-20 text-lg font-light text-muted-foreground sm:mb-12 md:mb-16">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam facere
        </p>
      </div>
      <CreateCourse />
      <Suspense fallback={<GridSkeleton />}>
        <PresentialCourses />
      </Suspense>
    </>
  );
}
