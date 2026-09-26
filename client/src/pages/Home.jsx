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
        <h2 className="section-title">Shop by category</h2>
        <div className="chips">
          {categories.map((c) => (
            <button
              key={c.name}
              className={category === c.name ? "chip active" : "chip"}
              onClick={() => setCategory(c.name)}
            >
              <span>{c.icon}</span> {c.name}
            </button>
          ))}
        </div>

        <div className="toolbar">
          <input
            className="search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
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
            <p className="result-count">{visible.length} products</p>
            {visible.length === 0 ? (
              <p className="notice">No products match your search.</p>
            ) : (
              <div className="product-grid">
                {visible.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
      
      <section className="perks">
        <div className="perk">
          <span>🚚</span>
          <h4>Fast delivery</h4>
          <p>Ordered today, delivered same day in most areas.</p>
        </div>
        <div className="perk">
          <span>💵</span>
          <h4>Cash on delivery</h4>
          <p>No card needed. Pay when your order arrives.</p>
        </div>
        <div className="perk">
          <span>🥦</span>
          <h4>Fresh quality</h4>
          <p>Fruits and vegetables sourced fresh every day.</p>
        </div>
        <div className="perk">
          <span>🔒</span>
          <h4>Secure checkout</h4>
          <p>Your account and orders are protected.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;