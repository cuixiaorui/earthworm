"use client";
import { create } from "zustand";
import { Prisma } from "@prisma/client";
import { useRef } from "react";
import { fetchSaveUserProgress } from "@/actions/userProgress";

export type Statement = Prisma.StatementGetPayload<{
  select: {
    id: true;
    order: true;
    chinese: true;
    english: true;
    soundmark: true;
  };
}>;

export type Course = Prisma.CourseGetPayload<{
  select: { id: true; title: true };
}> & { statements: Statement[] };

interface State {
  statementIndex: number;
  currentCourse?: Course;
  currentStatement?: Statement;
  setupCourse: (course: Course, statementIndex: number) => void;
  toNextStatement: () => number;
  checkCorrect: (input: string) => boolean;
}

export const useCourse = create<State>((set, get) => ({
  currentCourse: undefined,
  currentStatement: undefined,
  statementIndex: 0,
  async setupCourse(course: Course, statementIndex: number) {
    const statement = course?.statements[statementIndex];

    set({
      currentCourse: course!,
      currentStatement: statement!,
      statementIndex,
    });
  },
  checkCorrect(input: string) {
    const { currentStatement } = get();

    return (
      input.toLocaleLowerCase() ===
      currentStatement?.english.toLocaleLowerCase()
    );
  },

  toNextStatement() {
    const { statementIndex, currentCourse } = get();
    const nextStatementIndex = statementIndex + 1;
    const newStatement = currentCourse!.statements[nextStatementIndex];

    set({
      statementIndex: nextStatementIndex,
      currentStatement: newStatement,
    });

    return nextStatementIndex
  },
}));

export function CourseStoreInitializer({
  course,
  statementIndex,
}: {
  course: Course;
  statementIndex: number;
}) {
  // useCourse 是一个 hooks  必须要在组件中调用
  // 所以 StoreInitializer 是作为一个组件存在的
  const { setupCourse } = useCourse();
  const initialized = useRef(false);
  if (!initialized.current) {
    setupCourse(course, statementIndex);
    initialized.current = true;
  }

  return null;
}
