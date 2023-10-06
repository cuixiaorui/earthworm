// https://nextjs.org/docs/app/building-your-application/optimizing/static-assets
import Image from 'next/image';
import ThemeChanger from '@/components/ThemeChanger';

export default function Header() {
  // TODO:获取当前Main中请求来的课程名称并显示，后续还可以点击切换
  return (
    <header className="container z-20 mx-auto w-full px-10 py-6">
      <div className="flex w-full flex-col items-center justify-between space-y-3 lg:flex-row lg:space-y-0">
        <a className="flex items-center text-2xl font-bold text-indigo-500 no-underline hover:no-underline lg:text-4xl"
          href="/main">
          <h1 className="flex items-center align-middle">
            {/* Image required properties: https://stackoverflow.com/questions/75781160/next-image-component-gives-error-missing-required-width-property-when-runni */}
            <section className="relative w-12 h-12 mr-2">
              <Image fill src="/logo.png" alt="logo" sizes="1" />
            </section>
            <span>
              Earth Worm
            </span>
          </h1>
        </a>
        <nav className="flex w-auto content-center items-center justify-end space-x-3 rounded-xl bg-gray-50 p-4 transition-colors duration-300 dark:bg-gray-800">
          <div className="relative">
            <div>
              <a className="block rounded-lg px-3 py-1 text-lg transition-colors duration-300 ease-in-out hover:bg-indigo-400 hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100"
                href="">
                第一课
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="relative">
              <div>
                <button type="button" className="flex items-center justify-center rounded p-[2px] text-lg text-indigo-500 outline-none transition-colors duration-300 ease-in-out hover:bg-indigo-400 hover:text-white"
                  title="查看错题本">
                  <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" className="icon">
                    <path fill="currentColor" d="M6.012 18H21V4a2 2 0 0 0-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1zM8 6h9v2H8V6z">
                    </path>
                  </svg>
                </button>
              </div>
              <div className="opacity-0 bottom-full pb-2 pointer-events-none absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center transition-opacity">
                <span className="tooltip">
                  错题本
                </span>
              </div>
            </div>
            <div className="relative h-7 w-7">
              <div>
                <button type="button" className="flex items-center justify-center rounded p-[2px] text-lg text-indigo-500 outline-none transition-colors duration-300 ease-in-out hover:bg-indigo-400 hover:text-white"
                  title="查看数据统计">
                  <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" className="icon">
                    <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                      <path d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25a.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75a8.25 8.25 0 0 1-16.5 0Z">
                      </path>
                      <path d="M12.75 3a.75.75 0 0 1 .75-.75a8.25 8.25 0 0 1 8.25 8.25a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z">
                      </path>
                    </g>
                  </svg>
                </button>
              </div>
              <div className="opacity-0 bottom-full pb-2 pointer-events-none absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center transition-opacity">
                <span className="tooltip">
                  查看数据统计
                </span>
              </div>
            </div>
            <div className="relative h-7 w-7">
              <ThemeChanger />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
