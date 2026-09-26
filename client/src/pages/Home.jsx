import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const categories = [
  { name: "All", icon: "🛒" },
  { name: "Fruits", icon: "🍎" },
  { name: "Vegetables", icon: "🥕" },
  { name: "Dairy", icon: "🥛" },
  { name: "Bakery", icon: "🍞" },
  { name: "Beverages", icon: "🥤" },
  { name: "Snacks", icon: "🍿" },
  { name: "Staples", icon: "🌾" },
];

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Could not load products. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(() => {
    const text = search.toLowerCase().trim();
    let list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(text)
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name")
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, category, search, sort]);

  return (
    <div>

    <section className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-400 text-white px-8 py-10 md:px-12 md:py-14 mb-8 overflow-hidden">
        <div className="max-w-xl text-center md:text-left">
          <span className="inline-block bg-white/20 text-sm px-3 py-1 rounded-full mb-3">
            Fresh • Fast • Affordable
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
            Fresh groceries, delivered to your door
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-5">
            Fruits, vegetables, dairy and daily essentials, all in one place.
            Pay when it arrives.
          </p>
          
            <a href="#shop"
            className="inline-block bg-white text-emerald-700 font-bold px-6 py-3 rounded-full hover:bg-amber-100 transition-colors"
          >
            Shop now
          </a>
        </div>
        <div
          className="grid grid-cols-2 gap-3 text-5xl"
          aria-hidden="true"
        >
          <span className="bg-white/20 rounded-2xl px-5 py-3 text-center">🍎</span>
          <span className="bg-white/20 rounded-2xl px-5 py-3 text-center">🥕</span>
          <span className="bg-white/20 rounded-2xl px-5 py-3 text-center">🥛</span>
          <span className="bg-white/20 rounded-2xl px-5 py-3 text-center">🍞</span>
        </div>
      </section>

            <section id="shop">
        <h2 className="text-2xl font-bold mb-4">Shop by category</h2>
        <div className="flex flex-wrap gap-2 mb-5">
          {categories.map((c) => (
            <button
              key={c.name}
              className={
                category === c.name
                  ? "flex items-center gap-1.5 bg-emerald-600 border border-emerald-600 text-white rounded-full px-4 py-2 text-sm"
                  : "flex items-center gap-1.5 bg-white border border-gray-300 text-gray-700 rounded-full px-4 py-2 text-sm hover:border-emerald-600"
              }
              onClick={() => setCategory(c.name)}
            >
              <span>{c.icon}</span> {c.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-2">
          <input
            className="flex-1 min-w-[200px] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-xl px-3 py-2.5 text-sm bg-white"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort: Newest</option>
            <option value="low">Price: Low to high</option>
            <option value="high">Price: High to low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        {loading && (
          <p className="notice">
            Loading products... the server may take up to a minute to wake up.
          </p>
        )}
        {error && <p className="error">{error}</p>}

                {!loading && !error && (
          <>
            <p className="text-sm text-gray-500 mb-3">{visible.length} products</p>
            {visible.length === 0 ? (
              <p className="text-gray-500">No products match your search.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {visible.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
        <div className="bg-white rounded-xl p-5 text-center shadow-sm">
          <span className="text-3xl">🚚</span>
          <h4 className="font-semibold mt-2 mb-1">Fast delivery</h4>
          <p className="text-sm text-gray-500">Ordered today, delivered same day in most areas.</p>
        </div>
        <div className="bg-white rounded-xl p-5 text-center shadow-sm">
          <span className="text-3xl">💵</span>
          <h4 className="font-semibold mt-2 mb-1">Cash on delivery</h4>
          <p className="text-sm text-gray-500">No card needed. Pay when your order arrives.</p>
        </div>
        <div className="bg-white rounded-xl p-5 text-center shadow-sm">
          <span className="text-3xl">🥦</span>
          <h4 className="font-semibold mt-2 mb-1">Fresh quality</h4>
          <p className="text-sm text-gray-500">Fruits and vegetables sourced fresh every day.</p>
        </div>
        <div className="bg-white rounded-xl p-5 text-center shadow-sm">
          <span className="text-3xl">🔒</span>
          <h4 className="font-semibold mt-2 mb-1">Secure checkout</h4>
          <p className="text-sm text-gray-500">Your account and orders are protected.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;