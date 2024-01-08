'use server';

import { prisma } from '@/lib/prisma';
import type { Course, Statement, ErrorBook } from '@/store/course';

export async function fetchSaveErrorStatment({ statementId }: { statementId: Statement['id'] }) {
  const errItem = await prisma.errorBook.findFirst({ where: { statementId } });
  if (errItem) {
    return await prisma.errorBook.update({
      where: { id: errItem.id },
      data: { time: errItem.time + 1 },
    });
  } else {
    return await prisma.errorBook.create({ data: { statementId } });
  }
}

export interface IErrorStatementItem {
  id: Statement['id'];
  chinese: Statement['chinese'];
  english: Statement['english'];
  order: Statement['order'];
  courseId: Course['id'];
  time: ErrorBook['time'];
}

export async function fetchErrorBookList(data?: Partial<PaginationParams>): Promise<ResponsePageList<IErrorStatementItem>> {
  const { page = 1, size = 10 } = data || {};
  const count = await prisma.errorBook.count();
  const res = await prisma.errorBook.findMany({
    select: {
      id: true,
      statementId: true,
      time: true,
      createdAt: true,
      statement: {
        select: {
          id: true,
          chinese: true,
          english: true,
          order: true,
          courseId: true,
        },
      },
    },
    skip: (page - 1) * size,
    take: size,
    orderBy: {
      time: 'desc',
    },
  });
  const items = (res || [])
  .filter((i) => Boolean(i.statement))
  .map((item) => {
    return {
      ...item.statement,
      id: item.id,
      time: item.time,
    } as IErrorStatementItem;
  });
  return {
    currentPage: page || 1,
    items,
    pageCount: !size || !count ? 0 : Math.ceil(count / size),
    pageSize: size || 20,
    total: count || 0,
  }
}
