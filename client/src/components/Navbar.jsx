import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        🛒 FreshMart
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;