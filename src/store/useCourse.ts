import { create } from "zustand";
import { fetchCourseById } from "@/api/course";

interface Statement {
  chinese: string;
  english: string;
  soundmark: string;
}

interface CourseData {
  id: string;
  title: string;
  statements: Statement[];
}

interface State {
  statementIndex: number;
  currentCourse?: CourseData;
  currentCourseId?: CourseData["id"];
  toNextStatement: () => void;
  fetchCourse: (courseId: CourseData["id"]) => void;
  getCurrentStatement: () => Statement | undefined;
  checkCorrect: (input: string) => boolean;
}

export const useCourse = create<State>((set, get, api) => ({
  statementIndex: 0,
  currentCourse: undefined,
  currentCourseId: "",

  async fetchCourse(courseId: CourseData["id"]) {
    const course = (await fetchCourseById(courseId)) as CourseData;

    set({ currentCourse: course });
  },

  toNextStatement() {
    set((state) => {
      return {
        statementIndex: state.statementIndex + 1,
      };
    });
  },
  getCurrentStatement() {
    const { currentCourse, statementIndex } = get();

    return currentCourse?.statements[statementIndex];
  },
  checkCorrect(input: string) {
    const currentStatement = get().getCurrentStatement();
    return (
      input.toLocaleLowerCase() ===
      currentStatement?.english.toLocaleLowerCase()
    );
  },
}));
