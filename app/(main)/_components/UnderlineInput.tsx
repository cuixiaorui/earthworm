import { FormEvent, useState, useRef } from "react";
import "./UnderlineInput.css";

interface ValueItem {
  value: string;
  error: boolean;
}

export default function UnderlineInput({
  english,
  onCheckAnswer,
}: {
  english: string;
  onCheckAnswer: (userInput: string) => void | boolean;
}) {
  const englishArr = english.split(" ");
  const lineNum = englishArr.length || 1;

  const [values, setValues] = useState<ValueItem[]>(
    Array.from({ length: lineNum }, () => ({ value: "", error: true })),
  );
  const [activeInputIndex, setActiveInputIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (event: FormEvent<HTMLInputElement>, i: number) => {
    const inputEventValue = event.currentTarget.value.replace(/\s+$/, "");
    setValues(prevValues => {
      const newValues = [...prevValues];
      newValues[i].value = inputEventValue;
      return newValues;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { code, shiftKey, target } = event;

    if (code === "Enter") {
      handleCheckAnswer();
      return;
    }

    if ((shiftKey && code === "ArrowRight") || code === "Space") {
      event.preventDefault();
      if (activeInputIndex === lineNum - 1) {
        return;
      }

      const i = findErrorIndex("next");
      if (i === -1) {
        setActiveInputIndex(prevIndex => prevIndex + 1);
        return;
      }

      setActiveInputIndex(i);
      return;
    }

    if (
      (shiftKey && code === "ArrowLeft") ||
      (code === "Backspace" && target instanceof HTMLInputElement && target.value === "")
    ) {
      event.preventDefault();
      if (activeInputIndex === 0) {
        return;
      }

      const i = findErrorIndex("prev");
      if (i === -1) {
        setActiveInputIndex(prevIndex => prevIndex - 1);
        return;
      }

      setActiveInputIndex(i);
      return;
    }
  };

  const handleCheckAnswer = () => {
    const result = onCheckAnswer(values.reduce((acc, item) => acc + item.value + " ", "").trim());
    if (!result) {
      let index = -1;
      const newValues = [...values];

      englishArr.forEach((word, i) => {
        if (newValues[i].value.toLocaleLowerCase() !== word.toLocaleLowerCase()) {
          newValues[i].error = true;
          newValues[i].value = "";
          if (index === -1) {
            index = i;
          }
        } else {
          newValues[i].error = false;
        }
      });

      setValues(newValues);
      setActiveInputIndex(index);
    }
  };

  const findErrorIndex = (action: "prev" | "next", activeIndex = activeInputIndex) => {
    let errorIndex = -1;
    if (action === "prev") {
      for (let i = activeIndex - 1; i >= 0; i--) {
        if (values[i].error) {
          errorIndex = i;
          break;
        }
      }
    }
    if (action === "next") {
      for (let i = activeIndex + 1; i < lineNum; i++) {
        if (values[i].error) {
          errorIndex = i;
          break;
        }
      }
    }
    return errorIndex;
  };

  const lineInputEls = englishArr.map((word, i) => (
    <div
      key={i}
      className={[
        "code-item",
        "border-b-2",
        "border-b-solid",
        "border-b-gray-300 dark:border-b-gray-500",
        i === activeInputIndex ? "active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => {
        setActiveInputIndex(i);
        inputRef.current?.focus();
      }}>
      {word}
      <div className="code-value dark:text-indigo-500  text-[rgba(32,32,32,0.6)]">
        {i === activeInputIndex ? (
          <input
            ref={inputRef}
            className="code-input"
            type="text"
            value={values[i].value}
            autoFocus
            onInput={e => {
              handleInput(e, i);
            }}
            onFocus={e => {
              setTimeout(() => {
                e.target.select();
              });
            }}
            onKeyDown={handleKeyDown}
          />
        ) : (
          values[i].value
        )}
      </div>
    </div>
  ));

  return <div className="code-box">{lineInputEls}</div>;
}
