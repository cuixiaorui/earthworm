"use client";
import { create } from "zustand";
import { Prisma } from "@prisma/client";
import { useEffect, useRef } from "react";
import {
  fetchResetUserProgress,
  fetchSaveUserProgress,
} from "@/actions/userProgress";

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

    return nextStatementIndex;
  },
}));

export function CourseStoreInitializer({
  course,
  statementIndex,
}: {
  course: Course;
  statementIndex: number;
}) {
  const { setupCourse, currentCourse } = useCourse();
  const initialized = useRef(false);

  useEffect(() => {
    if (!currentCourse) return;

    if (course.id === currentCourse.id) {
      return;
    }
    // 这里是从 summary 面板进入下一关  所以要从零开始
    const lastCourseId = currentCourse.id;
    fetchResetUserProgress({ courseId: lastCourseId! });
    setupCourse(course, 0);
    fetchSaveUserProgress({
      courseId: course.id,
      statementIndex: 0,
    });
  }, [course.id]);

  // 一开始的时候必须需要赋值  不然其他 children 组件会获取不到 useCourse 的值
  // 不能在 useEffect(,[]) 中调用 因为其他 children 获取 course 的时机要早于 useEffect
  if (!initialized.current) {
    setupCourse(course, statementIndex);
    initialized.current = true;
  }

  return null;
}
