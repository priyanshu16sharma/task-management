'use client'

import { useCallback, useContext,useState, useEffect , useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";


export default function TaskList({selectedFilter}) {
  const { tasks } = useContext(TaskContext);
  const today = new Date().toISOString().split("T")[0];
  const [tasklistData, setTasklistData]= useState([])

  const isDeadlineExceeded = useCallback((task)=>{
    if (task.endDate && task.endDate < today) {
      return true
    }
    return false
  }, [])

  useEffect(()=>{
    if(!tasks) return
    const filteredTasks = tasks.filter((task)=>{
      if(!selectedFilter ) return true;
      if(selectedFilter==='all') return true;
      if(selectedFilter === "Deadline Exceeded" && isDeadlineExceeded(task)) return true;
      if(selectedFilter === 'completed' && task.completed) return true;
      if(selectedFilter === "pending" && !task.completed && !isDeadlineExceeded(task)) return true;
  
      return false;
    })
  
    setTasklistData(filteredTasks)
  }, [tasks, selectedFilter])

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-400 p-4">
        No tasks added yet. Add your first one!
      </div>
    );
  }
 

  return (
    <div className="rounded-md shadow-sm mx-4 md:mx-auto max-w-xl mt-4 flex flex-col gap-2">
      {tasklistData.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
