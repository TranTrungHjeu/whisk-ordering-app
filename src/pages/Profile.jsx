import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Medal,
  Gift,
  ClockCounterClockwise,
  CaretRight,
  Gear,
  SignOut,
  Star,
  TrendUp,
} from "@phosphor-icons/react";
import { rewards, orderHistory } from "../data/products";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      // Redirect to login if not logged in
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  return (
    <div className="profile-page">
      {!user ? (
        <div className="loading-screen">Đang tải...</div>
      ) : (
        <>
          {/* User Header */}
          <header className="profile-header">
            <div className="user-avatar">{user.name?.charAt(0) || "U"}</div>
            <div className="user-info">
              <h1 className="user-name">{user.name}</h1>
              <p className="user-phone">{user.phone}</p>
            </div>
            <button
              onClick={handleLogout}
              className="settings-btn logout-btn"
              title="Đăng xuất"
            >
              <SignOut size={24} weight="light" />
            </button>
          </header>

          {/* Loyalty Card */}
          {/* Loyalty Card */}
          <section className="loyalty-card">
            <div className="loyalty-background"></div>
            <div className="loyalty-content">
              <div className="loyalty-top">
                <div className="loyalty-tier">
                  <span className="tier-icon">
                    <Medal size={22} weight="fill" />
                  </span>
                  <span className="tier-name">
                    {user.tier || "Silver"} Member
                  </span>
                </div>
                <span className="member-since">
                  Từ{" "}
                  {user.member_since
                    ? formatDate(user.member_since)
                    : new Date().getFullYear()}
                </span>
              </div>

              <div className="loyalty-points">
                <div className="points-main">
                  <Gift size={32} weight="light" />
                  <span className="points-number">
                    {user.points?.toLocaleString() || 0}
                  </span>
                  <span className="points-text">điểm</span>
                </div>
              </div>

              <div className="loyalty-progress">
                <div className="progress-info">
                  <span>
                    Còn {user.points_to_next_tier || 500} điểm để lên{" "}
                    {user.next_tier || "Gold"}
                  </span>
                  <span>{user.tier_progress || 0}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${user.tier_progress || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="stats-row">
            <div className="stat-card">
              <TrendUp size={22} weight="light" />
              <span className="stat-value">{user.total_orders || 0}</span>
              <span className="stat-label">Đơn hàng</span>
            </div>
            <div className="stat-card">
              <Star size={22} weight="light" />
              <span className="stat-value">{user.tier || "Silver"}</span>
              <span className="stat-label">Hạng thành viên</span>
            </div>
          </section>

          {/* Rewards */}
          <section className="profile-section">
            <div className="section-header">
              <h2>
                <Gift size={20} weight="light" /> Đổi quà
              </h2>
              <Link to="#" className="see-all">
                Xem tất cả <CaretRight size={16} weight="bold" />
              </Link>
            </div>
            <div className="rewards-scroll">
              {rewards.map((reward) => (
                <div key={reward.id} className="reward-card">
                  <div className="reward-icon">
                    <Gift size={28} weight="light" />
                  </div>
                  <h4 className="reward-name">{reward.name}</h4>
                  <p className="reward-desc">{reward.description}</p>
                  <div className="reward-cost">
                    <Gift size={14} weight="fill" />
                    {reward.pointsRequired}
                  </div>
                  <button
                    className="reward-btn"
                    disabled={(user.points || 0) < reward.pointsRequired}
                  >
                    Đổi
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Order History */}
          <section className="profile-section">
            <div className="section-header">
              <h2>
                <ClockCounterClockwise size={20} weight="light" /> Lịch sử đơn
                hàng
              </h2>
              <Link to="#" className="see-all">
                Xem tất cả <CaretRight size={16} weight="bold" />
              </Link>
            </div>
            <div className="order-history-list">
              {orderHistory.map((order) => (
                <div key={order.id} className="order-history-item">
                  <div className="order-date">{formatDate(order.date)}</div>
                  <div className="order-details">
                    <span className="order-id">#{order.id}</span>
                    <span className="order-items-preview">
                      {order.items
                        .map((item) => `${item.quantity}x ${item.name}`)
                        .join(", ")}
                    </span>
                  </div>
                  <div className="order-meta">
                    <span className="order-total-small">
                      {formatPrice(order.total)}
                    </span>
                    <span className="order-points">
                      +{order.pointsEarned} điểm
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Menu Actions */}
          <section className="profile-menu">
            <Link to="#" className="menu-item">
              <Gear size={22} weight="light" />
              <span>Cài đặt</span>
              <CaretRight size={18} weight="bold" />
            </Link>
            <button className="menu-item logout">
              <SignOut size={22} weight="light" />
              <span>Đăng xuất</span>
              <CaretRight size={18} weight="bold" />
            </button>
          </section>
        </>
      )}
    </div>
  );
}
