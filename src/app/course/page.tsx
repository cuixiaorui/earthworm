import { CourseCard } from "@/components/CourseCard";

interface Course {
  title: string;
  id: string;
}


async function fetchCourses(): Promise<Course[]> {
  const response = await fetch(`http://localhost:3000/course/api`);

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data.data;
}

export default async function Course() {
  const courses = await fetchCourses();

  return (
    <div>
      course
      <div>
        <ul>
          {courses.map((course) => {
            return (
              <li key={course.id}>
                <CourseCard course={course}></CourseCard>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
