import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#about", label: "About" },
];

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Todo App
        </Link>
        <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-600 sm:justify-end">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-blue-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
