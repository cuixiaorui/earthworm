import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { chinese, english, soundmark, courseId, order } = await req.json();

  const statement = await prisma.statement.create({
    data: {
      order,
      chinese,
      english,
      soundmark,
      courseId,
    },
  });

  return Response.json({ status: 1, data: statement });
}
