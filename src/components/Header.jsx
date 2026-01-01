import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  House,
  Bag,
  User,
  ShieldCheck,
  SealCheck,
} from "@phosphor-icons/react";
import { useCart } from "../context/CartContext";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]); // Re-check on navigation (e.g. after login)

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

          {user ? (
            <div className="user-nav-group">
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="nav-link admin-link"
                  title="Quản trị"
                >
                  <ShieldCheck size={22} weight="fill" color="#3b82f6" />
                </Link>
              )}
              <Link
                to="/profile"
                className={`nav-link profile-link ${
                  location.pathname === "/profile" ? "active" : ""
                }`}
              >
                <div className="user-avatar-small">
                  {user.name?.charAt(0) || "U"}
                  {user.role === "admin" && (
                    <div className="verified-tick">
                      <SealCheck size={12} weight="fill" color="#3b82f6" />
                    </div>
                  )}
                </div>
                <span className="user-name-header">{user.name}</span>
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className={`nav-link ${
                location.pathname === "/login" ? "active" : ""
              }`}
            >
              <User size={22} weight="light" />
              <span>Đăng nhập</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
