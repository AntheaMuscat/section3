import Image from "next/image";
import Link from "next/link";
import { bakeryProducts } from "@/lib/bakery";

export default function HomePage() {
  const featured = bakeryProducts.filter((product) => product.featured);

  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div className="space-y-8">
          <span className="inline-flex rounded-full border border-rose-200 bg-white px-4 py-2 text-sm text-rose-500 shadow-sm">
            Fresh bakes, pastel packaging, and cosy smiles
          </span>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-rose-950 sm:text-5xl lg:text-6xl">
              Sugar & Swirl Bakery makes every treat feel like a tiny celebration.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-rose-600 sm:text-lg">
              This three-page bakery site uses cute illustrations, soft colours, and simple navigation to
              help people browse cakes, pastries, and drinks with a smile.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="rounded-full bg-gradient-to-r from-rose-300 to-pink-300 px-6 py-3 font-semibold text-rose-950 transition hover:scale-[1.02]"
            >
              View the menu
            </Link>
            <Link
              href="/visit"
              className="rounded-full border border-rose-200 bg-white px-6 py-3 font-semibold text-rose-600 transition hover:bg-rose-50"
            >
              Visit our bakery
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Made daily", "All of our bakes are prepared fresh each morning"],
              ["Gift-ready", "Cute packaging for birthdays and little celebrations"],
              ["Local delivery", "Fast delivery for nearby orders and pre-orders"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-rose-200 bg-white p-5 shadow-sm">
                <p className="text-2xl font-black text-rose-950">{value}</p>
                <p className="mt-2 text-sm leading-6 text-rose-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-rose-200 bg-white/90 p-4 shadow-xl shadow-rose-100/70">
          <Image
            src="/images/bakery-hero.svg"
            alt="Cute bakery storefront with pastel sweets"
            width={1200}
            height={900}
            className="h-auto w-full rounded-[1.5rem]"
            priority
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">Featured treats</p>
            <h2 className="mt-2 text-3xl font-bold text-rose-950">Our sweetest best sellers</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-rose-500">
            These picks show off the bakery style: soft colours, rounded cards, and appetising dessert
            photos that feel friendly and easy to browse.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featured.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-[1.75rem] border border-rose-200 bg-white shadow-xl shadow-rose-100/70">
              <div className={`bg-gradient-to-br ${product.accent} p-4`}>
                <div className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/70 shadow-sm">
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
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-rose-400">{product.category}</p>
                    <h3 className="mt-1 text-xl font-bold text-rose-950">{product.name}</h3>
                  </div>
                  <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-500">
                    ★ {product.rating}
                  </span>
                </div>
                <p className="text-sm leading-6 text-rose-500">{product.description}</p>
                <div className="flex flex-wrap gap-2">
                  {product.details.map((detail) => (
                    <span key={detail} className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs text-rose-600">
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-20 sm:px-6 md:grid-cols-3 lg:px-8">
        {[
          {
            title: "Cute and clear",
            copy: "Soft colours, rounded corners, and friendly copy make the bakery feel welcoming.",
          },
          {
            title: "Easy to navigate",
            copy: "The home, menu, and visit pages create a simple three-step journey for customers.",
          },
          {
            title: "Built for sharing",
            copy: "The visuals and card layout make the site presentation-friendly and memorable.",
          },
        ].map((item) => (
          <article key={item.title} className="rounded-[1.75rem] border border-rose-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-rose-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-rose-500">{item.copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
