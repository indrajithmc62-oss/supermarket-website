import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  unit: "piece",
};

const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

function Admin() {
  const { user } = useAuth();
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadProducts = () =>
    api.get("/products").then((res) => setProducts(res.data));
  const loadOrders = () =>
    api.get("/orders").then((res) => setOrders(res.data));

  useEffect(() => {
    if (user && user.role === "admin") {
      loadProducts().catch(() => setError("Could not load products"));
      loadOrders().catch(() => setError("Could not load orders"));
    }
  }, [user]);

  if (!user || user.role !== "admin") {
    return (
      <div>
        <h1>Admin</h1>
        <p>This page is for admins only.</p>
        <Link to="/login" className="link-btn">
          Go to login
        </Link>
      </div>
    );
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addProduct = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await api.post("/products", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      setForm(emptyForm);
      setMessage("Product added");
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Could not add product");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    setError("");
    setMessage("");
    try {
      await api.delete(`/products/${id}`);
      setMessage("Product deleted");
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete product");
    }
  };

  const changeStatus = async (id, status) => {
    setError("");
    setMessage("");
    try {
      await api.put(`/orders/${id}/status`, { status });
      setMessage("Order status updated");
      loadOrders();
    } catch (err) {
      setError(err.response?.data?.message || "Could not update status");
    }
  };

  return (
    <div>
      <h1>Admin dashboard</h1>

      <div className="tabs">
        <button
          className={tab === "products" ? "tab active" : "tab"}
          onClick={() => setTab("products")}
        >
          Products
        </button>
        <button
          className={tab === "orders" ? "tab active" : "tab"}
          onClick={() => setTab("orders")}
        >
          Orders
        </button>
      </div>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      {tab === "products" && (
        <div>
          <form className="admin-form" onSubmit={addProduct}>
            <h3>Add a product</h3>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
            <input name="price" type="number" min="0" placeholder="Price" value={form.price} onChange={handleChange} required />
            <input name="category" placeholder="Category (e.g. Fruits)" value={form.category} onChange={handleChange} required />
            <input name="stock" type="number" min="0" placeholder="Stock" value={form.stock} onChange={handleChange} required />
            <input name="unit" placeholder="Unit (kg, litre, pack, piece)" value={form.unit} onChange={handleChange} />
            <button type="submit" className="add-btn">Add product</button>
          </form>

          <h3>All products ({products.length})</h3>
          {products.map((p) => (
            <div className="cart-row" key={p._id}>
              <div className="cart-info">
                <h3>{p.name}</h3>
                <p>
                  {p.category} · ₹{p.price} / {p.unit} · stock {p.stock}
                </p>
              </div>
              <button className="remove-btn" onClick={() => deleteProduct(p._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "orders" && (
        <div>
          <h3>All orders ({orders.length})</h3>
          {orders.map((o) => (
            <div className="order-card" key={o._id}>
              <div className="order-head">
                <span>
                  {o.user ? `${o.user.name} (${o.user.email})` : "Deleted user"} ·{" "}
                  {new Date(o.createdAt).toLocaleString()}
                </span>
                <select
                  value={o.orderStatus}
                  onChange={(e) => changeStatus(o._id, e.target.value)}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              {o.items.map((item, i) => (
                <p className="order-item" key={i}>
                  {item.name} × {item.quantity} {item.unit} — ₹
                  {item.price * item.quantity}
                </p>
              ))}
              <p className="order-total">Total: ₹{o.totalPrice}</p>
              <p className="order-item">
                Deliver to: {o.shippingAddress.fullName}, {o.shippingAddress.address},{" "}
                {o.shippingAddress.city} {o.shippingAddress.postalCode} · Phone{" "}
                {o.shippingAddress.phone}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;