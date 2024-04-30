import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import React from "react";

const UserBadge = () => {
  const { user } = useCurrentUser();
  return (
    <div className="flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
      {user?.profileImageURL && (
        <Image
          className="rounded-full"
          alt="user-image"
          src={user?.profileImageURL}
          width={50}
          height={50}
        />
      )}
      <div className="hidden sm:block">
        <h3 className="text-xl">
          {user?.firstName} {user?.lastName}
        </h3>
      </div>
    </div>
  );
};

export default UserBadge;
