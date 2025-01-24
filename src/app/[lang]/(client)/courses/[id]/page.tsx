import {
  getPresentialCourses,
  getPresentialCoursesVacancies,
  getUser,
} from "@/_actions/actions";
import banner from "@/assets/banner-courses.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { currency } from "@/lib/utils";
import { FrequentQuestions } from "@/components/faq-courses";
import { InstructorCard } from "@/components/instructor-card";
import { redirect } from "next/navigation";
import { createCoursePreference } from "@/_actions/mercadopago";
import { TLocale } from "@/i18n";
import { getDictionary } from "@/get-dictionary";

interface EventDescProps {
  params: Promise<{ id: string; lang: TLocale }>;
}

export default async function CoursesDetail({ params }: EventDescProps) {
  const { id } = await params;
  const courseId = Number(id);
  const [user, courses, coursesCount] = await Promise.all([
    getUser(),
    getPresentialCourses(),
    getPresentialCoursesVacancies(),
  ]);
  if (!user) redirect(`/sign-in?redirect=courses/${courseId}`);

  const course = courses.find((course) => course.id === courseId);

  if (!course) {
    return <div>Curso no encontrado</div>;
  }
  const vacancies = course.vacancies - coursesCount;

  const { lang } = await params;
  const {
    faq,
    course_buy_button,
    schedule,
    course_details,
    start_date,
    location,
    content,
  } = await getDictionary(lang);

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1 className="mb-2 text-4xl font-extrabold uppercase tracking-tight lg:text-5xl xl:text-6xl">
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
            src="https://www.youtube.com/embed/Nnxxfi0tuDg?si=7fmxQ3znvp-hDaSG"
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
              <strong className="">{start_date}:</strong>{" "}
              <span className="">{course.initialDate}:</span>
            </li>
            <li>
              <strong className="">{schedule}:</strong>{" "}
              <span className="">{course.schedule}:</span>
            </li>
            <li>
              <strong className="">{vacancies}:</strong>{" "}
              <span className="">
                {vacancies > 0 ? vacancies : "No hay vacantes disponibles"}
              </span>
            </li>
            <li>
              <strong className="">{location}:</strong>{" "}
              <span className="">{course.location}</span>
            </li>
            <li>
              <strong className="">{content}:</strong>{" "}
              <span className="">{course.content}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 flex w-full items-center justify-center gap-4 lg:w-4/5 lg:flex-row">
        <p className="flex h-full items-center justify-center rounded px-4 py-2 text-xl font-bold shadow">
          {currency.format(course.price)}
        </p>
        <form
          action={async () => {
            "use server";
            await createCoursePreference(user.id, courseId);
          }}
        >
          <Button> {course_buy_button}</Button>
        </form>
      </div>

      <div className="mt-12 w-full lg:w-4/5">
        <h2 className="mb-4 text-center text-3xl">{faq}</h2>
        <FrequentQuestions />
      </div>
    </div>
  );
}
