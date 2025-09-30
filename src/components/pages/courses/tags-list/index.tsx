import { prisma } from "@/lib/prisma"
import { TagItem } from "./tag-item";
import { DraggableScroll } from "@/components/shared/draggable-scroll";

export const CourseTagsList = async () => {
    const tags = await prisma.courseTag.findMany(); //Busco todas as tags

    const sortedTags = tags.sort((a, b) => a.name.localeCompare(b.name)); //Faço com que a lista de tags fique em order alfabética
    return (
        <DraggableScroll  className="w-full flex gap-2 overflow-auto scroll-hidden mask-r-from-80% pr-28 outline-none scroll-hidden">
            {sortedTags.map((tag) => (
                <TagItem key={tag.id} tag={tag}/>
            ))}
        </DraggableScroll>
    )
}