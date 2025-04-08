'use client'

import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { Check, Undo2, Trash2 } from "lucide-react";

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useContext(TaskContext);

  const getStatus = () => {
    if (task.completed) return "Completed";

    const today = new Date().toISOString().split("T")[0];
    if (task.endDate && task.endDate < today) {
      return "Deadline Exceeded";
    }

    return "Pending";
  };

  const status = getStatus();
  const statusColor = {
    "Completed": "text-green-600",
    "Pending": "text-yellow-600",
    "Deadline Exceeded": "text-red-600",
  }[status];

  return (
    <div
      className={`p-4 border-b dark:border-gray-700 rounded-md shadow-sm ${
        task.completed ? "bg-green-50 dark:bg-green-900" : "bg-white dark:bg-gray-800"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 cursor-pointer select-none" onClick={() => toggleTask(task.id)}>
          <div className="flex items-center gap-2">
            <h3
              className={`text-lg font-semibold ${
                task.completed ? "line-through text-gray-400" : "text-gray-800 dark:text-white"
              }`}
            >
              {task.title}
            </h3>
          
          </div>

          {task.description && (
            <p
              className={`text-sm mt-1 ${
                task.completed ? "text-gray-400" : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {task.description}
            </p>
          )}

          {(task.startDate || task.endDate) && (
            <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
              {task.startDate && <span>📅 Start: {task.startDate}</span>}{" "}
              {task.endDate && <span>→ End: {task.endDate}</span>}
            </p>
          )}

          <p className={`text-sm font-medium mt-2 ${statusColor}`}>
            Status: {status}
          </p>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={() => toggleTask(task.id)}
            className="hover:opacity-80"
            title={task.completed ? "Undo" : "Mark as Done"}
          >
            {task.completed ? <Undo2 size={18} /> : <Check size={18} />}
          </button>

          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-600 hover:text-red-800"
            title="Delete Task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
