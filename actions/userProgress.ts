"use server";
import { prisma } from "@/lib/prisma";
import { Course } from "@prisma/client";




export async function fetchSaveUserProgress({
  userId,
  courseId,
  statementIndex,
}: {
  userId: string;
  courseId: number;
  statementIndex: number;
}) {
  // Deactivate all other courses
  // await deactivateAllCourses(userId);

  return await prisma.userProgress.upsert({
    where: { userId_courseId: { userId, courseId } },
    update: { statementIndex, active: true },
    create: { userId, courseId, statementIndex, active: true },
  });
}

export async function fetchResetUserProgress({
  userId,
  courseId,
}: {
  userId: string;
  courseId: number;
}) {
  return await prisma.userProgress.upsert({
    where: { userId_courseId: { userId, courseId } },
    update: { statementIndex: 0, active: false },
    create: { userId, courseId, statementIndex: 0, active: false },
  });
}


// export async function deactivateAllCourses(userId: string) {
//   return await prisma.userProgress.updateMany({
//     where: { userId, active: true },
//     data: { active: false },
//   });
// }

export async function fetchActiveCourseId(userId: string) {
  const userProgress = await prisma.userProgress.findFirst({
    where: { userId, active: true },
  });

  return userProgress?.courseId
}

export async function fetchStatementIndex(userId: string, courseId: Course["id"]) {
  const userProgress = await prisma.userProgress.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });

  return userProgress?.statementIndex;
}
