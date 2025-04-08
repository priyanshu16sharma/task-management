'use client'
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import { useState } from "react";

export default function HomePage() {
  const filter = ["all",'pending', 'completed', "Deadline Exceeded"]
  const [selectedFilter, setSelectedFilter] = useState("")
  return (
    <main className="h-screen overflow-y-auto bg-gray-100 dark:bg-gray-900 text-black dark:text-white pb-8">
      <div className="sticky top-0 w-full flex justify-between px-2 md:px-5 items-center bg-white">
        <h1 className="md:text-3xl text-xl text-nowrap font-bold text-center text-[#101828]">Task Manager</h1>
        <div className="h-full flex  items-center">
        <select className="md:text-xl md:w-auto w-20 text-[12px] p-2 border border-[#172747] outline-0 rounded-lg p-1  text-[#101828]" onChange={(e)=>{setSelectedFilter(e.target.value)}}>
          {filter.map((data, index)=><option value={data} key={data}>{data.toUpperCase()}</option>)}
        </select>
        <TaskInput />
        </div>
      </div>
      <TaskList selectedFilter={selectedFilter}/>
    </main>
  );
}
