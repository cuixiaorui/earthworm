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

export async function fetchFirstCourseId() {
  const courses = await prisma.course.findFirst({
    select: {
      id: true,
    },
  });

  return courses?.id;
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
