import { useState } from "react";
import { useCart } from "../context/CartContext";

const icons = {
  Fruits: "🍎",
  Vegetables: "🥕",
  Dairy: "🥛",
  Bakery: "🍞",
  Beverages: "🥤",
  Snacks: "🍿",
  Staples: "🌾",
};

const bands = {
  Fruits: "#ffe1e1",
  Vegetables: "#e2f7d8",
  Dairy: "#e3f0ff",
  Bakery: "#fff2d6",
  Beverages: "#e6e0ff",
  Snacks: "#ffe9c7",
  Staples: "#f0e8d8",
};

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="product-card">
      <div
        className="product-band"
        style={{ background: bands[product.category] || "#eee" }}
      >
        <span className="product-icon">{icons[product.category] || "🛍️"}</span>
        {lowStock && <span className="badge badge-low">Only {product.stock} left</span>}
        {product.stock === 0 && <span className="badge badge-out">Out of stock</span>}
      </div>

      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <p className="product-price">
          ₹{product.price} <span>/ {product.unit}</span>
        </p>
        <button
          className={justAdded ? "add-btn added" : "add-btn"}
          disabled={product.stock === 0}
          onClick={handleAdd}
        >
          {product.stock === 0 ? "Out of stock" : justAdded ? "Added ✓" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;