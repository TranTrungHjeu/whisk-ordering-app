import { Link, useLocation } from "react-router-dom";
import { House, Bag, User } from "@phosphor-icons/react";
import { useCart } from "../context/CartContext";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-text">WHISK</span>
          <span className="logo-tagline">Matcha Bar</span>
        </Link>

        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            <House size={22} weight="light" />
            <span>Menu</span>
          </Link>

          <button
            className="nav-link cart-btn"
            onClick={() => setIsCartOpen(true)}
          >
            <Bag size={22} weight="light" />
            <span>Giỏ hàng</span>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>

          <Link
            to="/profile"
            className={`nav-link ${
              location.pathname === "/profile" ? "active" : ""
            }`}
          >
            <User size={22} weight="light" />
            <span>Tài khoản</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
