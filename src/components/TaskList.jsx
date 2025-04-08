'use client'

import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { tasks } = useContext(TaskContext);

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-400 p-4">
        No tasks added yet. Add your first one!
      </div>
    );
  }

  // Sort logic: Pending first, then Completed (most recently completed first)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      if (a.completed && b.completed) {
        // Recently completed first
        return new Date(b.completedAt) - new Date(a.completedAt);
      }
      return 0;
    }
    return a.completed ? 1 : -1; // Pending on top
  });

  return (
    <div className="rounded-md shadow-sm mx-4 md:mx-auto max-w-xl mt-4 flex flex-col gap-2">
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
