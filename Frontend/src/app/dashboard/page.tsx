"use client";
import { useEffect, useState } from "react";
import { TaskModal } from "@/components/TaskModal";
import { Sidebar } from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import Image from "next/image";
import { LightButton } from "@/components/LightButton";
import { Button } from "@/components/Button";
import Board from "./board";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const cardsData = [
  {
    imageSrc: "/images/1.png",
    altText: "Introducing tags",
    title: "Introducing tags",
    description:
      "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
  },
  {
    imageSrc: "/images/2.png",
    altText: "Share Notes Instantly",
    title: "Share Notes Instantly",
    description:
      "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
  },
  {
    imageSrc: "/images/3.png",
    altText: "Access Anywhere",
    title: "Access Anywhere",
    description:
      "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex h-full bg-[#f7f7f7]">
      <Sidebar toggleModal={toggleModal} />
      <main className="flex-1 p-6 overflow-y-auto" style={{ height: "100vh" }}>
        <section>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              Good morning, {user?.name || "Joe Gardner"} !
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <span>Help & feedback</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#080808"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 9.00001C9 5.49998 14.5 5.50001 14.5 9.00001C14.5 11.5 12 10.9999 12 13.9999"
                  stroke="#080808"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 18.0099L12.01 17.9988"
                  stroke="#080808"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
            {cardsData.map((card, index) => (
              <DashboardCard
                key={index}
                imageSrc={card.imageSrc}
                altText={card.altText}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between my-6">
          <div className="flex items-center border border-gray-300 bg-white rounded-lg p-1 w-[196px]">
            <input
              type="text"
              placeholder="Search"
              className="p-2 outline-none w-full"
            />
            <Image
              src="/icons/search.svg"
              alt="Calendar Icon"
              height={20}
              width={20}
            />
          </div>
          <div className="flex items-center space-x-5">
            <LightButton
              text="Calendar view"
              onClick={() => {}}
              icon={"/icons/calendar.svg"}
              alt={"Calendar Icon"}
            />
            <LightButton
              text="Automation"
              onClick={() => {}}
              icon={"/icons/stars.svg"}
              alt={"Stars Icon"}
            />
            <LightButton
              text="Filter"
              onClick={() => {}}
              icon={"/icons/filter.svg"}
              alt={"Filter Icon"}
            />
            <LightButton
              text="Share"
              onClick={() => {}}
              icon={"/icons/share.svg"}
              alt={"Share Icon"}
            />
            <Button
              text="Create new"
              onClick={toggleModal}
              icon={
                <Image
                  src="/icons/plus.svg"
                  alt="Plus Icon"
                  height={24}
                  width={24}
                />
              }
            />
          </div>
        </div>

        <Board />
      </main>

      {isModalOpen && (
        <TaskModal isOpen={isModalOpen} onClose={toggleModal} statusText="" />
      )}
    </div>
  );
}
