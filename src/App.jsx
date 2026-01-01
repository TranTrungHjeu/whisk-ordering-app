import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

import { useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="app">
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <CartDrawer />}
      <main className={`app-content ${isAdminRoute ? "no-padding" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
