"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: "Desk" | "Travel" | "Audio" | "Wellness";
  price: number;
  rating: number;
  stock: number;
  description: string;
  accent: string;
  featured: boolean;
};

const products: Product[] = [
  {
    id: 1,
    name: "Halo Desk Lamp",
    category: "Desk",
    price: 68,
    rating: 4.8,
    stock: 14,
    description: "Soft light, USB-C charging, and a compact footprint for focused work.",
    accent: "from-sky-400 via-cyan-400 to-emerald-400",
    featured: true,
  },
  {
    id: 2,
    name: "Orbit Carry Tote",
    category: "Travel",
    price: 84,
    rating: 4.6,
    stock: 8,
    description: "Water-resistant carry-all with modular pockets for daily essentials.",
    accent: "from-violet-400 via-fuchsia-400 to-rose-400",
    featured: true,
  },
  {
    id: 3,
    name: "Pulse ANC Earbuds",
    category: "Audio",
    price: 119,
    rating: 4.9,
    stock: 21,
    description: "Balanced sound with adaptive noise cancellation and all-day comfort.",
    accent: "from-amber-300 via-orange-400 to-red-400",
    featured: true,
  },
  {
    id: 4,
    name: "Calmstone Diffuser",
    category: "Wellness",
    price: 52,
    rating: 4.5,
    stock: 5,
    description: "A quiet mist diffuser designed to soften your workspace atmosphere.",
    accent: "from-emerald-300 via-teal-400 to-cyan-500",
    featured: false,
  },
  {
    id: 5,
    name: "Arc Laptop Stand",
    category: "Desk",
    price: 44,
    rating: 4.7,
    stock: 16,
    description: "Raises your screen, improves posture, and clears desk clutter.",
    accent: "from-slate-400 via-zinc-500 to-stone-600",
    featured: false,
  },
  {
    id: 6,
    name: "Trail Bottle",
    category: "Wellness",
    price: 36,
    rating: 4.4,
    stock: 24,
    description: "Temperature-safe bottle with a slim silhouette and textured grip.",
    accent: "from-lime-300 via-green-400 to-emerald-500",
    featured: false,
  },
];

const categories = ["All", "Desk", "Travel", "Audio", "Wellness"] as const;

type Category = (typeof categories)[number];
type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Top rated",
};

const money = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [maxPrice, setMaxPrice] = useState(130);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([1, 3]);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch =
          searchTerm.length === 0 ||
          [product.name, product.category, product.description]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm);
        const matchesPrice = product.price <= maxPrice;
        const matchesStock = !inStockOnly || product.stock > 0;

        return matchesCategory && matchesSearch && matchesPrice && matchesStock;
      })
      .sort((left, right) => {
        if (sortBy === "price-asc") return left.price - right.price;
        if (sortBy === "price-desc") return right.price - left.price;
        if (sortBy === "rating") return right.rating - left.rating;

        const featuredScoreLeft = left.featured ? 1 : 0;
        const featuredScoreRight = right.featured ? 1 : 0;

        return featuredScoreRight - featuredScoreLeft || right.rating - left.rating;
      });
  }, [selectedCategory, query, sortBy, maxPrice, inStockOnly]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const toggleFavorite = (productId: number) => {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  };

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateCartQuantity = (productId: number, delta: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  useEffect(() => {
    if (!cartOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCartOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cartOpen]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1e293b_0,_#020617_40%,_#020617_100%)] text-slate-50">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-lg font-black text-slate-950 shadow-lg shadow-cyan-500/30">
              N
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Nova Market
              </p>
              <p className="text-xs text-slate-400">Designed to convert, built to feel fast</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            <a href="#featured" className="text-sm text-slate-300 transition hover:text-white">
              Featured
            </a>
            <a href="#shop" className="text-sm text-slate-300 transition hover:text-white">
              Shop
            </a>
            <a href="#design" className="text-sm text-slate-300 transition hover:text-white">
              Design
            </a>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Cart · {cartCount}
            </button>
          </nav>

          <button
            type="button"
            onClick={() => setMobileNavOpen((current) => !current)}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white lg:hidden"
          >
            {mobileNavOpen ? "Close" : "Menu"}
          </button>
        </div>

        {mobileNavOpen && (
          <div className="border-t border-white/10 px-4 pb-4 sm:px-6 lg:hidden">
            <div className="grid gap-2 pt-4 text-sm text-slate-300">
              <a href="#featured" className="rounded-xl bg-white/5 px-4 py-3">
                Featured
              </a>
              <a href="#shop" className="rounded-xl bg-white/5 px-4 py-3">
                Shop
              </a>
              <a href="#design" className="rounded-xl bg-white/5 px-4 py-3">
                Design
              </a>
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950"
              >
                Open cart ({cartCount})
              </button>
            </div>
          </div>
        )}
      </header>

      <main id="top" className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              Optimised storefront for a presentation-ready demo
            </span>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Premium products, faster decisions, and clearer buying signals.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Nova Market combines Tailwind CSS styling with Next.js rendering patterns to
                deliver a compact ecommerce experience that feels responsive, informative, and
                easy to navigate across devices.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#shop"
                className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                Explore products
              </a>
              <a
                href="#design"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                See design choices
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["24 ms", "UI feedback on hover and state changes"],
                ["1 source", "Shared data drives filtering and cart state"],
                ["100%", "Responsive layout built with Tailwind utilities"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/20"
                >
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-4 shadow-2xl shadow-cyan-500/10">
            <div className="rounded-[1.6rem] bg-gradient-to-br from-cyan-400/20 via-indigo-400/10 to-slate-950 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">Today’s edit</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">Design systems that guide action</h2>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Live preview
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Clear hierarchy keeps the primary CTA easy to find.",
                  "Sticky nav and cart reduce friction when browsing.",
                  "Filter state narrows choices without reloading the page.",
                  "Strong contrast improves readability on smaller screens.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="featured" className="mt-16 scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Featured picks
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white">High-intent products with strong visual cues</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              These cards use consistent spacing, soft gradients, and immediate feedback to help
              shoppers scan quickly and make decisions faster.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {products
              .filter((product) => product.featured)
              .map((product) => (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-xl shadow-slate-950/20"
                >
                  <div className={`h-40 bg-gradient-to-br ${product.accent}`} />
                  <div className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">{product.category}</p>
                        <h3 className="mt-1 text-xl font-bold text-white">{product.name}</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(product.id)}
                        className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-2 text-sm text-white transition hover:bg-white/10"
                        aria-label={`Toggle favourite for ${product.name}`}
                      >
                        {favorites.includes(product.id) ? "♥" : "♡"}
                      </button>
                    </div>
                    <p className="text-sm leading-6 text-slate-400">{product.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-white">{money.format(product.price)}</span>
                      <span className="text-amber-300">★ {product.rating}</span>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>

        <section id="shop" className="mt-16 scroll-mt-24">
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
            <aside className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Shop controls</p>
              <h2 className="mt-2 text-2xl font-bold text-white">Dynamic filtering without page reloads</h2>

              <label className="mt-6 block text-sm font-medium text-slate-200">
                Search products
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name, category, or feature"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-white/10"
                />
              </label>

              <div className="mt-5">
                <p className="text-sm font-medium text-slate-200">Category</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        selectedCategory === category
                          ? "bg-cyan-400 text-slate-950"
                          : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <label className="block text-sm font-medium text-slate-200">
                  Sort by
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as SortOption)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/10"
                  >
                    {Object.entries(sortLabels).map(([value, label]) => (
                      <option key={value} value={value} className="bg-slate-950">
                        {label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-medium text-slate-200">
                  Max price: {money.format(maxPrice)}
                  <input
                    type="range"
                    min={30}
                    max={130}
                    value={maxPrice}
                    onChange={(event) => setMaxPrice(Number(event.target.value))}
                    className="mt-3 w-full accent-cyan-400"
                  />
                </label>
              </div>

              <label className="mt-5 flex items-center gap-3 text-sm text-slate-200">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(event) => setInStockOnly(event.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-white/10 accent-cyan-400"
                />
                In-stock only
              </label>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                <p className="font-semibold text-white">Why this helps engagement</p>
                <p className="mt-2 leading-6">
                  Filters, badges, and immediate state updates reduce uncertainty, keep the interface
                  predictable, and make it easier to compare products on the fly.
                </p>
              </div>
            </aside>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
                <p>
                  Showing <span className="font-semibold text-white">{filteredProducts.length}</span> products
                </p>
                <p>
                  Cart subtotal <span className="font-semibold text-white">{money.format(cartSubtotal)}</span>
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="rounded-[1.75rem] border border-dashed border-white/15 bg-white/5 p-10 text-center">
                  <h3 className="text-2xl font-bold text-white">No products match those filters</h3>
                  <p className="mt-3 text-slate-400">Try broadening the category or increasing the price range.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("All");
                      setQuery("");
                      setSortBy("featured");
                      setMaxPrice(130);
                      setInStockOnly(false);
                    }}
                    className="mt-6 rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredProducts.map((product) => (
                    <article
                      key={product.id}
                      className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/90 shadow-xl shadow-slate-950/20"
                    >
                      <div className={`h-32 bg-gradient-to-br ${product.accent} p-4`}>
                        <div className="flex items-start justify-between">
                          <span className="rounded-full bg-slate-950/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                            {product.category}
                          </span>
                          <span className="rounded-full bg-slate-950/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                            {product.stock} in stock
                          </span>
                        </div>
                      </div>
                      <div className="space-y-4 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-bold text-white">{product.name}</h3>
                            <p className="mt-1 text-sm text-slate-400">{product.description}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleFavorite(product.id)}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
                          >
                            {favorites.includes(product.id) ? "Saved" : "Save"}
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-300">
                          <span>★ {product.rating}</span>
                          <span className="font-semibold text-white">{money.format(product.price)}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="w-full rounded-full bg-white px-4 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300"
                        >
                          Add to cart
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="design" className="mt-16 scroll-mt-24">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Usability",
                copy: "Navigation is sticky, controls are grouped, and button states are obvious, which lowers cognitive load.",
              },
              {
                title: "Responsiveness",
                copy: "The layout shifts from stacked sections to two-column browsing with Tailwind breakpoints.",
              },
              {
                title: "Performance",
                copy: "Next.js handles the app shell efficiently while the dynamic behaviour stays local to one client component.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 text-sm leading-7 text-slate-300">
            <p className="font-semibold text-white">Agentic workflow note</p>
            <p className="mt-2">
              I also used an agent-style review step to sanity-check the storefront structure and the
              presentation story. The advice that helped most was to keep the filtering model simple
              and make the design rationale visible in the UI itself; the less useful feedback was
              more generic than actionable, so I ignored it.
            </p>
          </div>
        </section>
      </main>

      {cartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-slate-950/70 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 cursor-default"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="relative flex h-full w-full max-w-md flex-col border-l border-white/10 bg-slate-950 p-6 shadow-2xl shadow-black/40"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Cart</p>
                <h2 id="cart-title" className="mt-2 text-2xl font-bold text-white">
                  Ready to checkout
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-center text-slate-400">
                  Your cart is empty. Add a product to see quantity controls here.
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{item.product.name}</p>
                        <p className="text-sm text-slate-400">{money.format(item.product.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, -item.quantity)}
                        className="text-sm text-rose-300 transition hover:text-rose-200"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-slate-400">Quantity</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, -1)}
                          className="h-9 w-9 rounded-full border border-white/10 bg-slate-900 text-white"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-semibold text-white">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, 1)}
                          className="h-9 w-9 rounded-full border border-white/10 bg-slate-900 text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Subtotal</span>
                <span className="font-semibold text-white">{money.format(cartSubtotal)}</span>
              </div>
              <button
                type="button"
                className="w-full rounded-full bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Checkout now
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
