"use server";

import { prisma } from "@/lib/prisma";
import { type Course } from "@/store/course";

export async function fetchCourseList() {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  return courses;
}

export async function fetchCourse(id: Course["id"]) {
  return await prisma.course.findFirst({
    select: {
      id: true,
      title: true,
      statements: {
        select: {
          id: true,
          chinese: true,
          english: true,
          soundmark: true,
          order: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
    where: {
      id,
    },
  });
}

export async function fetchNextCourseId(courseId: Course["id"]) {
  const nextCourse = await prisma.course.findFirst({
    where: {
      id: {
        gt: courseId,
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return nextCourse?.id;
}
