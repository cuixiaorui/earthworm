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
  const userProgress = await prisma.userProgress.findFirst({
    where: { userId, courseId },
  });

  console.log(userProgress)

  if (userProgress) {
    return await prisma.userProgress.update({
      where: { id: userProgress.id },
      data: {
        statementIndex,
        active: true,
      },
    });
  } else {

    return await prisma.userProgress.create({
      data: {
        courseId,
        statementIndex,
        active: true,
        userId,
      },
    });
  }
}

export async function fetchResetUserProgress({
  courseId,
  userId,
}: {
  courseId: number;
  userId: number;
}) {
  const userProgress = await prisma.userProgress.findFirst({
    where: { userId, courseId },
  });

  if (userProgress) {
    return await prisma.userProgress.update({
      where: { id: userProgress.id },
      data: {
        statementIndex: 0,
        active: false,
      },
    });
  } else {
    return await prisma.userProgress.create({
      data: {
        courseId,
        statementIndex: 0,
        active: false,
        userId,
      },
    });
  }
}

export async function fetchActiveCourseId(userId: number) {
  const userProgress = await prisma.userProgress.findFirst({
    where: { active: true, userId },
  });

  return userProgress?.courseId;
}

export async function fetchStatementIndex(
  courseId: Course["id"],
  userId: number
) {
  const userProgress = await prisma.userProgress.findFirst({
    where: { userId, courseId },
  });

  return userProgress?.statementIndex;
}

export async function resetProgress(userId: number) {
  const userProgress = await prisma.userProgress.findMany({
    where: {
      userId,
    },
  });

  if (userProgress.length <= 1) return;
  const hasActive = userProgress.some((progress) => progress.active);
  if (!hasActive) return;

  await prisma.userProgress.updateMany({
    where: {
      userId,
      courseId: 1,
    },
    data: {
      active: true,
    },
  });
}
