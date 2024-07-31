import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { Button } from "./Button";

interface SidebarProps {
  toggleModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ toggleModal }) => {
  const { logout, user } = useAuth();

  return (
    <aside className="w-64 p-4 min-h-screen h-full bg-white shadow-md border-r flex flex-col">
      <div className="flex mt-5">
        <Image
          src="/images/user.png"
          alt="User"
          height={31}
          width={31}
          className="mr-3"
        />
        <h2 className="text-xl font-medium">{user?.name || "Joe Gardner"}</h2>
      </div>

      <div className="flex justify-between mt-3">
        <div className="flex gap-4">
          <Image
            src="/icons/bell.svg"
            alt="Analytics Icon"
            height={24}
            width={24}
          />
          <Image
            src="/icons/mode.svg"
            alt="Analytics Icon"
            height={24}
            width={24}
          />
          <Image
            src="/icons/rightArrow.svg"
            alt="Analytics Icon"
            height={24}
            width={24}
          />
        </div>
        <button
          onClick={logout}
          className="px-3 py-2 text-gray-600 rounded-md bg-[#F4F4F4]"
        >
          Logout
        </button>
      </div>

      <nav className="mt-4 mb-2">
        <ul>
          <li className="p-3 bg-[#F4F4F4] rounded border border-gray-300 cursor-pointer flex items-center">
            <Image
              src="/icons/home.svg"
              alt="Analytics Icon"
              height={24}
              width={24}
              className="mr-3"
            />
            Home
          </li>
          <li className="p-3 cursor-pointer flex items-center">
            <Image
              src="/icons/boards.svg"
              alt="Analytics Icon"
              height={24}
              width={24}
              className="mr-3"
            />
            Boards
          </li>
          <li className="p-3 cursor-pointer flex items-center">
            <Image
              src="/icons/settings.svg"
              alt="Analytics Icon"
              height={24}
              width={24}
              className="mr-3"
            />
            Settings
          </li>
          <li className="p-3 cursor-pointer flex items-center">
            <Image
              src="/icons/teams.svg"
              alt="Analytics Icon"
              height={24}
              width={24}
              className="mr-3"
            />
            Teams
          </li>
          <li className="p-3 cursor-pointer flex items-center">
            <Image
              src="/icons/analytics.svg"
              alt="Analytics Icon"
              height={24}
              width={24}
              className="mr-3"
            />
            Analytics
          </li>
        </ul>
      </nav>

      <Button
        text="Create new task"
        onClick={toggleModal}
        icon={
          <Image src="/icons/plus.svg" alt="Plus Icon" height={24} width={24} />
        }
      />

      <div className="mt-auto pb-4">
        <button className="flex items-center justify-center p-2 text-[#666666] rounded-md bg-[#F3F3F3] w-full">
          <Image
            src="/icons/download.svg"
            alt="Analytics Icon"
            height={40}
            width={40}
            className="mr-2"
          />
          <div className="flex flex-col text-start">
            <p className="text-md font-medium text-start">Download the app</p>
            <p className="text-sm text-start">Get the full experience</p>
          </div>
        </button>
      </div>
    </aside>
  );
};
