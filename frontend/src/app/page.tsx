export default function Home() {
  return (
    <>
      <header className="w-full border-b border-gray-200">
        <nav className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row sm:gap-0 sm:px-12">
          <span className="text-2xl font-bold text-blue-600">Todo App</span>
          <ul className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                About
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-24 text-center sm:px-12">
        <h1 data-test className="text-4xl font-bold text-blue-600 sm:text-6xl">
          Organize Your Life with Todo App
        </h1>
        <p className="max-w-2xl text-lg text-gray-600 sm:text-xl">
          A simple and intuitive way to manage your tasks, stay productive,
          and never miss a deadline again.
        </p>
        <a
          href="#"
          className="mt-4 rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          Get Started
        </a>
      </main>
    </>
  );
}
