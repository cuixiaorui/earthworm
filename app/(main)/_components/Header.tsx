'use client';
import Link from "next/link";
import Image from "next/image";
import { DarkModeBtn } from "./DarkModeBtn";
import { useSession } from "../../../hooks/user";
import { useRouter } from "next/navigation";
export const Header = () => {
  const { session, logout } = useSession()
  const router = useRouter()
  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }
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
          {session.isLogin && <div>{session.username} <a className="text-red-400 cursor-pointer" onClick={handleLogout}>退出</a></div>}
          <Link href="/course">更多课程</Link>
          <DarkModeBtn />
        </div>
      </div>
    </header>
  );
};
