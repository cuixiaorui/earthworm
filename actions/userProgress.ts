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
  return await prisma.userProgress.upsert({
    where: { courseId },
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
  return await prisma.userProgress.upsert({
    where: { courseId },
    update: { statementIndex: 0, active: false },
    create: { courseId, statementIndex: 0, active: false, userId },
  });
}

export async function fetchActiveCourseId() {
  const userProgress = await prisma.userProgress.findFirst({
    where: { active: true },
  });

  return userProgress?.courseId;
}

export async function fetchStatementIndex(courseId: Course["id"]) {
  const userProgress = await prisma.userProgress.findUnique({
    where: { courseId },
  });

  return userProgress?.statementIndex;
}
