export default function Statistics() {
    // TODO: 统计输入次数，错误次数和正确次数，计算正确率
    return (
        <div className="flex w-3/5 rounded-xl bg-white p-4 py-10 opacity-50 transition-colors duration-300 dark:bg-blue-900 fixed mt-96">
            <div className="flex flex-1 flex-col items-center justify-center">
                <span className="w-4/5 border-b pb-2 text-center text-xl font-bold text-gray-600 transition-colors duration-300 dark:text-gray-400">
                    00:00
                </span>
                <span className="pt-2 text-xs transition-colors duration-300 dark:text-gray-300">
                    时间
                </span>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center">
                <span className="w-4/5 border-b pb-2 text-center text-xl font-bold text-gray-600 transition-colors duration-300 dark:text-gray-400">
                    0
                </span>
                <span className="pt-2 text-xs transition-colors duration-300 dark:text-gray-300">
                    输入数
                </span>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center">
                <span className="w-4/5 border-b pb-2 text-center text-xl font-bold text-gray-600 transition-colors duration-300 dark:text-gray-400">
                    0
                </span>
                <span className="pt-2 text-xs transition-colors duration-300 dark:text-gray-300">
                    WPM
                </span>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center">
                <span className="w-4/5 border-b pb-2 text-center text-xl font-bold text-gray-600 transition-colors duration-300 dark:text-gray-400">
                    0
                </span>
                <span className="pt-2 text-xs transition-colors duration-300 dark:text-gray-300">
                    正确数
                </span>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center">
                <span className="w-4/5 border-b pb-2 text-center text-xl font-bold text-gray-600 transition-colors duration-300 dark:text-gray-400">
                    0
                </span>
                <span className="pt-2 text-xs transition-colors duration-300 dark:text-gray-300">
                    正确率
                </span>
            </div>
        </div>
    );
}
