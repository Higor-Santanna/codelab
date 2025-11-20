"use client"
import { usePreferencesStore } from "@/stores/preferences";
import dynamic from "next/dynamic";
const VideoPlayer = dynamic(() => import("./video-player"), { ssr: false });
type LessonPlayerProps = {
    lesson: CourseLesson;
};

//Esse será o componente que irá mostrar o aula para o usuário
export const LessonPlayer = ({lesson}: LessonPlayerProps) => {
    const autoplay = usePreferencesStore((state) => state.autoplay); //aqui eu pego apenas a funcioanalidade do autoplay, evitando conflito com alguma outra funcionalidade que seja semelhante

    const videoId = lesson.videoId; //Pega o ID do vídeo para quando o usuário for para a próxima aula ela começa a rodar sozinha.
    return (
        <div className="overflow-hidden w-full aspect-video bg-black">
            <VideoPlayer videoId={videoId} autoplay={autoplay}/>
        </div>
    )
}