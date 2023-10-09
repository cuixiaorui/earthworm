"use client";

import { useEffect, useState } from "react";
import Question from "@/components/Question";
import Answer from "@/components/Answer";
// import Statistics from "@/components/Statistics";
import { useCourse, useFailedCount } from "@/store";
import Header from "@/components/Header";

export default function Home() {
  const [currentMode, setCurrentMode] = useState<"question" | "answer">(
    "question"
  );

  const { increaseFailedCount, resetFailedCount } = useFailedCount();
  const {
    currentCourse,
    toNextStatement,
    fetchCourse,
    getCurrentStatement,
    checkCorrect,
  } = useCourse();

  useEffect(() => {
    if (!currentCourse) {
      const firstCourseId = "clng5l3300000fydlimlj4m4h";
      fetchCourse(firstCourseId);
    }
  }, []);

  const handleToNextStatement = () => {
    toNextStatement();
    setCurrentMode("question");
  };

  const handleCheckAnswer = (userInput: string) => {
    if (checkCorrect(userInput)) {
      setCurrentMode("answer");
      resetFailedCount();
    } else {
      increaseFailedCount(() => {
        setCurrentMode("answer");
      });
    }
  };

  const lineNum = getCurrentStatement()?.english.split(" ").length || 1;

  return (
    <>
      <Header />
      <div className="container mx-auto flex h-full flex-1 flex-col items-center justify-center pb-10 h-96 mt-40">
        <div className="container relative mx-auto flex h-full flex-col items-center">
          <div className="container flex flex-grow items-center justify-center">
            <div className="container flex h-full w-full flex-col items-center justify-center">
              <div className="container flex flex-grow flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center pb-1 pt-4">
                  {currentMode === "question" ? (
                    <Question
                      word={getCurrentStatement()?.chinese || "加载中..."}
                      lineNum={lineNum}
                      onCheckAnswer={handleCheckAnswer}
                    ></Question>
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
          {/* <Statistics /> */}
        </div>
      </div>
    </>
  );
}
