import { PrismaClient } from '@prisma/client'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const prisma = new PrismaClient()
  const course = await prisma.course.findFirst({
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
          order: 'asc',
        },
      },
    },
    where: {
      id: id,
    },
  })

  return Response.json({ statue: 1, data: course })
}
