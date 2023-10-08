import { ChangeEvent, useState } from "react";
import UnderlineInput from "./UnderlineInput";

export default function Question({
  word,
  lineNum,
  onCheckAnswer,
}: {
  word: string;
  lineNum: number;
  onCheckAnswer: (userInput: string) => Boolean;
}) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onCheckAnswer(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="text-5xl text-center mb-20 mt-10">
      <div className="text-fuchsia-500">{word}</div>
      {
        <UnderlineInput
          onCheckAnswer={onCheckAnswer}
          lineNum={lineNum}
        ></UnderlineInput>
      }
    </div>
  );
}
