import { ChangeEvent, useState } from "react";

export default function Question({
  word,
  onCheckAnswer,
}: {
  word: string;
  onCheckAnswer: (userInput: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onCheckAnswer(inputValue);
      setInputValue("")
    }
  };

  return (
      <div className="text-5xl text-center mb-20 mt-10">
        <div className="text-fuchsia-500">
          {word}
        </div>
        <input
          className="border-solid border-2 border-sky-500 bg-fuchsia-500 rounded-lg mt-8 mb-11 indent-1 h-10 text-2xl "
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
  );
}
