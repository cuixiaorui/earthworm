import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      statements: {
        select: {
          id: true,
          chinese: true,
          english: true,
          soundmark: true,
        },
      },
    },
  });

  return Response.json({ statue: 1, data: courses });
}
