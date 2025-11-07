import { LessonPlayer } from "./lesson-player";

type LessonDetailsProps = {
    lesson: CourseLesson
};

//Esse será o componente que irá tocar a vídeo aula
export const LessonDetails = ({lesson}: LessonDetailsProps) => {
    return(
        <>
            <LessonPlayer lesson={lesson}></LessonPlayer>
            <div className="p-6 flex flex-col gap-6">
                <p className="text-muted-foreground">{lesson.description}</p>
            </div>
        </>
    );
};