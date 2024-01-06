import { SessionOptions } from "iron-session";

export type SessionData = {
  username: string;
  userId: number;
  isLogin: boolean;
};

export const sessionOptions: SessionOptions = {
  cookieName: "session",
  password: "complex_password_at_least_32_characters_long",
};

export const defaultSession: SessionData = {
  username: "",
  userId: 0,
  isLogin: false,
};
