import { Progress } from "@/components/ui/progress";
import { useCourse } from "@/store/course";

export function CourseProgress() {
  const { statementIndex, currentCourse } = useCourse();

  const max = currentCourse?.statements.length || 0;
  const value = statementIndex + 1;

  const percent = (value / max) * 100

  return (
    <>
      <Progress value={percent} className="w-1/4 mb-6" />
    </>
  );
}
