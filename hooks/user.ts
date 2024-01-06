import { useCallback, useEffect, useState } from "react";
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

export const useSession = () => {
  const [session, setSession] = useState<SessionData>(defaultSession);

  const refreshSession = useCallback(async () => {
    const res = await fetch("/api/session");
    const data = await res.json();
    setSession(data);
  }, [setSession]);

  useEffect(() => {
    refreshSession();
  }, []);
  const logout = useCallback(() => {
    fetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ action: "logout" }),
    });
  }, []);

  const register = useCallback(async (req: ResgiterReq) => {
    const res = await fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...req, type: "register" }),
    });
    const data = await res.json();
    if (data.error !== null) {
      throw new Error(data.error);
    }
    refreshSession();
  }, []);

  const login = useCallback(async (req: LoginReq) => {
    const res = await fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...req, type: "login" }),
    });
    const data = await res.json();
    if (data.error !== null) {
      throw new Error(data.error);
    }
    refreshSession();
  }, []);

  return { session, logout, login, register };
};
