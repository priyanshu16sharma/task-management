'use client'
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";

export default function HomePage() {
  return (
    <main className="h-screen overflow-y-auto bg-gray-100 dark:bg-gray-900 text-black dark:text-white pb-8">
      <div className="sticky top-0 w-full flex justify-between px-5 items-center bg-white">
        <h1 className="text-3xl font-bold text-center ">Task Manager</h1>
        <TaskInput />
      </div>
      <TaskList />
    </main>
  );
}
