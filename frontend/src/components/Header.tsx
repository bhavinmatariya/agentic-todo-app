export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row">
        <span className="text-xl font-bold text-blue-600">Todo App</span>
        <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-600">
          <li>
            <a href="#" className="transition-colors hover:text-blue-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="transition-colors hover:text-blue-600">
              Features
            </a>
          </li>
          <li>
            <a href="#" className="transition-colors hover:text-blue-600">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
