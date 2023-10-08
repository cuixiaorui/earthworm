import { Love_Light } from "next/font/google";
import "./UnderlineInput.css";
import { ChangeEvent, useState, useEffect } from "react";

export default function Question({
  lineNum,
  onCheckAnswer,
}: {
  lineNum: number;
  onCheckAnswer: (userInput: string) => Boolean;
}) {
  const [inputValue, setInputValue] = useState("");
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    codeItemList = document.querySelectorAll(".code-item");
    showNum();
    cutAct("focus");
  }, [inputValue]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const isCorrect = onCheckAnswer(inputValue.trim());
      if (!isCorrect) {
        Array.from(codeItemList).map((item: any) => {
          item.className = "code-item active--error";
        });
      }
      setTimeout(() => {
        setInputValue("");
        cutAct("blur");
      }, 450);
    }
  };

  const showNum = () => {
    const inputValList = inputValue.split(" ");
    Array.from(codeItemList).map((item: any, index) => {
      inputValList[index]
        ? (item.innerText = inputValList[index])
        : (item.innerText = "");
    });
  };

  const cutAct = (type: string) => {
    const inputValList = inputValue.split(" ");
    const valLength = inputValList.length;

    Array.from(codeItemList).map((item: any) => {
      item.className = "code-item";
    });
    if (type === "focus") {
      codeItemList[valLength - 1].className = "code-item active";
    }
  };

  let codeItemList: any;
  const handleInputFocus = () => {
    codeItemList = document.querySelectorAll(".code-item");
    cutAct("focus");
  };

  const lineInputEls = Array.from({ length: lineNum }, (_, i) => (
    <div key={i} className="code-item"></div>
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
        autoFocus
      />
    </div>
  );
}
