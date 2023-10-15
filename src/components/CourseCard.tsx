"use client";

import { useCourse } from "@/store/useCourse";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";

export function CourseCard({ course }: { course: Course }) {
  const router = useRouter();
  const fetchCourse = useCourse((state) => state.fetchCourse);

  const handleClick = async (courseId: string) => {
    // TODO 加一个 UI 提示
    await fetchCourse(courseId);
    router.push("/");
  };
  return (
    <div className=" w-52 h-24 bg-indigo-500   rounded-md p-1 
    shadow-lg hover:bg-indigo-700  cursor-pointer 
  flex justify-center transition-colors">
    <button className="truncate " onClick={() => handleClick(course.id)} title={course.title}>{course.title}</button>
  </div>
  );
}
