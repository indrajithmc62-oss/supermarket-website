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
    <nav className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-700 text-white px-4 py-3 sm:px-8">
      <Link to="/" className="text-xl font-bold whitespace-nowrap">
        🛒 FreshMart
      </Link>
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm sm:text-base">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/cart" className="hover:underline whitespace-nowrap">
          Cart ({totalItems})
        </Link>
        {user ? (
          <>
            <Link to="/orders" className="hover:underline whitespace-nowrap">
              My Orders
            </Link>
            {user.role === "admin" && (
              <Link to="/admin" className="hover:underline">
                Admin
              </Link>
            )}
            <span className="whitespace-nowrap">Hi, {user.name}</span>
            <button
              className="border border-white rounded-lg px-3 py-1 hover:bg-white hover:text-emerald-700 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;