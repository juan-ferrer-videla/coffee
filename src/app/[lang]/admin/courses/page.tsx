import {
  getPresentialCourses,
  getUsersToPresentialCourses,
} from "@/_actions/actions";
import { CreateCourse } from "./create-presential-course";
import { PresentialCourse } from "./course";
import { Suspense } from "react";
import { GridSkeleton } from "@/components/grid-skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PresentialCourses = async () => {
  const courses = await getPresentialCourses();

  return (
    <ul className="mb-6 sm:mb-10 md:mb-16">
      {courses.map((course) => (
        <li key={course.id}>
          <PresentialCourse {...course} />
        </li>
      ))}
    </ul>
  );
};

const CoursesInscriptions = async () => {
  const inscriptions = await getUsersToPresentialCourses();
  return (
    <Table>
      <TableCaption className="sr-only">Una lista de tus cursos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Pagado el</TableHead>
          <TableHead>Ubiucación</TableHead>
          <TableHead>Fecha de inicio</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="max-h-[70dvh] overflow-auto">
        {inscriptions.map(
          ({
            presentialCourses: { initialDate, title, location },
            id,
            purchasedAt,
          }) => (
            <>
              <TableRow key={id}>
                <TableCell className="font-medium">{title}</TableCell>
                <TableCell>{purchasedAt}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>{initialDate}</TableCell>
              </TableRow>
            </>
          ),
        )}
      </TableBody>
    </Table>
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
      <h2 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Cursos presenciales
      </h2>
      <Suspense fallback="loading...">
        <CoursesInscriptions />
      </Suspense>
    </>
  );
}
