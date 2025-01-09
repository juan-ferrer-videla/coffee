import { getPresentialCourses, isAdmin } from "@/_actions/actions";
import { auth } from "@/auth";
import { TLocale } from "@/i18n";
import { redirect } from "next/navigation";
import { CreateCourse } from "./create-presential-course";
import { PresentialCourse } from "./course";

export default async function Courses({
  params,
}: Readonly<{
  params: Promise<{ lang: TLocale }>;
}>) {
  const { lang } = await params;

  const session = await auth();
  const email = session?.user?.email;
  if (!email) redirect(`/${lang}/sign-in?redirect=admin`);

  const isAuthorized = await isAdmin(email);
  if (!isAuthorized) redirect(`/${lang}`);

  const courses = await getPresentialCourses();

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

      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <PresentialCourse {...course} />
          </li>
        ))}
      </ul>
    </>
  );
}
