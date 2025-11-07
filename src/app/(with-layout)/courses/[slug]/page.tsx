import { getCourse } from "@/actions/courses";
import { LessonDetails } from "@/components/pages/courses/course-page/lesson-details";
import { TopDetails } from "@/components/pages/courses/course-page/top-details";
import { notFound } from "next/navigation";

type CoursePageProps = {
    params: Promise<{slug: string}>
};

export default async function CoursePage({ params }: CoursePageProps) {
    const { slug } = await params; //pega o parâmetro do curso

    const { course } = await getCourse(slug); //Busca o curso pelo parâmetro

    if(!course) return notFound(); //Caso o curso não existe, mostra a página 404.

    return (
        <div className="w-full h-screen overflow-hidden grid grid-cols-[1fr_auto]">
            <div className="w-full h-full overflow-y-auto">
                <TopDetails course={course} />
                <LessonDetails lesson={course.modules[0].lessons[0]}></LessonDetails>
            </div>

        </div>
    )
}