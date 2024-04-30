import React from "react";
import Sidebar from "../Sidebar";
import CreatePostCard from "../CreatPostCard";
import { useCurrentUser } from "@/hooks/user";
import GoogleLoginButton from "../GoogleLoginButton";
import Image from "next/image";
import Link from "next/link";

interface TwitterLayoutProps {
  children: React.ReactNode;
}
const TwitterLayout = ({ children }: TwitterLayoutProps) => {
  const { user } = useCurrentUser();
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen sm:px-40">
        <Sidebar />
        <div className="col-span-10 sm:col-span-5 border-r-[1px] border-l-[1px] overflow-scroll h-screen border-gray-600">
          {children}
        </div>
        <div className="col-span-0 sm:col-span-3 p-5">
          {!user ? (
            <GoogleLoginButton />
          ) : (
            <div className="py-3 px-4 bg-slate-800 rounded-lg">
              <h1 className="my-2 text-xl mb-5">Users you may know</h1>
              {user?.recomendedUsers?.map((el) => (
                <div className="flex items-center gap-3 mt-2" key={el?.id}>
                  {el?.profileImageURL && (
                    <Image
                      src={el?.profileImageURL}
                      alt="user-image"
                      className="rounded-full"
                      height={60}
                      width={60}
                    />
                  )}
                  <div>
                    <div className="text-lg">
                      {el?.firstName} {el?.lastName}
                    </div>
                    <Link
                      href={"/" + el?.id}
                      className="bg-white text-black text-sm px-5 py-1 rounded-lg w-full"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwitterLayout;
