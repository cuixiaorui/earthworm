import { fetchCourse } from "@/actions/course";
import { fetchActiveCourseId } from "@/actions/userProgress";
import { Main } from "./_components/Main";
import { redirect } from "next/navigation";
import { CourseStoreInitializer } from "@/store/course";
import { fetchStatementIndex } from "@/actions/userProgress";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "../../actions/user";

interface Props {
  searchParams: {
    courseId: string;
  };
}

async function getSession() {
  return getIronSession<SessionData>(cookies(), sessionOptions)
}

export default async function Page({ searchParams }: Props) {
  let courseId = +searchParams.courseId;
  const session = await getSession()
  if (!session.isLogin) {
    redirect("/auth/login");
  }
  if (!courseId) {
    const defaultCourseId = 1;

    const activeCourseId = session.isLogin ? ((await fetchActiveCourseId(session.userId)) ?? defaultCourseId) : defaultCourseId;

    redirect(`/?courseId=${activeCourseId}`);
  }

  const course = await fetchCourse(courseId);
  const statementIndex = (await fetchStatementIndex(courseId, session.userId)) || 0;

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
