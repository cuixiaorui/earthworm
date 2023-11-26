import { fetchCourse, fetchFirstCourseId } from "@/actions/course";
import { fetchActiveCourseId } from "@/actions/userProgress";
import { Main } from "./_components/Main";
import { redirect } from "next/navigation";
import { CourseStoreInitializer } from "@/store/course";
import { fetchStatementIndex } from "@/actions/userProgress";
import { currentUser } from "@clerk/nextjs";

interface Props {
  searchParams: {
    courseId: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const user = await currentUser();

  let courseId = searchParams.courseId;
  if (!courseId) {
    const defaultCourseId = await fetchFirstCourseId();
    const activeCourseId =
      (user && (await fetchActiveCourseId(user.id))) || defaultCourseId;

    redirect(`/?courseId=${activeCourseId}`);
  }

  const course = await fetchCourse(courseId);
  const statementIndex =
    (user && (await fetchStatementIndex(user.id, courseId))) || 0;


  return (
    <>
      <CourseStoreInitializer
        course={course!}
        statementIndex={statementIndex}
      ></CourseStoreInitializer>
      <Main></Main>
    </>
  );
}
