import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
export const Header = () => {
  return (
    <header className="py-4 px-4">
      <div className="flex justify-between items-center md:max-w-5xl m-auto">
        <div className="flex items-center">
          <div className="mr-4">
            <Image alt="logo" src="/logo.png" width={48} height={48}></Image>
          </div>
          <h1 className="text-2xl font-bold text-fuchsia-500 ">EarthWorm</h1>
        </div>
        <div>
          <UserButton></UserButton>
        </div>
      </div>
    </header>
  );
};
