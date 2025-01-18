import { getPresentialCourses } from "@/_actions/actions"
import { SelectPresencialCourse } from "@/db/schema";

const FindCourse = async (id:number) => {
    const courses: SelectPresencialCourse[] = await getPresentialCourses()
    return courses.find((course) => course.id === id)
}

interface EventDescProps {
    params: Promise<{ id: string; lang: string }>;
  }

export default async function CoursesDetail({params}: EventDescProps){
    const { id } = await params;
    const courseId = await Number(id);
    const course = await FindCourse(courseId)

    if (!course) {
        return <div>Curso no encontrado</div>;
      }

    return (
        <>
        <h1>{course?.title}</h1>
        </>
    )
}