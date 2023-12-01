import { fetchNextCourseId } from "@/actions/course";
import { useCourse } from "@/store/course";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Summary() {
  const [cId, setCId] = useState(0);
  const { currentCourse } = useCourse();

  useEffect(() => {
    (async function () {
      const cId = await fetchNextCourseId(currentCourse!.id);
      if (cId) {
        setCId(cId);
      }
    })();
  });

  return (
    <div className="h-48 bg-slate-100 shadow-lg text-center flex flex-col">
      <h3>总结面板</h3>
      <div className="px-5 py-10">
        不错不错 又学到了那么多句子和单词 加油 坚持就是胜利 :)
      </div>
      <div className="w-1/3 justify-items-center bg-fuchsia-500 rounded m-auto mb-8">
        <Link href={`/?courseId=${cId}`}>开始下一课</Link>
      </div>
    </div>
  );
}
