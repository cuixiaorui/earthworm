import { CourseCard } from "@/components/CourseCard";

import Link from 'next/link'
interface Course {
  title: string;
  id: string;
}

async function fetchCourses(): Promise<Course[]> {
  const courseApiPath =
    process.env.NODE_ENV === "production"
      ? "https://earthworm-six.vercel.app/course/api"
      : "http://localhost:3000/course/api";

  const response = await fetch(courseApiPath);

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
    <div className=" p-16 relative  h-screen flex flex-col ">
    <div >
    <Link
           href="/"
         >
       <svg viewBox="0 0 24 24" width="1.2em" height="1.2em"
        className="absolute right-20 top-5 mr-2 h-7 w-7 cursor-pointer 
         text-gray-400 dark:text-indigo-500"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"></path></svg>
       </Link>
       <h1 className="m-4 text-3xl text-indigo-500 ml-0 "> English course </h1>
    </div>
     <div className=" overflow-y-auto scrollbar-hide h-full " >
       <ul  className="flex gap-14  flex-wrap p-1 overflow-y-auto md:justify-start justify-center">
         {courses.map((course) => {
           return (
             <li key={course.id}>
               <CourseCard course={course}></CourseCard>
             </li>
           )
         })}

      
       </ul>
     </div>
   
    </div>
  );
}
