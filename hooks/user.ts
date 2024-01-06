import { useEffect, useState } from "react";
import { SessionData, defaultSession } from "../actions/user";

export const useSession = () => {
  const [session, setSession] = useState<SessionData>(defaultSession);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/session")
      .then((res) => res.json())
      .then((session) => {
        setSession(session);
        setIsLoading(false);
      });
  }, []);
  return { session, isLoading };
};
