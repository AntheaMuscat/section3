import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/visit", label: "Visit" },
];

export function StoreHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rose-200/70 bg-[#fff8fb]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-300 via-pink-300 to-amber-200 text-lg font-black text-rose-950 shadow-lg shadow-rose-200/60">
            🍓
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
              Sugar & Swirl
            </p>
            <p className="text-xs text-rose-400">A cute bakery filled with fresh pastries and cakes</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 rounded-full border border-rose-200 bg-white/80 p-1 shadow-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-rose-500 transition hover:bg-rose-100 hover:text-rose-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#cart"
            aria-label="Open cart"
            className="items-center gap-2 rounded-full border border-rose-200 bg-white px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
          >
            <span className="text-lg">🧺</span>
            <span className="sr-only">Open cart</span>
            <span className="ml-1 text-rose-700">Cart</span>
          </a>

          <a
            href="/menu"
            className="rounded-full bg-gradient-to-r from-rose-300 to-pink-300 px-5 py-3 text-sm font-semibold text-rose-950 transition hover:scale-[1.02]"
          >
            Order treats
          </a>
        </div>
      </div>
    </header>
  );
}
