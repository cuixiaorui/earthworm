import { useCourse } from "@/store/course";
import UnderlineInput from "./UnderlineInput";

interface Props {
  onShowAnswer: () => void;
}

export function Question({ onShowAnswer }: Props) {
  const { currentStatement, checkCorrect } = useCourse();
  const { chinese = "", english = "" } = currentStatement || {};
  const word = chinese;

  function handleCheckAnswer(input: string) {
    if (checkCorrect(input)) {
      onShowAnswer();
      return true;
    }
    return false;
  }

  return (
    <div className="text-5xl text-center mb-20 mt-10">
      <div className="text-fuchsia-500 dark:text-gray-50">{word}</div>
      <UnderlineInput onCheckAnswer={handleCheckAnswer} english={english}></UnderlineInput>
    </div>
  );
}
