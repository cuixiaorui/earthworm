import { Progress } from "@/components/ui/progress";
import { useCourse } from "@/store/course";

export function CourseProgress() {
  const { statementIndex, currentCourse } = useCourse();

  const max = currentCourse?.statements.length
  const value = statementIndex + 1

  return (
    <>
      <Progress value={value} max={max} className="w-1/4 mb-6" />
    </>
  );
}