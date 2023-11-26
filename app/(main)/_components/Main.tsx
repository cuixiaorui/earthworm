"use client";
import { useState } from "react";
import { Question } from "./Question";
import { Answer } from "./Answer";
import { Tips } from "./Tips";

export function Main() {
  const [mode, setMode] = useState<"Question" | "Answer">("Question");

  function handleShowAnswer() {
    setMode("Answer");
  }

  function handleShowQuestion() {
    setMode("Question");
  }

  const CurrentView =
    mode === "Question" ? (
      <Question onShowAnswer={handleShowAnswer}></Question>
    ) : (
      <Answer onShowQuestion={handleShowQuestion}></Answer>
    );

  return (
    <div className="h-full flex justify-center items-center relative">
      <div>{CurrentView}</div>
      <div className="absolute bottom-10 mb-10">
        <Tips onShowAnswer={handleShowAnswer}></Tips>
      </div>
    </div>
  );
}
