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
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold text-blue-600">Todo App Frontend</h1>
        <p className="mt-4 text-lg text-gray-600">
          The Next.js frontend is up and running.
        </p>
      </main>
    </>
  );
}
