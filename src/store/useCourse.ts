import { create } from "zustand";

interface Statement {
  chinese: string;
  english: string;
  soundmark: string;
}

interface CourseData {
  id: number;
  statements: Statement[];
}

interface State {
  statementIndex: number;
  currentCourse?: CourseData;
  toNextStatement: () => void;
  fetchCourse: () => void;
  getCurrentStatement: () => Statement | undefined;
  checkCorrect: (input: string) => boolean;
}

export const useCourse = create<State>((set, get) => ({
  statementIndex: 0,
  currentCourse: undefined,
  async fetchCourse() {
    const response = await fetch("/api/main");
    const data = await response.json();
    set({ currentCourse: data.data });
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
    return input === currentStatement?.english;
  },
}));
