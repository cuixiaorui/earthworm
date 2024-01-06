import { fetchCourse } from "@/actions/course";
import { fetchActiveCourseId } from "@/actions/userProgress";
import { Main } from "./_components/Main";
import { redirect } from "next/navigation";
import { CourseStoreInitializer } from "@/store/course";
import { fetchStatementIndex } from "@/actions/userProgress";
import { useSession } from "../../hooks/user";

interface Props {
  searchParams: {
    courseId: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const { session } = useSession()
  let courseId = +searchParams.courseId;
  if (!courseId) {
    const defaultCourseId = 1;
    const activeCourseId = (await fetchActiveCourseId()) || defaultCourseId;

    redirect(`/?courseId=${activeCourseId}`);
  }

  const course = await fetchCourse(courseId);
  const statementIndex = (await fetchStatementIndex(courseId)) || 0;

  return (
    <>
      <CourseStoreInitializer
        session={session}
        course={course!}
        statementIndex={statementIndex}
      ></CourseStoreInitializer>
      <Main></Main>
    </>
  );
}
