"use client";

import { useCourse } from "@/store/useCourse";
import { useRouter } from "next/navigation";

import { type Course } from "@/api/course";

export function CourseCard({ course }: { course: Course }) {
  const router = useRouter();

  const handleClick = (id: Course["id"]) => {
    useCourse.setState({ currentCourseId: id });
    router.push("/");
  };

  return (
    <div
      className=" w-52 h-24 bg-indigo-500   rounded-md p-1 
    shadow-lg hover:bg-indigo-700  cursor-pointer 
  flex justify-center transition-colors"
    >
      <button
        className="truncate "
        onClick={() => handleClick(course.id)}
        title={course.title}
      >
        {course.title}
      </button>
    </div>
  );
}
