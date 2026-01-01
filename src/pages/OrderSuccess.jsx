import { useLocation, Link } from "react-router-dom";
import { CheckCircle, House, Gift, Clock, MapPin } from "@phosphor-icons/react";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  const location = useLocation();
  const { total, earnedPoints, usedPoints } = location.state || {
    total: 0,
    earnedPoints: 0,
    usedPoints: 0,
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const orderNumber = `WH${Date.now().toString().slice(-6)}`;

  return (
    <div className="order-success-page">
      <div className="success-content">
        {/* Success Icon */}
        <div className="success-icon-wrapper">
          <div className="success-icon">
            <CheckCircle size={48} weight="fill" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="success-title">Đặt hàng thành công!</h1>
        <p className="success-subtitle">Cảm ơn bạn đã đặt hàng tại WHISK</p>

        {/* Order Card */}
        <div className="order-card">
          <div className="order-number">
            <span className="label">Mã đơn hàng</span>
            <span className="value">{orderNumber}</span>
          </div>

          <div className="order-info-row">
            <Clock size={20} weight="light" />
            <div>
              <span className="info-label">Thời gian lấy</span>
              <span className="info-value">~15 phút (khoảng 22:50)</span>
            </div>
          </div>

          <div className="order-info-row">
            <MapPin size={20} weight="light" />
            <div>
              <span className="info-label">Địa điểm</span>
              <span className="info-value">
                WHISK Matcha Bar - 123 Nguyễn Huệ
              </span>
            </div>
          </div>

          <div className="order-total">
            <span>Tổng thanh toán</span>
            <span className="total-value">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Points Earned */}
        <div className="points-earned-card">
          <div className="points-earned-icon">
            <Gift size={28} weight="light" />
          </div>
          <div className="points-earned-info">
            <span className="points-earned-value">+{earnedPoints} điểm</span>
            <span className="points-earned-label">
              đã được cộng vào tài khoản
            </span>
          </div>
        </div>

        {usedPoints > 0 && (
          <p className="points-used">
            Bạn đã sử dụng {usedPoints.toLocaleString()} điểm cho đơn hàng này
          </p>
        )}

        {/* Actions */}
        <div className="success-actions">
          <Link to="/" className="btn btn-primary btn-lg btn-full">
            <House size={20} weight="light" />
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
