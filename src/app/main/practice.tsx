"use client";

import { ChangeEvent, useState } from "react";

const failedCountTotal = 3;
let failedCount = 0;

// [1, 2, 3, 4,5,6]

export default function Practice() {
  const chinese = "现在";
  const english = "now";
  const answer = "now";
  const soundmark = "/naʊ/";
  const [inputValue, setInputValue] = useState("");
  const [displayWord, setDisplayWord] = useState(chinese);
  // 问题  回答
  const [currentState, setCurrentState] = useState("question");
  const [displaySoundmark, setDisplaySoundmark] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (checkValidity(inputValue)) {
        handleAnswer();
      } else {
        console.log("失败啦");
        setInputValue("");
        failedCount++;

        if (failedCount >= failedCountTotal) {
          handleAnswer();
          failedCount = 0;
        }
      }
    }
  };

  function handleAnswer() {
    console.log("正确啦");
    setCurrentState("answer");
    setDisplayWord(english);
    setDisplaySoundmark(soundmark);
    console.log("发音");
    playSound();
  }

  function playSound() {}

  function checkValidity(input: string) {
    return input === answer;
  }

  const AnswerView = (
    <div>
      <div>{displayWord}</div>
      <div>{displaySoundmark}</div>
      <div>
        <audio controls autoPlay>
          <source
            src="https://dict.youdao.com/dictvoice?audio=now&type=1"
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );

  return (
    <div>
      <div>
        {currentState === "question" ? <div>{displayWord}</div> : AnswerView}
        <div>
          <input
            className="bg-red-500"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
}
