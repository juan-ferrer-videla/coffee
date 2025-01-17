import { getPresentialCourses } from "@/_actions/actions";
import { getDictionary } from "@/get-dictionary";
import { TLocale } from "@/i18n";
import { Suspense } from "react";
import banner from "@/assets/banner-courses.png";
import Image from "next/image";
import { CourseCard } from "@/components/course-card";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const courses = await getPresentialCourses();

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-8 text-4xl font-extrabold uppercase tracking-tight lg:text-5xl xl:text-6xl">
          {dictionary.ourCourses}
        </h1>
        <Image
          src={banner}
          alt="banner"
          className="mb-6 w-full rounded-2xl object-cover xl:h-96"
        />
        <div className="mb-12 mt-2">
          <p className="mt-4 text-center text-lg">
            We are a team of passionate people whose goal is to improve
            everyone&apos;s life through disruptive products. We build great
            products to solve your business problems. loren ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Hic veniam quam et quaerat,
            voluptatibus harum illum magnam dolores totam repudiandae dolore sed
            inventore aspernatur nostrum blanditiis enim sapiente! Laudantium,
            nihil. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores excepturi expedita temporibus. Vero aspernatur
            asperiores, fuga, accusantium earum alias dolor dignissimos fugiat
            vel, harum a. Consectetur reiciendis eveniet mollitia fuga.
          </p>
        </div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Nnxxfi0tuDg?si=7fmxQ3znvp-hDaSG"
          title="YouTube video player"
          className="frameBorder-4 referrerPolicy-strict-origin-when-cross-origin rounded-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        ></iframe>
      </div>

      <div className="mt-8">
        <Suspense fallback={"Loading..."}>
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </Suspense>
      </div>
    </>
  );
}
