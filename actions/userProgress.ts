"use server";
import { prisma } from "@/lib/prisma";
import { Course } from "@prisma/client";

export async function fetchSaveUserProgress({
  courseId,
  statementIndex,
  userId,
}: {
  courseId: number;
  statementIndex: number;
  userId: number;
}) {
  console.log("fetchSaveUserProgress");
  console.log(userId);
  console.log("----------------");
  return await prisma.userProgress.upsert({
    where: { courseId, userId },
    update: { statementIndex, active: true },
    create: { courseId, statementIndex, active: true, userId },
  });
}

export async function fetchResetUserProgress({
  courseId,
  userId,
}: {
  courseId: number;
  userId: number;
}) {
  console.log("fetchResetUserProgress");
  console.log("userId", userId);
  console.log("----------------");
  return await prisma.userProgress.upsert({
    where: { courseId, userId },
    update: {
      statementIndex: 0,
      active: false,
    },
    create: {
      courseId,
      statementIndex: 0,
      active: false,
      userId: userId,
    },
  });
}

export async function fetchActiveCourseId(userId: number) {
  console.log("fetchActiveCourseId");
  const userProgress = await prisma.userProgress.findFirst({
    where: { active: true, userId },
  });

  return userProgress?.courseId;
}

export async function fetchStatementIndex(courseId: Course["id"]) {
  const userProgress = await prisma.userProgress.findUnique({
    where: { courseId },
  });

  return userProgress?.statementIndex;
}
