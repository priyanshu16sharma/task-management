'use client'

import { createContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const addTask = useCallback((taskData) => {
    const newTask = {
      id: uuidv4(),
      ...taskData,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }, [setTasks]);

  const reorderTasks = useCallback((startIndex, endIndex) => {
    setTasks((prevTasks) => {
      const updatedTasks = Array.from(prevTasks);
      const [movedItem] = updatedTasks.splice(startIndex, 1);
      updatedTasks.splice(endIndex, 0, movedItem);
      return updatedTasks;
    });
  }, [setTasks]);
  
  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter(task => task.id !== id));
  }, [setTasks]);

 const toggleTask = useCallback((id) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : null,
          }
        : task
    )
  );

  }, [setTasks]);

  const contextValue = useMemo(() => ({
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    reorderTasks
  }), [tasks, addTask, deleteTask, toggleTask, reorderTasks]);

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
}
