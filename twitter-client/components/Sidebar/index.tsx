import { FaRegEnvelope, FaRegUser, FaTwitter } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoBookmarkOutline, IoSearch } from "react-icons/io5";
import { LuBell } from "react-icons/lu";
import { MdHomeFilled } from "react-icons/md";
import { PiDotsThreeBold } from "react-icons/pi";
import UserBadge from "../UserBadge";
import { useCurrentUser } from "@/hooks/user";
import { useMemo } from "react";
import Link from "next/link";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const Sidebar = () => {
  const { user } = useCurrentUser();

  const sidebaarMenuItem: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <MdHomeFilled className="text-2xl" />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <IoSearch className="text-2xl" />,
        link: "/",
      },
      {
        title: "Notifications",
        icon: <LuBell className="text-2xl" />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <FaRegEnvelope />,
        link: "/",
      },
      {
        title: "Bookmarks",
        icon: <IoBookmarkOutline className="text-2xl" />,
        link: "/",
      },
      {
        title: "Twitter Blue",
        icon: <FaMoneyCheckDollar />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <FaRegUser />,
        link: `/${user?.id}`,
      },
      {
        title: "More Options",
        icon: <PiDotsThreeBold />,
        link: "/",
      },
    ],
    [user?.id]
  );

  return (
    <div className="col-span-2 sm:col-span-3 pt-2 flex sm:justify-end pr-4">
      <div>
        <div className="text-2xl h-fit w-fit hover:bg-gray-600 rounded-full p-4 cursor-pointer transition-all">
          <FaTwitter />
        </div>
        <div className="mt-2 text-lg pr-4 relative">
          <ul>
            {sidebaarMenuItem.map((item) => (
              <li key={item.title}>
                <Link
                  className="flex justify-start items-center gap-4 hover:bg-gray-600 rounded-full px-5 py-2 w-fit cursor-pointer transition-all mt-2"
                  href={item?.link}
                >
                  <span>{item.icon}</span>
                  <span className="hidden sm:inline">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <button className="hidden sm:block bg-[#1d9bf0] text-white text-lg font-semibold rounded-full p-2 mt-5 w-full">
            Tweet
          </button>
          <button className="block sm:hidden bg-[#1d9bf0] text-white text-lg font-semibold rounded-full p-2 mt-5">
            <FaTwitter />
          </button>
        </div>
      </div>
      {user && (
        <div className="absolute bottom-5">
          <UserBadge />
        </div>
      )}
    </div>
  );
};
export default Sidebar;
