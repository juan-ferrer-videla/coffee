import { getUser } from "@/_actions/actions";
import banner from "@/assets/banner-courses.png";
import Image from "next/image";
import { InstructorCard } from "@/components/instructor-card";
import { redirect } from "next/navigation";
import { TLocale } from "@/i18n";
import { getDictionary } from "@/get-dictionary";
import instructorImg from "@/assets/instructorImg.jpg";

import { CourseContent } from "@/components/course-content";

const virtualCourses = {
  id: 1,
  title: "Curso Virtual",
  description:
    "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos.",
  price: 25000,
  img: instructorImg,
  introVideoURL: "https://www.youtube.com/watch?v=uR6JLDn1kew",
  instructor: "Jorge Gutierrez",
  instructorImg: "universo-coffee/mwhm7ejhluanqlagz71t",
  instructorDescription:
    "Hola mi nombre es texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum",
  content: "contenido del curso",
};

const courseModules = [
  {
    id: 1,
    courseId: virtualCourses.id,
    title: "Modulo 1",
    order: 1,
  },
  {
    id: 2,
    courseId: virtualCourses.id,
    title: "Modulo 2",
    order: 2,
  },
  {
    id: 3,
    courseId: virtualCourses.id,
    title: "Modulo 3",
    order: 3,
  },
];

enum ItemType {
  video = "video",
  pdf = "pdf",
  quiz = "quiz",
}

const modulesItems = [
  {
    id: 1,
    moduleId: 1,
    title: "Clase 1",
    type: ItemType.pdf,
    resourceUrl: "https://example.com/doc1.pdf",
    order: 1,
  },
  {
    id: 2,
    moduleId: 1,
    title: "Clase 2",
    type: ItemType.video,
    resourceUrl: "https://www.youtube.com/watch?v=Toq85_RPmus",
    order: 1,
  },
  {
    id: 3,
    moduleId: 1,
    title: "Clase 3",
    type: ItemType.quiz,
    resourceUrl: "https://example.com/doc1.pdf",
    order: 1,
  },
  {
    id: 4,
    moduleId: 2,
    title: "Clase 1",
    type: ItemType.video,
    resourceUrl: "https://www.youtube.com/watch?v=Toq85_RPmus",
    order: 1,
  },
  {
    id: 5,
    moduleId: 3,
    title: "Clase 1",
    type: ItemType.quiz,
    resourceUrl: "/quiz/3",
    order: 1,
  },
];

interface EventDescProps {
  params: Promise<{ id: string; lang: TLocale }>;
}

export default async function CourseStudy({ params }: EventDescProps) {
  const user = await getUser();
  if (!user) redirect(`/sign-in?redirect=my-courses`);

  const course = virtualCourses;

  if (!course) {
    return <div>Curso no encontrado</div>;
  }

  const { lang } = await params;
  const { course_details, content } = await getDictionary(lang);

  const modulesWithItems = courseModules.map((module) => ({
    ...module,
    items: modulesItems.filter((item) => item.moduleId === module.id),
  }));

  return (
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
        <CourseContent modules={modulesWithItems} />
      </div>
    </div>
  );
}
