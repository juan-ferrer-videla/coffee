import { getCourses } from "@/_actions/actions";
import { getDictionary } from "@/get-dictionary";
import { TLocale } from "@/i18n";
import { Suspense } from "react";
import banner from "@/assets/banner-courses.png";
import Image from "next/image";
import { CourseCard } from "@/components/course-card";
import Link from "next/link";

const Courses = async () => {
  const courses = await getCourses();

  return (
    <ul className="grid gap-6">
      {courses.map((course) => (
        <li key={`${course.type}-${course.id}`}>
          <Link href={`/courses/${course.id}`}>
            <CourseCard key={course.id} {...course} />
          </Link>
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
      <h1 className="mb-8 text-center font-serif text-4xl tracking-tight sm:mb-12 md:mb-16 lg:text-5xl xl:text-6xl">
        {dictionary.ourCourses}
      </h1>
      <Image
        src={banner}
        alt="banner"
        className="w-full rounded-2xl object-cover xl:h-96"
      />

      <p className="mx-auto my-8 max-w-screen-lg text-center text-xl text-muted-foreground sm:my-12 md:my-16 lg:my-24">
        {dictionary.ourCourses_description}
      </p>

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/Nnxxfi0tuDg?si=7fmxQ3znvp-hDaSG"
        title="YouTube video player"
        className="my-8 aspect-video h-full w-full rounded-2xl sm:my-12 md:my-16 lg:my-24"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
      ></iframe>

      <div className="mt-8">
        <Suspense fallback={"Loading..."}>
          <Courses />
        </Suspense>
      </div>
    </>
  );
}
