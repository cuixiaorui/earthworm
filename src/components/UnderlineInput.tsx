import "./UnderlineInput.css";
import { ChangeEvent, useState, useEffect } from "react";

export default function UnderlineInput({
  lineNum,
  onCheckAnswer,
}: {
  lineNum: number;
  onCheckAnswer: (userInput: string) => void;
}) {
  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [focusing, setFocusing] = useState(true);

  useEffect(() => {
    const newWords = inputValue.trimStart().split(" ");
    setActiveInputIndex(Math.min(newWords.length - 1, lineNum - 1));
    setWords(newWords);
  }, [inputValue, lineNum]);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    // make sure inputEventValue ends with most one blank;
    const inputEventValue = event.target.value.replace(/\s+$/, " ");
    setInputValue(inputEventValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onCheckAnswer(inputValue.trim());
      setInputValue("");
    }
  };

  const handleInputFocus = () => {
    setFocusing(true);
  };

  const handleBlur = () => {
    setFocusing(false);
  };

  const lineInputEls = Array.from({ length: lineNum }, (_, i) => (
    <div
      key={i}
      className={[
        "code-item",
        "border-b-2",
        "border-b-solid",
        "border-b-gray-300 dark:border-b-gray-500",
        i === activeInputIndex && focusing ? "active" : "",
        "dark:text-indigo-500  text-[rgba(32,32,32,0.6)]",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {words[i]}
    </div>
  ));

  return (
    <div className="code-box">
      {lineInputEls}
      <input
        className="code-input"
        type="text"
        value={inputValue}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleBlur}
        autoFocus
      />
    </div>
  );
}
