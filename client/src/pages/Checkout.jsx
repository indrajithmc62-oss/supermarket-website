import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState({
    fullName: user ? user.name : "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/orders", {
        items: cart.map((i) => ({ product: i._id, quantity: i.quantity })),
        shippingAddress: form,
        paymentMethod: "cash_on_delivery",
      });
      setPlacedOrder(res.data);
      clearCart();
    } catch (err) {
      setError(err.response?.data?.message || "Could not place the order");
    } finally {
      setLoading(false);
    }
  };

  if (placedOrder) {
    return (
      <div className="auth-box">
        <h1>Order placed 🎉</h1>
        <p>Thank you! Your order total is ₹{placedOrder.totalPrice}.</p>
        <p>Payment: cash on delivery.</p>
        <Link to="/" className="link-btn">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h1>Checkout</h1>
        <p>Please log in to place your order.</p>
        <Link to="/login" className="link-btn">
          Go to login
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="link-btn">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="auth-box">
      <h1>Checkout</h1>
      <p>
        {cart.length} item(s), total <strong>₹{totalPrice}</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Full name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <input
          name="postalCode"
          placeholder="Postal code"
          value={form.postalCode}
          onChange={handleChange}
          required
        />

        <p className="switch-text">Payment: cash on delivery</p>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="add-btn" disabled={loading}>
          {loading ? "Placing order..." : "Place order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;