import Image from "next/image";
import Link from "next/link";

const visitCards = [
  {
    title: "Opening hours",
    copy: "Monday to Saturday · 8:00am–5:30pm",
  },
  {
    title: "Location",
    copy: "12 Rose Lane, Norwich, NR2 4AA",
  },
  {
    title: "Pre-orders",
    copy: "Order birthday cakes and weekend boxes by phone or email.",
  },
];

export default function VisitPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">Visit</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-rose-950 sm:text-5xl">
            Pop in for coffee, a warm pastry, and a pastel box of treats.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-rose-600 sm:text-lg">
            We designed this page like a friendly bakery counter: clear hours, easy contact details, and
            reassuring information that helps people feel ready to visit or pre-order.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="rounded-full bg-gradient-to-r from-rose-300 to-pink-300 px-6 py-3 font-semibold text-rose-950 transition hover:scale-[1.02]"
            >
              Browse the menu
            </Link>
            <a
              href="mailto:hello@sugarandswirl.co.uk"
              className="rounded-full border border-rose-200 bg-white px-6 py-3 font-semibold text-rose-600 transition hover:bg-rose-50"
            >
              Email us
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-rose-200 bg-white/90 p-4 shadow-xl shadow-rose-100/70">
          <img
            src="https://images.unsplash.com/photo-1583338917451-face2751d8d5?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Cozy bakery interior with coffee and pastries"
            className="h-auto w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {visitCards.map((item) => (
          <article key={item.title} className="rounded-[1.75rem] border border-rose-200 bg-white/90 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-rose-950">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-rose-600">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-[1.75rem] border border-rose-200 bg-rose-50 p-6 text-sm leading-7 text-rose-700 shadow-sm">
        <p className="font-semibold text-rose-950">Why people come back</p>
        <p className="mt-2">
          The bakery keeps the experience simple and welcoming: the menu is easy to browse, the design
          feels soft and cozy, and the product pages focus on freshness, flavour, and gifting appeal.
        </p>
      </section>
    </main>
  );
}
