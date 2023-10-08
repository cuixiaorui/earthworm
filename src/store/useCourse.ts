import { create } from 'zustand'

interface Statement {
  chinese: string
  english: string
  soundmark: string
}

interface CourseData {
  id: number
  statements: Statement[]
}

interface State {
  statementIndex: number
  currentCourse?: CourseData
  toNextStatement: () => void
  fetchCourse: () => void
  getCurrentStatement: () => Statement | undefined
  checkCorrect: (input: string) => boolean
}

export const useCourse = create<State>((set, get) => ({
  statementIndex: 0,
  currentCourse: undefined,
  async fetchCourse() {
    // TODO 先写死第一课的 courseID
    // 后续需要基于 courses 来获取
    const firstCourseId = 'clng5l3300000fydlimlj4m4h'
    const response = await fetch(`/course/${firstCourseId}/api`)
    const data = await response.json()
    set({ currentCourse: data.data })
  },
  toNextStatement() {
    set((state) => {
      return {
        statementIndex: state.statementIndex + 1,
      }
    })
  },
  getCurrentStatement() {
    const { currentCourse, statementIndex } = get()

    return currentCourse?.statements[statementIndex]
  },
  checkCorrect(input: string) {
    const currentStatement = get().getCurrentStatement()
    return input === currentStatement?.english
  },
}))
