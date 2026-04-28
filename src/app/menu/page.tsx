import { BakeryBrowser } from "@/components/bakery-browser";

export default function MenuPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">Menu</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-rose-950 sm:text-5xl">
            Choose from our sweet little lineup of cakes, pastries, cupcakes, and drinks.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-rose-600 sm:text-lg">
            This menu page is the heart of the bakery experience. It includes dynamic filtering, sort
            controls, and a basket drawer so browsing feels playful and practical.
          </p>
        </div>

        <div className="rounded-[2rem] border border-rose-200 bg-white/90 p-6 shadow-xl shadow-rose-100/70">
          <p className="text-sm uppercase tracking-[0.3em] text-rose-400">Today’s favourites</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Best for birthday boxes",
              "Freshly baked every morning",
              "Cute gift packaging available",
              "Basket opens instantly when you add a treat",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-10">
        <BakeryBrowser />
      </div>
    </main>
  );
}
