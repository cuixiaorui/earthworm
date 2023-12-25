"use client";

import { StatementTable } from './_components/StatementTable';
import { Pagination } from './_components/Pagination';
import { fetchErrorBookList } from '@/actions/errorBook';

import Link from 'next/link';
import { useEffect, useState } from 'react'

import type { IErrorStatementItem } from '@/actions/errorBook'

export default async function Course() {
  const [errList, setErrList] = useState<IErrorStatementItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  async function getData(page: number) {
    const res = await fetchErrorBookList({ page });
    setErrList(res.items);
    setCurrentPage(res.currentPage);
    setPageCount(res.pageCount);
  }

  function handlePreviewPage() {
    if (currentPage <= 1) return;
    getData(currentPage - 1);
  }

  function handleNextPage() {
    if (currentPage >= pageCount) return;
    getData(currentPage + 1);
  }

  useEffect(() => {
    getData(currentPage);
  }, []);

  return (
    <div className=' p-16 relative  h-screen flex flex-col '>
      <Link href='/'>
        <svg
          viewBox='0 0 24 24'
          width='1.2em'
          height='1.2em'
          className='absolute right-20 top-5 mr-2 h-7 w-7 cursor-pointer 
         text-gray-400 dark:text-indigo-500'>
          <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M18 6L6 18M6 6l12 12'></path>
        </svg>
      </Link>
      <StatementTable errList={errList} />
      <Pagination currentPage={currentPage} pageCount={pageCount} preview={handlePreviewPage} next={handleNextPage} />
    </div>
  );
}
