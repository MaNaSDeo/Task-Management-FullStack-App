import { Task } from "@/contexts/TaskContext";
import Image from "next/image";
import { useDrag } from "react-dnd";

interface TaskCardProps {
  task: Task;
}

const timeAgo = (date: string) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} yrs ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hr${interval > 1 ? "s" : ""} ago`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} min${interval > 1 ? "s" : ""} ago`;
  return `${seconds} sec${seconds > 1 ? "s" : ""} ago`;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { _id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`p-4 mb-4 bg-[#F9F9F9] rounded-md border border-[#DEDEDE] ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <h4 className="font-medium text-lg text-[#606060]">{task.title}</h4>
      <p className="text-[#797979]">{task.description}</p>
      <span
        className={`inline-block px-2 py-1 mt-2 text-xs font-semibold ${
          task.priority === "Urgent"
            ? "bg-[#FF6B6B] text-white"
            : task.priority === "Medium"
            ? "bg-[#FFA235] text-white"
            : "bg-[#0ECC5A] text-white"
        } rounded`}
      >
        {task.priority}
      </span>
      {task.deadline && (
        <div className="flex items-center mt-4">
          <Image
            src="/icons/clock.svg"
            alt="Deadline Icon"
            height={20}
            width={20}
          />
          <span className="ml-2 text-[#606060]">
            {new Date(task.deadline).toLocaleDateString()}
          </span>
        </div>
      )}
      <p className="text-[#797979] mt-2">{timeAgo(task.date)}</p>
    </div>
  );
};
