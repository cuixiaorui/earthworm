export default function Footer() {

  return (
    <footer className="mb-1 mt-4 flex w-full items-center justify-center gap-2.5 text-sm ease-in ml-48">
      <a href="https://github.com/cuixiaorui/earthworm" target="_blank"
        rel="noreferrer" aria-label="前往 GitHub 项目主页">
        <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" fontSize="15" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100">
          <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12">
          </path>
        </svg>
      </a>

      <button className="cursor-pointer focus:outline-none" type="button" aria-label="加入我们的微信用户群">
        <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" fontSize="16" className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-500">
          <path fill="currentColor" d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213c0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098a10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05c-.857-2.578.157-4.972 1.932-6.446c1.703-1.415 3.882-1.98 5.853-1.838c-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178a1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786c-1.72 1.428-2.687 3.72-1.78 6.22c.942 2.453 3.666 4.229 6.884 4.229c.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247c0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156a.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983a.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983a.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z">
          </path>
        </svg>
      </button>

      <button className="cursor-pointer focus:outline-none " type="button" aria-label="考虑捐赠我们">
        <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" fontSize="16" className="text-gray-500 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500">
          <path fill="currentColor" d="M2 21h18v-2H2M20 8h-2V5h2m0-2H4v10a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-3h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z">
          </path>
        </svg>
      </button>

      <a href="mailto:me@kaiyi.cool" target="_blank" rel="noreferrer" aria-label="发送邮件到 me@kaiyi.cool">
        <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" fontSize="16" className="text-gray-500 hover:text-indigo-400 dark:text-gray-400 dark:hover:text-indigo-400">
          <path fill="currentColor" d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm8-7l8-5V6l-8 5l-8-5v2l8 5Z">
          </path>
        </svg>
      </a>
      <div className="relative">
        <div>
          <a href="https://github.com/cuixiaorui/earthworm" target="_self" title="前往中国大陆镜像">
            <svg viewBox="0 0 36 36" width="1.2em" height="1.2em" fontSize="16">
              <path fill="#DE2910" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z">
              </path>
              <path fill="#FFDE02" d="m11.136 8.977l.736.356l.589-.566l-.111.81l.72.386l-.804.144l-.144.804l-.386-.72l-.81.111l.566-.589zm4.665 2.941l-.356.735l.566.59l-.809-.112l-.386.721l-.144-.805l-.805-.144l.721-.386l-.112-.809l.59.566zm-.957 3.779l.268.772l.817.017l-.651.493l.237.783l-.671-.467l-.671.467l.236-.783l-.651-.493l.817-.017zm-3.708 3.28l.736.356l.589-.566l-.111.81l.72.386l-.804.144l-.144.804l-.386-.72l-.81.111l.566-.589zM7 10.951l.929 2.671l2.826.058l-2.253 1.708l.819 2.706L7 16.479l-2.321 1.615l.819-2.706l-2.253-1.708l2.826-.058z">
              </path>
            </svg>
          </a>
        </div>
        <div className="opacity-0 bottom-full pb-2 pointer-events-none absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center transition-opacity">
          <span className="tooltip">
            中国大陆镜像
          </span>
        </div>
      </div>
      <button className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        type="button">
        @ Earth Worm
      </button>
      <a className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">
        京ICP备88888888号
      </a>
    </footer>
  );
}
