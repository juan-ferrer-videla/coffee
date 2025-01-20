import { getPresentialCourses } from "@/_actions/actions";
import { SelectPresencialCourse } from "@/db/schema";
import banner from "@/assets/banner-courses.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { currency } from "@/lib/utils";
import { FrequentQuestions } from "@/components/faq-courses";
import { InstructorCard } from "@/components/instructor-card";

const FindCourse = async (id: number) => {
  const courses: SelectPresencialCourse[] = await getPresentialCourses();
  return courses.find((course) => course.id === id);
};

interface EventDescProps {
  params: Promise<{ id: string; lang: string }>;
}

export default async function CoursesDetail({ params }: EventDescProps) {
  const { id } = await params;
  const courseId = Number(id);
  const course = await FindCourse(courseId);

  if (!course) {
    return <div>Curso no encontrado</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* TÍTULO */}
      <h1 className="mb-2 text-4xl font-extrabold uppercase tracking-tight lg:text-5xl xl:text-6xl">
        {course.title}
      </h1>
      <Image
        src={banner}
        alt="banner"
        className="w-full rounded-2xl object-cover shadow-lg xl:h-96"
      />

      {/* SECCIÓN DEL INSTRUCTOR */}
      <h2 className="mt-4 text-center text-3xl">Instructor</h2>
      <div className="flex w-full flex-col items-center justify-center lg:flex-row lg:gap-12">
        {/* Tarjeta del Instructor */}
        <InstructorCard {...course} />

        {/* Video del Curso */}
        <div className="w-full lg:w-[48%]">
          <iframe
            src="https://www.youtube.com/embed/Nnxxfi0tuDg?si=7fmxQ3znvp-hDaSG"
            title="YouTube video player"
            className="aspect-video w-full rounded-2xl shadow-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          ></iframe>
        </div>
      </div>

      {/* DESCRIPCION DEL CURSO DE NUEVO ?? */}
      <div className="mt-2">
        <p className="mt-4 text-center text-lg">{course.description}</p>
      </div>

      {/* DETALLES DEL CURSO */}
      <div className="mt-8 w-full rounded-lg bg-gray-800 p-6 shadow-lg lg:w-4/5">
        <div>
          <h2 className="mb-4 text-2xl">Detalles del Curso Presencial</h2>
          <ul className="space-y-2">
            <li>
              <strong className="">Fecha de inicio:</strong>{" "}
              <span className="">{course.initialDate}</span>
            </li>
            <li>
              <strong className="">Horario:</strong>{" "}
              <span className="">{course.schedule}</span>
            </li>
            <li>
              <strong className="">Vacantes disponibles:</strong>{" "}
              <span className="">
                {course.vacancies
                  ? course.vacancies
                  : "No hay vacantes disponibles"}
              </span>
            </li>
            <li>
              <strong className="">Ubicación:</strong>{" "}
              <span className="">{course.location}</span>
            </li>
            <li>
              <strong className="">Contenido:</strong>{" "}
              <span className="">{course.content}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* PRECIO Y BOTÓN DE COMPRA */}
      <div className="mt-8 flex w-full items-center justify-center gap-4 lg:w-4/5 lg:flex-row">
        <p className="flex h-full items-center justify-center rounded bg-customYellow px-4 py-2 text-xl font-bold text-black shadow">
          {currency.format(course.price)}
        </p>
        <Button
          variant="secondary"
          className="flex h-full w-full items-center justify-center px-4 py-2 text-lg lg:w-min"
        >
          Adquirir
        </Button>
      </div>

      {/* PREGUNTAS FRECUENTES */}
      <div className="mt-12 w-full lg:w-4/5">
        <h2 className="mb-4 text-center text-3xl">Preguntas Frecuentes</h2>
        <FrequentQuestions />
      </div>
    </div>
  );
}
