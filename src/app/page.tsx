"use client";

import { useEffect, useState } from "react";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
import Statistics from "@/components/Statistics";
import { useCourse, useFailedCount } from "@/store";

export default function Home() {
  const [currentMode, setCurrentMode] = useState<"question" | "answer">(
    "question"
  );

  const {count, increaseFailedCount, resetFailedCount } = useFailedCount();
  const { toNextStatement, fetchCourse, getCurrentStatement, checkCorrect } = useCourse(state => state);
  const [isShowAnswerNowBtn, setIsShowAnswerNowBtn] = useState(false)

  useEffect(() => {
    fetchCourse();
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [count]);

  function handleKeyDown(event: any) {
    if (event.key === 'Tab' && count >= 2) {
      showAnswerNow()
    }
  }

  const showAnswerNow = () => {
    setCurrentMode("answer");
    setIsShowAnswerNowBtn(false)
    resetFailedCount();
  }

  const handleToNextStatement = () => {
    toNextStatement();
    setCurrentMode("question");
  };

  const handleCheckAnswer = (userInput: string) => {
    if (checkCorrect(userInput)) {
      showAnswerNow()
    } else {
      increaseFailedCount(() => {
        setIsShowAnswerNowBtn(true)
      });
    }
  };

  const lineNum = getCurrentStatement()?.english.split(' ').length || 1

  return (
    <div className="container mx-auto flex h-full flex-1 flex-col items-center justify-center pb-10 h-96">
      <div className="container relative mx-auto flex h-full flex-col items-center">
        <div className="container flex flex-grow items-center justify-center">
          <div className="container flex h-full w-full flex-col items-center justify-center">
            <div className="container flex flex-grow flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center pb-1 pt-4">
                {currentMode === "question" ? (
                  <>
                    <Question
                      word={getCurrentStatement()?.chinese || "加载中..."}
                      lineNum={lineNum}
                      onCheckAnswer={handleCheckAnswer}
                    ></Question>
                    {isShowAnswerNowBtn && <div className="flex gap-x-2 text-sm">
                      <button className="rounded-sm px-2 bg-gray-600 text-white dark:text-gray-900"
                        onClick={showAnswerNow} >tap</button>
                      <div className=" text-gray-600"> - show answer</div>
                    </div>}
                  </>
                ) : (
                  <Answer
                    word={getCurrentStatement()?.english || ""}
                    soundmark={getCurrentStatement()?.soundmark || ""}
                    onToNextStatement={handleToNextStatement}
                  ></Answer>
                )}
              </div>
            </div>
          </div>
        </div>
        <Statistics />
      </div>
    </div>
  );
}
