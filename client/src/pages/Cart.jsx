import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, changeQuantity, removeFromCart, clearCart, totalPrice } =
    useCart();

  if (cart.length === 0) {
    return (
      <div>
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="link-btn">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Your cart</h1>

      {cart.map((item) => (
        <div className="cart-row" key={item._id}>
          <div className="cart-info">
            <h3>{item.name}</h3>
            <p>
              ₹{item.price} / {item.unit}
            </p>
          </div>

          <div className="qty">
            <button onClick={() => changeQuantity(item._id, item.quantity - 1)}>
              −
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => changeQuantity(item._id, item.quantity + 1)}>
              +
            </button>
          </div>

          <div className="cart-line">₹{item.price * item.quantity}</div>

          <button
            className="remove-btn"
            onClick={() => removeFromCart(item._id)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="cart-total">
        <h2>Total: ₹{totalPrice}</h2>
        <button className="clear-btn" onClick={clearCart}>
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;