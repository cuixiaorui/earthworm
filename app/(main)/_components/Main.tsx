"use client";
import { useEffect, useState } from "react";
import { Question } from "./Question";
import { Answer } from "./Answer";
import { Tips } from "./Tips";
import { CourseProgress } from "./CourseProgress";
import { useCourse } from "@/store/course";
import { Summary } from "./Summary";

export function Main() {
  const [mode, setMode] = useState<"Question" | "Answer" | "Summary">(
    "Question"
  );

  const { currentCourse, statementIndex } = useCourse();

  useEffect(() => {
    // 说明切换了 course
    // 场景：这里是从 summary 面板进入下一关 course id 改变了
    setMode("Question");
  }, [currentCourse?.id]);

  useEffect(() => {
    if (statementIndex >= currentCourse!.statements.length) {
      setMode("Summary");
    } else {
      setMode("Question");
    }
  }, [statementIndex]);

  function handleShowAnswer() {
    setMode("Answer");
  }

  const viewMap = {
    Summary: <Summary></Summary>,
    Question: <Question onShowAnswer={handleShowAnswer}></Question>,
    Answer: <Answer></Answer>,
  };

  const CurrentView = viewMap[mode];

  return (
    <div className="h-full flex justify-center items-center relative">
      <div>{CurrentView}</div>
      <div className="absolute bottom-10 mb-10 w-full flex flex-col items-center">
        <CourseProgress></CourseProgress>
        <Tips onShowAnswer={handleShowAnswer}></Tips>
      </div>
    </div>
  );
}
