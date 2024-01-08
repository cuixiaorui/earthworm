import { StatementCard } from './StatementCard';

import type { IErrorStatementItem } from '@/actions/errorBook';
export function StatementTable({ errList }: { errList: IErrorStatementItem[] }) {
  return (
    <div className='flex w-full flex-1 select-text items-center justify-start overflow-hidden flex-col gap-3 pt-10'>
      <div className='flex w-full justify-between rounded-lg bg-white px-6 py-5 text-lg text-black shadow-lg dark:bg-gray-800 dark:text-white'>
        <div className='basis-5/12 break-normal'>短语</div>
        <div className='basis-5/12 break-normal'>释义</div>
        <div className='basis-1/12 break-normal'>错误次数</div>
      </div>
      <ul className='flex w-full flex-1 select-text items-center justify-start overflow-hidden overflow-y-auto flex-col gap-3'>
        {errList.map((errStatement) => {
          return <StatementCard errStatement={errStatement} key={errStatement.id} />;
        })}
      </ul>
    </div>
  );
}
