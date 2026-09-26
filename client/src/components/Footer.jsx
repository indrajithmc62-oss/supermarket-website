import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 mt-12 px-4 sm:px-8 pt-9 pb-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <Link to="/" className="text-white font-bold mb-2 inline-block hover:underline">
            🛒 FreshMart
          </Link>
          <p className="text-sm">Fresh groceries delivered to your door. Pay on delivery.</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Quick links</h4>
          <ul className="text-sm space-y-1">
            <li>
              <Link to="/" className="hover:underline hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:underline hover:text-white">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:underline hover:text-white">
                My Orders
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <p className="text-sm">
            
              <a href="mailto:support@freshmart.example"
              className="hover:underline hover:text-white"
            >
              support@freshmart.example
            </a>
          </p>
          <p className="text-sm">Mon–Sat, 9am–7pm</p>
        </div>
      </div>
      <p className="text-center text-sm text-emerald-300 border-t border-white/10 mt-6 pt-3.5">
        © {new Date().getFullYear()} FreshMart. Built for a CodeAlpha internship project.
      </p>
    </footer>
  );
}

export default Footer;