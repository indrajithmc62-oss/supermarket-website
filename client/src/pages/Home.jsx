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
      <section className="hero">
        <div className="hero-text">
          <span className="hero-tag">Fresh • Fast • Affordable</span>
          <h1>Fresh groceries, delivered to your door</h1>
          <p>
            Fruits, vegetables, dairy and daily essentials, all in one place.
            Pay when it arrives.
          </p>
          <a href="#shop" className="hero-btn">
            Shop now
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span>🍎</span>
          <span>🥕</span>
          <span>🥛</span>
          <span>🍞</span>
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
    </div>
  );
}

export default Home;