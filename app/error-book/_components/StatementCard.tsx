import type { IErrorStatementItem } from "@/actions/errorBook";

export function StatementCard({
  errStatement,
}: {
  errStatement: IErrorStatementItem;
}) {
  return (
    <li
      className="opacity-85 flex w-full cursor-pointer items-center justify-between rounded-lg bg-white px-6 py-3 text-black shadow-md dark:bg-gray-800 dark:text-white"
    >
      <div className="basis-5/12 break-normal">{ errStatement.english }</div>
      <div className="basis-5/12 break-normal">{ errStatement.chinese }</div>
      <div className="basis-1/12 break-normal">{ errStatement.time }</div>
    </li>
  );
}
