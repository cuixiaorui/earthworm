import { create } from "zustand";

interface State {
  isDarkMode:boolean;
  setDarkMode: (value:boolean) => void;
}

export const useDarkMode = create<State>((set) => ({
  isDarkMode: false,  
  setDarkMode: (value) => {
    set({ isDarkMode: value })
  }
}));
