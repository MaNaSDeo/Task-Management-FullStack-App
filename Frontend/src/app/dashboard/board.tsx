import React, { useState } from "react";
import { TaskModal } from "@/components/TaskModal";
import { Todocolumn } from "@/components/TodoColumn";
import { Task, useTasks } from "@/contexts/TaskContext";

const Board: React.FC = () => {
  const { tasks, updateTask, fetchTasks, loading, error } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [statusText, setStatusText] = useState("");

  const moveTask = async (id: string, status: Task["status"]) => {
    try {
      await updateTask(id, { status });
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error fetching tasks: {error}</div>;
  }

  const statuses: Array<"To do" | "In progress" | "Under review" | "Finished"> =
    ["To do", "In progress", "Under review", "Finished"];

  return (
    <div className="grid grid-cols-4 gap-4 bg-white p-4 rounded-md">
      {statuses.map((status) => (
        <Todocolumn
          key={status}
          status={status}
          tasks={tasks?.filter((task) => task.status === status)}
          moveTask={moveTask}
          onAddNew={() => {
            setStatusText(status);
            setShowModal(true);
          }}
        />
      ))}
      {showModal && (
        <TaskModal
          onClose={() => setShowModal(false)}
          isOpen={showModal}
          statusText={statusText}
        />
      )}
    </div>
  );
};

export default Board;
