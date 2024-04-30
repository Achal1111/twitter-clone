import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

interface NavbarProps {
  userName: string;
  tweetsCount: number;
}

const Navbar = ({ userName, tweetsCount }: NavbarProps) => {
  return (
    <div>
      <nav className="flex items-center gap-3 py-3 px-3">
        <FaLongArrowAltLeft className="text-2xl" />
        <div>
          <h1 className="text-2xl font-bold">{userName}</h1>
          <h1 className="text-md font-bold text-slate-500">
            {tweetsCount} Tweets
          </h1>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
