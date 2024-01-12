import Link from "next/link";
import { type Course } from "@/store/course";
export function CourseCard({
  course,
}: {
  course: { id: Course["id"]; title: Course["title"] };
}) {
  return (
    <Link className="truncate" href={`/?courseId=${course.id}`}>
      <div
        className="w-52 h-24 bg-indigo-500 rounded-md p-1 
        shadow-lg hover:bg-indigo-700  cursor-pointer 
        flex justify-center items-center transition-colors text-slate-200"
      >
        {course.title}
      </div>
    </Link>
  );
}

