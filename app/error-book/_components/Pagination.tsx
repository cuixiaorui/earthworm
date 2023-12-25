export function Pagination({
  currentPage,
  pageCount,
  preview,
  next,
}: {
  currentPage: number;
  pageCount: number;
  preview: () => void;
  next: () => void;
}) {
  return (
    <div className='flex items-center gap-2 pt-3 self-center'>
      <button
        className={
          'rounded-full bg-white p-2 text-indigo-500 shadow-md dark:bg-gray-800 dark:text-indigo-300 ' +
          (currentPage > 1 ? 'cursor-pointer' : 'cursor-no-drop opacity-50')
        }
        onClick={preview}>
        <svg viewBox='0 0 20 20' width='1.2em' height='1.2em'>
          <path fill='currentColor' d='m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z'></path>
        </svg>
      </button>
      <span className='text-black dark:text-white'>{currentPage + ' / ' + pageCount}</span>
      <button
        className={
          'rounded-full bg-white p-2 text-indigo-500 shadow-md dark:bg-gray-800 dark:text-indigo-300 ' +
          (currentPage !== pageCount ? 'cursor-pointer' : 'cursor-no-drop opacity-50')
        }
        onClick={next}>
        <svg viewBox='0 0 20 20' width='1.2em' height='1.2em'>
          <path fill='currentColor' d='M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z'></path>
        </svg>
      </button>
    </div>
  );
}
