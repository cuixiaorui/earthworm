import { useCallback, useEffect, useState } from "react";
import { SessionData, defaultSession } from "../actions/user";
import { useRouter } from "next/router";

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
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    const res = await fetch("/api/session");
    const data = await res.json();
    setSession(data);
    setLoading(false);
  }, [setSession]);

  useEffect(() => {
    if (loading) {
      refreshSession();
    }
  }, [loading]);
  const logout = useCallback(() => {
    fetch("/api/session?action=logout");
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
    setLoading(true);
    return data.error as string | null;
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
    setLoading(true);
    return data.error as string | null;
  }, []);

  return { session, logout, login, register, loading };
};