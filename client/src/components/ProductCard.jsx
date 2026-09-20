const icons = {
  Fruits: "🍎",
  Vegetables: "🥕",
  Dairy: "🥛",
  Bakery: "🍞",
  Beverages: "🥤",
  Snacks: "🍿",
  Staples: "🌾",
};

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-icon">{icons[product.category] || "🛍️"}</div>
      <h3>{product.name}</h3>
      <p className="product-desc">{product.description}</p>
      <p className="product-price">
        ₹{product.price} <span>/ {product.unit}</span>
      </p>
      <button className="add-btn" disabled={product.stock === 0}>
        {product.stock === 0 ? "Out of stock" : "Add to cart"}
      </button>
    </div>
  );
}

export default ProductCard;