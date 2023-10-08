import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  return Response.json({ statue: 1, data: courses });
}

export async function POST(request: Request) {
  const { title } = await request.json();
  const prisma = new PrismaClient();
  const course = await prisma.course.create({
    data: {
      title: title,
    },
  });

  return Response.json({ statue: 1, data: course });
}
