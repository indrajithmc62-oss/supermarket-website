import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    api
      .get("/orders/my")
      .then((res) => setOrders(res.data))
      .catch(() => setError("Could not load your orders"))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div>
        <h1>My orders</h1>
        <p>Please log in to see your orders.</p>
        <Link to="/login" className="link-btn">
          Go to login
        </Link>
      </div>
    );
  }

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h1>My orders</h1>

      {orders.length === 0 && <p>You have not placed any orders yet.</p>}

      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-head">
            <span>{new Date(order.createdAt).toLocaleString()}</span>
            <span className={`status status-${order.orderStatus}`}>
              {order.orderStatus}
            </span>
          </div>

          {order.items.map((item, i) => (
            <p className="order-item" key={i}>
              {item.name} × {item.quantity} {item.unit} — ₹
              {item.price * item.quantity}
            </p>
          ))}

          <p className="order-total">Total: ₹{order.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;