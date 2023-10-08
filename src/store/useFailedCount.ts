import { create } from 'zustand'

interface FailedCountState {
  count: number
  increaseFailedCount: (callback: () => void) => void
  resetFailedCount: () => void
}

const failedCountTotal = 3
export const useFailedCount = create<FailedCountState>((set) => ({
  count: 0,
  increaseFailedCount(callback) {
    set((state) => {
      const nextCount = state.count + 1

      if (nextCount >= failedCountTotal) {
        callback()
        return {
          count: 0,
        }
      }
      return {
        count: nextCount,
      }
    })
  },
  resetFailedCount() {
    set({ count: 0 })
  },
}))
