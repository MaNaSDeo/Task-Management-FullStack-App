import { useDrop } from "react-dnd";
import { TaskCard } from "@/components/TaskCard";
import { Task } from "@/contexts/TaskContext";

interface TodoColumnProps {
  status: Task["status"];
  tasks: Task[];
  moveTask: (_id: string, status: Task["status"]) => void;
  onAddNew: () => void;
}

export const Todocolumn: React.FC<TodoColumnProps> = ({
  status,
  tasks,
  moveTask,
  onAddNew,
}) => {
  const [, drop] = useDrop({
    accept: "task",
    drop: (item: { _id: string }) => moveTask(item._id, status),
  });

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className="bg-white p-2 rounded-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl">{status}</h3>
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.75 5H11.75"
            stroke="#555555"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.75 12H16.75"
            stroke="#555555"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.75 19H21.75"
            stroke="#555555"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
      <button
        onClick={onAddNew}
        className="flex items-center justify-between p-2 w-full bg-[linear-gradient(180deg,_#3A3A3A_0%,_#202020_100%)] text-white rounded-lg mt-2 hover:bg-gray-800 transition duration-300"
      >
        Add new{" "}
        <span className="ml-2">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.75 12H12.75M12.75 12H18.75M12.75 12V6M12.75 12V18"
              stroke="#E3E1E1"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};
