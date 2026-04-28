export type BakeryProduct = {
  id: number;
  name: string;
  category: "Cakes" | "Pastries" | "Cupcakes" | "Bread" | "Drinks";
  price: number;
  rating: number;
  stock: number;
  description: string;
  details: string[];
  image: string;
  accent: string;
  featured: boolean;
};

export const bakeryProducts: BakeryProduct[] = [
  {
    id: 1,
    name: "Strawberry Cloud Cake",
    category: "Cakes",
    price: 28,
    rating: 4.9,
    stock: 8,
    description: "A soft vanilla sponge with strawberry cream and fluffy frosting.",
    details: ["Serves 6", "Made fresh daily", "Best seller"],
    image: "/images/strawberry-cloud.svg",
    accent: "from-rose-300 via-pink-300 to-fuchsia-300",
    featured: true,
  },
  {
    id: 2,
    name: "Honey Butter Croissant",
    category: "Pastries",
    price: 4,
    rating: 4.8,
    stock: 24,
    description: "Buttery layers with a golden glaze and gentle honey sweetness.",
    details: ["Crispy edges", "Freshly baked", "Perfect with tea"],
    image: "/images/honey-croissant.svg",
    accent: "from-amber-200 via-orange-200 to-rose-200",
    featured: true,
  },
  {
    id: 3,
    name: "Blueberry Sky Cupcakes",
    category: "Cupcakes",
    price: 12,
    rating: 4.9,
    stock: 18,
    description: "Tiny cake clouds topped with blueberry buttercream and sprinkles.",
    details: ["Box of 6", "Cute gift option", "Crowd favourite"],
    image: "/images/blueberry-cupcake.svg",
    accent: "from-sky-300 via-cyan-300 to-indigo-300",
    featured: true,
  },
  {
    id: 4,
    name: "Cinnamon Swirl Loaf",
    category: "Bread",
    price: 9,
    rating: 4.7,
    stock: 16,
    description: "A cosy loaf with cinnamon ribbons and a sugar-kissed crust.",
    details: ["Slice at home", "Warm and fragrant", "Weekend treat"],
    image: "/images/cinnamon-loaf.svg",
    accent: "from-amber-300 via-rose-200 to-orange-200",
    featured: false,
  },
  {
    id: 5,
    name: "Peach Tea Latte",
    category: "Drinks",
    price: 5,
    rating: 4.6,
    stock: 30,
    description: "A chilled peach tea latte with a creamy finish and soft aroma.",
    details: ["Iced or hot", "Pairs with cake", "Limited seasonal cup"],
    image: "/images/peach-latte.svg",
    accent: "from-pink-200 via-amber-100 to-orange-200",
    featured: false,
  },
  {
    id: 6,
    name: "Raspberry Tartlets",
    category: "Pastries",
    price: 11,
    rating: 4.7,
    stock: 14,
    description: "Mini tartlets with vanilla custard and bright raspberry topping.",
    details: ["Box of 4", "Gift-ready", "Sweet and tart"],
    image: "/images/raspberry-tartlets.svg",
    accent: "from-rose-200 via-pink-200 to-fuchsia-200",
    featured: false,
  },
];

export const categories = ["All", "Cakes", "Pastries", "Cupcakes", "Bread", "Drinks"] as const;

export type Category = (typeof categories)[number];

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Top rated",
};

export const money = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
