import { getPresentialCourses } from "@/_actions/actions";
import { getDictionary } from "@/get-dictionary";
import { TLocale } from "@/i18n";
import { PresentialCourse } from "./course";
import { Suspense } from "react";

const Courses = async () => {
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

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight lg:text-5xl xl:text-6xl">
          {dictionary.courses}
        </h1>
        <p className="mb-8 max-w-2xl scroll-m-20 text-lg font-light text-muted-foreground sm:mb-12 md:mb-16">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam facere
        </p>
      </div>
      <section className="mb-6">
        <Suspense fallback={"Loading..."}>
          <Courses />
        </Suspense>
      </section>
    </>
  );
}
