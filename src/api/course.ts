import { toUrl } from "./index";

export interface Course {
  title: string;
  id: string;
}

export async function fetchCourses(): Promise<Course[]> {
  const response = await fetch(toUrl("/course/api"));

  const data = await response.json();

  return data.data;
}

export async function fetchCourseById(courseId: string): Promise<Course> {
  const response = await fetch(toUrl(`/course/${courseId}/api`));

  const data = await response.json();

  return data.data;
}
