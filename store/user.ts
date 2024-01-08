"use client";
import { create } from "zustand";
import { SessionData, defaultSession } from "../actions/user";

type ResgiterReq = {
  name: string;
  phone: string;
  password: string;
};

type LoginReq = {
  phone: string;
  password: string;
};

type UserStore = {
  session: SessionData;
  init: () => Promise<void>;
  register: (req: ResgiterReq) => Promise<string | null>;
  login: (req: LoginReq) => Promise<string | null>;
  logout: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => {
  return {
    session: defaultSession,
    init: async () => {
      const res = await fetch("/api/session");
      const data = await res.json();
      set({ session: data });
    },
    logout: async () => {
      await fetch("/api/session?action=logout");
      get().init();
    },
    register: async (req: ResgiterReq) => {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...req, type: "register" }),
      });
      const data = await res.json();
      get().init();
      return data.error as string | null;
    },
    login: async (req: LoginReq) => {
      const res = await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...req, type: "login" }),
      });
      const data = await res.json();
      get().init();
      return data.error as string | null;
    },
  };
});
