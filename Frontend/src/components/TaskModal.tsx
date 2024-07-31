import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useTasks } from "@/contexts/TaskContext";
import toast from "react-hot-toast";

interface TaskModalProps {
  onClose: () => void;
  isOpen: boolean;
  statusText: string;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  onClose,
  isOpen,
  statusText,
}) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(statusText);
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  const { addTask } = useTasks();

  const handleSubmit = async () => {
    if (!title || !status) {
      toast.error("Title and Status are required.", {
        duration: 1000,
      });
      return;
    }
    const newTask = {
      title,
      status,
      priority,
      deadline,
      description,
      date: new Date().toISOString(),
    };
    await addTask(newTask);
    onClose();
  };

  useEffect(() => {
    const modal = document.querySelector(".modal");
    if (modal) {
      if (isOpen) {
        modal.classList.add("modal-enter");
        setTimeout(() => {
          modal.classList.remove("modal-enter");
          modal.classList.add("modal-enter-active");
        }, 10);
      } else {
        modal.classList.add("modal-exit");
        setTimeout(() => {
          modal.classList.remove("modal-exit");
          modal.classList.add("modal-exit-active");
        }, 10);
      }
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 ${
        isOpen ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300 ease-out`}
    >
      <div className="modal bg-white p-6 shadow-md w-[670px] h-full transform transition-transform duration-300 ease-out">
        <div className="flex justify-between mb-6">
          <div className="flex gap-4">
            <Image
              onClick={() => {
                onClose();
              }}
              src="/icons/cross.svg"
              alt="Cross Icon"
              height={24}
              width={24}
              className="cursor-pointer"
            />
            <Image
              src="/icons/expand.svg"
              alt="Expand Icon"
              height={24}
              width={24}
              className="ml-2 cursor-pointer"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex px-3 py-2 text-gray-600 rounded-md bg-[#F4F4F4] cursor-pointer">
              <p>Share</p>
              <Image
                src="/icons/share.svg"
                alt="Share Icon"
                height={24}
                width={24}
                className="ml-2"
              />
            </div>
            <div className="flex px-3 py-2 text-gray-600 rounded-md bg-[#F4F4F4] cursor-pointer">
              <p>Favorite</p>
              <Image
                src="/icons/star.svg"
                alt="Star Icon"
                height={24}
                width={24}
                className="ml-2"
              />
            </div>
          </div>
        </div>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-4xl font-semibold w-full mb-4 rounded-md focus:outline-none placeholder:text-[#CCCCCC] text-black"
        />

        <div className="flex items-center">
          <div className="flex w-[136px]">
            <Image
              src="/icons/status.svg"
              alt="Status Icon"
              height={24}
              width={24}
            />
            <p className="text-[#666666] text-lg ml-6">Status</p>
          </div>
          <div className="flex ml-[60px]">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="text-md mt-2 mb-4 rounded-md focus:outline-none"
              style={{
                appearance: "none",
                color: status ? "black" : "#CCCCCC",
              }}
            >
              <option value="">Not Selected</option>
              <option value="To do">To do</option>
              <option value="In progress">In progress</option>
              <option value="Under review">Under review</option>
              <option value="Finished">Finished</option>
            </select>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex w-[136px]">
            <Image
              src="/icons/priority.svg"
              alt="Priority Icon"
              height={24}
              width={24}
            />
            <p className="text-[#666666] text-lg ml-6">Priority</p>
          </div>
          <div className="flex ml-[60px]">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="text-md mt-2 mb-4 rounded-md focus:outline-none"
              style={{
                appearance: "none",
                color: priority ? "black" : "#CCCCCC",
              }}
            >
              <option value="">Not Selected</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex w-[136px]">
            <Image
              src="/icons/calendar.svg"
              alt="Calendar Icon"
              height={24}
              width={24}
            />
            <p className="text-[#666666] text-lg ml-6">Deadline</p>
          </div>
          <div className="flex ml-[60px]">
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="text-md mt-2 mb-4 rounded-md focus:outline-none placeholder:text-[#CCCCCC] text-black"
              placeholder="Not selected"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex w-[136px]">
            <Image
              src="/icons/pencil.svg"
              alt="Pencil Icon"
              height={24}
              width={24}
            />
            <p className="text-[#666666] text-lg ml-6">Description</p>
          </div>
          <div className="flex ml-[60px]">
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Not Selected"
              className="text-md mt-2 mb-4 rounded-md focus:outline-none placeholder:text-[#CCCCCC] text-black w-full"
            />
          </div>
        </div>

        <div className="flex mt-6">
          <Image src="/icons/add.svg" alt="Add Icon" height={24} width={24} />
          <p className="text-lg ml-6">Add custom property</p>
        </div>

        <hr className="border-t border-gray-200 my-6" />
        <p className="text-[#C0BDBD]">
          Start writing, or drag your own files here.
        </p>

        <div className="flex justify-end">
          <div className="w-40 mt-10">
            <Button text="Save task" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
