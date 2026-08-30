import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <>
      <header className="w-full border-b border-gray-200">
        <nav className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row sm:gap-0 sm:px-12 md:px-16 lg:px-24">
          <span className="text-2xl font-bold text-blue-600 md:text-3xl">Todo App</span>
        </nav>
      </header>
      <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6 py-10 sm:px-12 md:px-16 lg:px-24">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-blue-600 sm:text-4xl">Your Todos</h1>
          <p className="text-gray-600">
            Manage your tasks, track priorities, and stay on schedule.
          </p>
        </div>
        <TodoList />
      </main>
    </>
  );
}
