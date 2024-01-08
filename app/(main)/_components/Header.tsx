"use client";
import Link from "next/link";
import Image from "next/image";
import { DarkModeBtn } from "./DarkModeBtn";
import { useRouter, useSearchParams } from "next/navigation";
import { resetProgress } from "@/actions/userProgress";
import { Dialog } from "@/components/ui/dialog";
import { useUserStore } from "../../../store/user";

export const Header = () => {
  const { session, logout } = useUserStore();
  const router = useRouter();
  const params = useSearchParams();
  const courseId = params.get("courseId");
  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const handleResetProgress = async () => {
    await resetProgress(session.userId);
    router.replace("/?courseId=1");
  };
  return (
    <header className="py-4 px-4">
      <div className="flex justify-between items-center md:max-w-5xl m-auto">
        <div className="flex items-center">
          <div className="mr-4">
            <Image alt="logo" src="/logo.png" width={48} height={48}></Image>
          </div>
          <h1 className="text-2xl font-bold text-fuchsia-500 ">EarthWorm</h1>
        </div>
        <div className="flex gap-4 items-center"></div>
        <div className="flex gap-4 items-center">
          {session.isLogin && (
            <div>
              {session.username}{" "}
              <a className="text-red-400 cursor-pointer" onClick={handleLogout}>
                退出
              </a>
            </div>
          )}
          <Link href="/course">更多课程</Link>
          {session.isLogin && courseId && courseId !== "1" && (
            <Dialog
              action={
                <div className="text-red-400 cursor-pointer hover:text-red-800">
                  重置进度
                </div>
              }
              title="重置进度"
              description="重置进度后，将会清空所有课程的学习进度，确定要重置吗？"
              confirm={handleResetProgress}
            />
          )}
          <DarkModeBtn />
        </div>
      </div>
    </header>
  );
};
