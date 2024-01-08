"use client";
import { fetchSaveUserProgress } from "@/actions/userProgress";
import { usePlaySound } from "../_hooks/playSound";
import { useCourse } from "@/store/course";
import { useEffect } from "react";
import { useSession } from "../../../hooks/user";

export function Answer() {
  const { currentStatement, toNextStatement, currentCourse } = useCourse();
  const { english: word = "", soundmark = "" } = currentStatement || {};
  const { playSound, audio } = usePlaySound();
  const { session } = useSession();

  async function handleToNextStatement() {
    const nextStatementIndex = toNextStatement();
    const cId = currentCourse?.id!;
    await fetchSaveUserProgress({
      courseId: cId,
      statementIndex: nextStatementIndex,
      userId: session.userId,
    });
  }

  useEffect(() => {
    if (session.isLogin) {
      playSound();
    }
  }, [session.isLogin]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleToNextStatement();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!session.isLogin) {
    return <div>loading...</div>;
  }

  return (
    <div className="text-center mb-20 mt-10">
      <div className="text-5xl mb-3 text-fuchsia-500 dark:text-gray-50">
        {word}
        <svg
          className="w-7 h-7 inline-block ml-1 cursor-pointer"
          onClick={() => {}}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            d="M342.4 384H128v256h214.4L576 826.8V197.2L342.4 384zM64 320h256L640 64v896L320 704H64V320z m640 256h256v-64H704v64z m16.8 159.5l181 181 45.3-45.3-181-181-45.3 45.3z m33.9-343.9l181-181-45.3-45.3-181 181 45.3 45.3z"
            fill="#666666"
          ></path>
        </svg>{" "}
      </div>
      <div className="text-2xl text-slate-600">{soundmark}</div>{" "}
      <button
        className="border-solid border-2 border-slate-400 bg-slate-100 dark:bg-fuchsia-500 rounded-lg mt-8 mb-11 indent-1 h-10 text-2xl pl-10 pr-10 hover:bg-slate-200"
        onClick={() => handleToNextStatement()}
      >
        next
      </button>
      {audio}
    </div>
  );
}
