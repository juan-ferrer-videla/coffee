import { getRemoteCourse, getRemoteCourses, getUser } from "@/_actions/actions";
import banner from "@/assets/banner-courses.png";
import Image from "next/image";
import { InstructorCard } from "@/components/instructor-card";
import { redirect } from "next/navigation";
import { TLocale } from "@/i18n";
import { getDictionary } from "@/get-dictionary";

import { CourseContent } from "@/components/course-content";

interface EventDescProps {
  params: Promise<{ id: string; lang: TLocale }>;
}

export default async function CourseStudy({ params }: EventDescProps) {
  const user = await getUser();
  if (!user) redirect(`/sign-in?redirect=my-courses`);

  const { id } = await params;
  const courseId = Number(id);

  const course = await getRemoteCourse(courseId);

  console.log("CURSO", course)

  if (!course) {
    return <div>Curso no encontrado</div>;
  }

  const { lang } = await params;
  const { course_details, content } = await getDictionary(lang);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="mb-2 font-serif text-4xl tracking-tight lg:text-5xl xl:text-6xl">
          {course.title}
        </h1>
        <Image
          src={banner}
          alt="banner"
          className="w-full rounded-2xl object-cover shadow-lg xl:h-96"
        />

        <h2 className="mt-4 text-center text-3xl">Instructor</h2>
        <div className="flex w-full flex-col items-center justify-center lg:flex-row lg:gap-12">
          <InstructorCard {...course} />

          <div className="w-[90%] sm:w-[70%] lg:w-[48%]">
            <iframe
              src={course.introVideoURL}
              title="YouTube video player"
              className="aspect-video w-full rounded-2xl shadow-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            ></iframe>
          </div>
        </div>

        <div className="mt-2">
          <p className="mt-4 text-center text-lg">{course.description}:</p>
        </div>

        <div className="mt-8 w-full rounded-lg p-6 shadow-lg lg:w-4/5">
          <div>
            <h2 className="mb-4 text-2xl">{course_details}:</h2>
            <ul className="space-y-2">
              <li>
                <strong className="">{content}:</strong>{" "}
                <span className="">{course.content}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 w-full lg:w-4/5">
          <h1 className="mb-6 flex justify-center text-3xl font-extrabold uppercase tracking-tight lg:mb-8 lg:text-3xl xl:text-4xl">
            Segui aca tus clases!
          </h1>
          <CourseContent modules={course.modules} />
        </div>
      </div>
    </>
  );
}
