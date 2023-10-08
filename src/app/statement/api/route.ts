import { PrismaClient } from '@prisma/client'

export async function POST(req: Request) {
  const prisma = new PrismaClient()

  const { chinese, english, soundmark, courseId, order } = await req.json()

  const statement = await prisma.statement.create({
    data: {
      order,
      chinese,
      english,
      soundmark,
      courseId,
    },
  })

  return Response.json({ status: 1, data: statement })
}
