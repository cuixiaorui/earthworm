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
    <div>
      <button onClick={() => handleClick(course.id)}>{course.title}</button>
    </div>
  );
}
