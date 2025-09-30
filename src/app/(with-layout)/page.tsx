import { CoursesList } from "@/components/pages/courses/courses-list";
import { CourseTagsList } from "@/components/pages/courses/tags-list";

type CourseTagProps = {
  searchParams: Promise<{
    query: string;
    tags: string | string[];
  }>
}

export default async function CoursesPage({searchParams}: CourseTagProps) {
  const { query, tags } = await searchParams;
  console.log(query, tags)
  return (
    <div>
      <CourseTagsList></CourseTagsList>
      <CoursesList query={query} tags={tags}/>
    </div>
  );
}
