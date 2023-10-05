import { ChangeEvent, useState} from "react";
export default function Question({
  word,
  createRef,
  onCheckAnswer,
  onToNextStatement
}: {
  word: string;
  createRef: any;
  onCheckAnswer: (userInput: string) => void;
  onToNextStatement: () => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onCheckAnswer(inputValue);
      setInputValue("");
    }
  };

  return (
    <div>
      <p className="word">{word}</p>
      <input
        className="input"
        ref={createRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="btn" onClick={() => onToNextStatement()}>next</button>
    </div>
  );
}
