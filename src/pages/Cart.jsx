import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash,
  CreditCard,
  Gift,
  Clock,
  Bag,
} from "@phosphor-icons/react";
import { useCart } from "../context/CartContext";
import { userMock } from "../data/products";
import "./Cart.css";

export default function Cart() {
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity, removeItem, clearCart } =
    useCart();
  const [pickupTime, setPickupTime] = useState("asap");
  const [usePoints, setUsePoints] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const pointsDiscount = usePoints
    ? Math.min(userMock.points * 10, totalPrice * 0.3)
    : 0;
  const earnedPoints = Math.floor((totalPrice - pointsDiscount) / 1000);
  const finalTotal = totalPrice - pointsDiscount;

  const handleCheckout = () => {
    clearCart();
    navigate("/order-success", {
      state: {
        total: finalTotal,
        earnedPoints,
        usedPoints: usePoints ? Math.floor(pointsDiscount / 10) : 0,
      },
    });
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty-full">
          <div className="empty-icon">
            <Bag size={64} weight="thin" />
          </div>
          <h2>Giỏ hàng trống</h2>
          <p>Thêm sản phẩm matcha yêu thích của bạn</p>
          <Link to="/" className="btn btn-primary btn-lg">
            Xem menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Header */}
      <header className="cart-page-header">
        <button className="back-btn-simple" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} weight="light" />
        </button>
        <h1>Giỏ hàng</h1>
        <span className="items-count">{items.length} món</span>
      </header>

      {/* Cart Items */}
      <section className="cart-items-section">
        {items.map((item) => (
          <div key={item.cartItemId} className="cart-item-full">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="cart-item-img"
            />
            <div className="cart-item-details">
              <h4>{item.product.name}</h4>
              <div className="cart-item-options">
                {item.selectedSize && (
                  <span>Size {item.selectedSize.name}</span>
                )}
                {item.selectedToppings.length > 0 && (
                  <span>
                    + {item.selectedToppings.map((t) => t.name).join(", ")}
                  </span>
                )}
              </div>
              <div className="cart-item-bottom">
                <span className="cart-item-unit-price">
                  {formatPrice(item.itemPrice)}
                </span>
                <div className="cart-qty-control">
                  <button
                    onClick={() =>
                      updateQuantity(item.cartItemId, item.quantity - 1)
                    }
                  >
                    <Minus size={16} weight="bold" />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.cartItemId, item.quantity + 1)
                    }
                  >
                    <Plus size={16} weight="bold" />
                  </button>
                </div>
              </div>
            </div>
            <button
              className="remove-item-btn"
              onClick={() => removeItem(item.cartItemId)}
            >
              <Trash size={18} weight="light" />
            </button>
          </div>
        ))}
      </section>

      {/* Pickup Time */}
      <section className="checkout-section">
        <h3>
          <Clock size={18} weight="light" /> Thời gian lấy
        </h3>
        <div className="pickup-options">
          <button
            className={`pickup-option ${pickupTime === "asap" ? "active" : ""}`}
            onClick={() => setPickupTime("asap")}
          >
            <span className="pickup-label">Sớm nhất</span>
            <span className="pickup-time">~15 phút</span>
          </button>
          <button
            className={`pickup-option ${
              pickupTime === "later" ? "active" : ""
            }`}
            onClick={() => setPickupTime("later")}
          >
            <span className="pickup-label">Đặt trước</span>
            <span className="pickup-time">Chọn giờ</span>
          </button>
        </div>
      </section>

      {/* Use Points */}
      <section className="checkout-section">
        <div className="points-toggle">
          <div className="points-toggle-info">
            <Gift size={22} weight="light" className="points-icon" />
            <div>
              <span className="points-toggle-label">Dùng điểm tích lũy</span>
              <span className="points-available">
                {userMock.points.toLocaleString()} điểm khả dụng
              </span>
            </div>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={usePoints}
              onChange={(e) => setUsePoints(e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        {usePoints && (
          <div className="points-discount">
            Giảm {formatPrice(pointsDiscount)} (
            {Math.floor(pointsDiscount / 10)} điểm)
          </div>
        )}
      </section>

      {/* Order Summary */}
      <section className="order-summary">
        <div className="summary-row">
          <span>Tạm tính</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        {usePoints && (
          <div className="summary-row discount">
            <span>Giảm giá điểm</span>
            <span>-{formatPrice(pointsDiscount)}</span>
          </div>
        )}
        <div className="summary-row earn">
          <span>Điểm nhận được</span>
          <span>+{earnedPoints} điểm</span>
        </div>
        <div className="summary-row total">
          <span>Tổng thanh toán</span>
          <span>{formatPrice(finalTotal)}</span>
        </div>
      </section>

      {/* Checkout Button */}
      <div className="checkout-footer">
        <button className="checkout-btn" onClick={handleCheckout}>
          <CreditCard size={20} weight="light" />
          Thanh toán {formatPrice(finalTotal)}
        </button>
      </div>
    </div>
  );
}
