function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h3>🛒 FreshMart</h3>
          <p>Fresh groceries delivered to your door. Pay on delivery.</p>
        </div>
        <div>
          <h4>Quick links</h4>
          <p>Home · Cart · My Orders</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>support@freshmart.example</p>
          <p>Mon–Sat, 9am–7pm</p>
        </div>
      </div>
      <p className="footer-bottom">
        © {new Date().getFullYear()} FreshMart. Built for a CodeAlpha internship project.
      </p>
    </footer>
  );
}

export default Footer;