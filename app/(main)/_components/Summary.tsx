import Link from "next/link";

export function Summary() {
  // todo 如何获取到下一个 course 的 id
  return (
    <div className="h-48 bg-slate-100 shadow-lg text-center flex flex-col justify-around">
      <h3>总结面板</h3>
      <div>不错不错 又学到了那么多句子和单词 加油 坚持就是胜利 :)</div>
      <Link
        href="/?courseId=clpf1h3h80001z5m14mwemff0"
        className="bg-slate-600 rounded"
      >
        开始下一课
      </Link>
    </div>
  );
}
