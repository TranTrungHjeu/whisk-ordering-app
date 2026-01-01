import { useState, useEffect } from "react";
import {
  Users,
  ShoppingCart,
  TrendUp,
  SignOut,
  CaretRight,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("overview"); // overview, users, orders
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [usersData, ordersData] = await Promise.all([
          api.getUsers(currentUser.id),
          api.getAllOrders(currentUser.id),
        ]);
        setUsers(usersData);
        setOrders(ordersData);
      } catch (err) {
        console.error("Failed to fetch admin data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN").format(price) + "đ";
  const formatDate = (date) => new Date(date).toLocaleDateString("vi-VN");

  if (loading)
    return <div className="admin-loading">Đang tải dữ liệu quản trị...</div>;

  return (
    <div className="admin-layout">
      {/* Sidebar (Desktop) / Bottom Nav (Mobile) */}
      <nav className="admin-navigation">
        <div className="admin-logo-desktop">WHISK Admin</div>

        <button
          className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <TrendUp
            size={24}
            weight={activeTab === "overview" ? "fill" : "regular"}
          />
          <span>Tổng quan</span>
        </button>

        <button
          className={`nav-item ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          <Users
            size={24}
            weight={activeTab === "users" ? "fill" : "regular"}
          />
          <span>Thành viên</span>
        </button>

        <button
          className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <ShoppingCart
            size={24}
            weight={activeTab === "orders" ? "fill" : "regular"}
          />
          <span>Đơn hàng</span>
        </button>

        <button className="nav-item logout-desktop" onClick={handleLogout}>
          <SignOut size={24} />
          <span>Đăng xuất</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="admin-content">
        <header className="admin-topbar">
          <h2 className="page-title">
            {activeTab === "overview" && "Dashboard"}
            {activeTab === "users" && "Thành viên"}
            {activeTab === "orders" && "Đơn hàng"}
          </h2>
          <div className="admin-actions">
            <div className="admin-profile">
              <span>{currentUser.name}</span>
            </div>
            <button className="logout-mobile" onClick={handleLogout}>
              <SignOut size={24} color="#ef4444" />
            </button>
          </div>
        </header>

        <div className="admin-body">
          {activeTab === "overview" && (
            <div className="stats-grid">
              <div className="stat-card blue">
                <div className="stat-icon">
                  <Users size={32} />
                </div>
                <div>
                  <h3>Thành viên</h3>
                  <div className="stat-number">{users.length}</div>
                </div>
              </div>
              <div className="stat-card green">
                <div className="stat-icon">
                  <ShoppingCart size={32} />
                </div>
                <div>
                  <h3>Đơn hàng</h3>
                  <div className="stat-number">{orders.length}</div>
                </div>
              </div>
              <div className="stat-card gold">
                <div className="stat-icon">
                  <TrendUp size={32} />
                </div>
                <div>
                  <h3>Doanh thu</h3>
                  <div className="stat-number">
                    {formatPrice(
                      orders.reduce(
                        (sum, o) => sum + parseInt(o.total_amount),
                        0
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="card-list">
              {users.map((user) => (
                <div className="data-card" key={user.id}>
                  <div className="card-header">
                    <div className="user-info">
                      <strong>{user.name}</strong>
                      <div className="sub-text">{user.phone}</div>
                    </div>
                    <span
                      className={`badge badge-${
                        user.tier?.toLowerCase() || "silver"
                      }`}
                    >
                      {user.tier || "Silver"}
                    </span>
                  </div>
                  <div className="card-footer">
                    <div className="card-stat">
                      <span>Điểm</span>
                      <strong>{user.points?.toLocaleString()}</strong>
                    </div>
                    <div className="card-stat">
                      <span>Ngày tham gia</span>
                      <strong>
                        {formatDate(user.member_since || Date.now())}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "orders" && (
            <div className="card-list">
              {orders.map((order) => (
                <div className="data-card" key={order.id}>
                  <div className="card-header">
                    <div>
                      <strong className="order-id">#{order.id}</strong>
                      <div className="sub-text">
                        {formatDate(order.created_at)}
                      </div>
                    </div>
                    <span className={`status-badge ${order.status}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="user-row">
                      <Users size={16} />
                      <span>
                        {order.user_name || "Khách lẻ"} ({order.user_phone})
                      </span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <span>Tổng tiền</span>
                    <strong className="price-text">
                      {formatPrice(order.total_amount)}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
