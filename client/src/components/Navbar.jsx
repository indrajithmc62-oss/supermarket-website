import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        🛒 FreshMart
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
        {user ? (
          <>
                      <Link to="/orders">My Orders</Link>
                                  {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <span className="nav-user">Hi, {user.name}</span>
            <button className="nav-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;