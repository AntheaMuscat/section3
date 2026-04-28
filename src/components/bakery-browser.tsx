
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  bakeryProducts,
  categories,
  money,
  sortLabels,
  type BakeryProduct,
  type Category,
  type SortOption,
} from "@/lib/bakery";

export function BakeryBrowser() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [maxPrice, setMaxPrice] = useState(30);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([1, 3]);
  const [basket, setBasket] = useState<{ product: BakeryProduct; quantity: number }[]>([]);
  const [basketOpen, setBasketOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return bakeryProducts
      .filter((product) => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch =
          searchTerm.length === 0 ||
          [product.name, product.description, product.category, ...product.details]
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

        const featuredLeft = left.featured ? 1 : 0;
        const featuredRight = right.featured ? 1 : 0;
        return featuredRight - featuredLeft || right.rating - left.rating;
      });
  }, [selectedCategory, query, sortBy, maxPrice, inStockOnly]);

  const basketCount = basket.reduce((total, item) => total + item.quantity, 0);
  const basketSubtotal = basket.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const toggleFavorite = (productId: number) => {
    setFavorites((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
    );
  };

  const addToBasket = (product: BakeryProduct) => {
    setBasket((current) => {
      const existing = current.find((item) => item.product.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...current, { product, quantity: 1 }];
    });
    setBasketOpen(true);
  };

  const updateBasketQuantity = (productId: number, delta: number) => {
    setBasket((current) =>
      current
        .map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  useEffect(() => {
    if (!basketOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBasketOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [basketOpen]);

  // Open basket via #cart or custom event
  useEffect(() => {
    const tryOpenFromHash = () => {
      try {
        if (window.location.hash === "#cart") setBasketOpen(true);
      } catch {}
    };

    const onCustomOpen = () => setBasketOpen(true);

    tryOpenFromHash();
    window.addEventListener("hashchange", tryOpenFromHash);
    window.addEventListener("open-bakery-basket", onCustomOpen as EventListener);

    return () => {
      window.removeEventListener("hashchange", tryOpenFromHash);
      window.removeEventListener("open-bakery-basket", onCustomOpen as EventListener);
    };
  }, []);

  const closeBasket = () => {
    setBasketOpen(false);
    try {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    } catch {}
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
        <aside className="rounded-[1.75rem] border border-rose-200 bg-white/90 p-6 shadow-xl shadow-rose-100/70">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">Build a box</p>
          <h2 className="mt-2 text-2xl font-bold text-rose-950">Pick cute bakes and build your basket</h2>

          <label className="mt-6 block text-sm font-medium text-rose-900">
            Search treats
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search cake, tart, latte..."
              className="mt-2 w-full rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-950 outline-none transition placeholder:text-rose-300 focus:border-rose-300 focus:bg-white"
            />
          </label>

          <div className="mt-5">
            <p className="text-sm font-medium text-rose-900">Category</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? "bg-rose-300 text-rose-950"
                      : "border border-rose-200 bg-white text-rose-500 hover:bg-rose-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <label className="block text-sm font-medium text-rose-900">
              Sort by
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="mt-2 w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-rose-950 outline-none transition focus:border-rose-300 focus:bg-rose-50"
              >
                {Object.entries(sortLabels).map(([value, label]) => (
                  <option key={value} value={value} className="bg-white">
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-rose-900">
              Max price: {money.format(maxPrice)}
              <input
                type="range"
                min={4}
                max={30}
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="mt-3 w-full accent-rose-300"
              />
            </label>
          </div>

          <label className="mt-5 flex items-center gap-3 text-sm text-rose-900">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) => setInStockOnly(event.target.checked)}
              className="h-4 w-4 rounded border-rose-200 bg-white accent-rose-300"
            />
            In-stock only
          </label>

          <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            <p className="font-semibold text-rose-950">Sweet little shopping helper</p>
            <p className="mt-2 leading-6">
              Clear pricing, tiny treat images, and visible stock help shoppers build a cute bakery box
              without feeling overwhelmed.
            </p>
          </div>
        </aside>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-rose-200 bg-white/90 px-5 py-4 text-sm text-rose-600 shadow-sm">
            <p>
              Showing <span className="font-semibold text-rose-950">{filteredProducts.length}</span> treats
            </p>
            <p>
              Basket subtotal <span className="font-semibold text-rose-950">{money.format(basketSubtotal)}</span>
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-[1.75rem] border border-rose-200 bg-white shadow-xl shadow-rose-100/70"
              >
                <div className={`p-4 ${product.accent} bg-gradient-to-br`}>
                  <div className="flex items-start justify-between">
                    <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-rose-700 backdrop-blur">
                      {product.category}
                    </span>
                    <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-rose-700 backdrop-blur">
                      {product.stock} in stock
                    </span>
                  </div>
                  <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/60">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={900}
                      height={700}
                      className="h-44 w-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-rose-950">{product.name}</h3>
                      <p className="mt-1 text-sm text-rose-500">{product.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(product.id)}
                      className="rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-500 transition hover:bg-rose-100"
                    >
                      {favorites.includes(product.id) ? "Saved" : "Save"}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.details.map((detail) => (
                      <span key={detail} className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs text-rose-600">
                        {detail}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-rose-500">
                    <span>★ {product.rating}</span>
                    <span className="font-semibold text-rose-950">{money.format(product.price)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToBasket(product)}
                    className="w-full rounded-full bg-gradient-to-r from-rose-300 to-pink-300 px-4 py-3 font-semibold text-rose-950 transition hover:-translate-y-0.5"
                  >
                    Add to basket
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-rose-200 bg-white/90 p-6 text-sm leading-7 text-rose-600 shadow-sm">
        <p className="font-semibold text-rose-950">Why this bakery feels easy to order from</p>
        <p className="mt-2">
          The layout uses clear product cards, instant filtering, and basket feedback so customers can
          choose sweet treats quickly. The interface keeps the focus on flavour, price, and freshness.
        </p>
      </section>

      {basketOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-rose-950/20 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close basket"
            onClick={closeBasket}
            className="absolute inset-0 cursor-default"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="basket-title"
            className="relative flex h-full w-full max-w-md flex-col border-l border-rose-200 bg-[#fff8fb] p-6 shadow-2xl shadow-rose-100/70"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-rose-500">Basket</p>
                <h2 id="basket-title" className="mt-2 text-2xl font-bold text-rose-950">
                  Ready to sweeten your day
                </h2>
                <p className="mt-1 text-sm text-rose-500">{basketCount} treat(s) in your basket</p>
              </div>
              <button
                type="button"
                onClick={closeBasket}
                className="rounded-full border border-rose-200 bg-white px-3 py-2 text-rose-500"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
              {basket.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-rose-200 bg-white p-8 text-center text-rose-400">
                  Your basket is empty. Add a treat to see quantity controls here.
                </div>
              ) : (
                basket.map((item) => (
                  <div key={item.product.id} className="rounded-3xl border border-rose-200 bg-white p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-rose-950">{item.product.name}</p>
                        <p className="text-sm text-rose-500">{money.format(item.product.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateBasketQuantity(item.product.id, -item.quantity)}
                        className="text-sm text-rose-400 transition hover:text-rose-500"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-rose-500">Quantity</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateBasketQuantity(item.product.id, -1)}
                          className="h-9 w-9 rounded-full border border-rose-200 bg-rose-50 text-rose-500"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-semibold text-rose-950">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateBasketQuantity(item.product.id, 1)}
                          className="h-9 w-9 rounded-full border border-rose-200 bg-rose-50 text-rose-500"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 space-y-4 border-t border-rose-100 pt-6">
              <div className="flex items-center justify-between text-sm text-rose-500">
                <span>Subtotal</span>
                <span className="font-semibold text-rose-950">{money.format(basketSubtotal)}</span>
              </div>
              <button
                type="button"
                className="w-full rounded-full bg-gradient-to-r from-rose-300 to-pink-300 px-4 py-3 font-semibold text-rose-950 transition hover:scale-[1.01]"
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
