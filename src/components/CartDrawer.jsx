import { X, Minus, Plus, Bag, Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartDrawer.css";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    totalPrice,
    totalItems,
    updateQuantity,
    removeItem,
  } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      <div className="cart-drawer">
        <div className="cart-header">
          <div className="cart-title">
            <Bag size={24} weight="light" />
            <span>Giỏ hàng ({totalItems})</span>
          </div>
          <button className="cart-close" onClick={() => setIsCartOpen(false)}>
            <X size={24} weight="light" />
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <Bag size={56} weight="thin" />
              <p>Giỏ hàng trống</p>
              <span>Thêm sản phẩm để bắt đầu đặt hàng</span>
            </div>
          ) : (
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.cartItemId} className="cart-item">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <h4>{item.product.name}</h4>
                    {item.selectedSize && (
                      <span className="cart-item-size">
                        Size {item.selectedSize.name}
                      </span>
                    )}
                    {item.selectedToppings.length > 0 && (
                      <span className="cart-item-toppings">
                        + {item.selectedToppings.map((t) => t.name).join(", ")}
                      </span>
                    )}
                    <span className="cart-item-price">
                      {formatPrice(item.itemPrice)}
                    </span>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity - 1)
                        }
                        className="quantity-btn"
                      >
                        <Minus size={16} weight="bold" />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.cartItemId, item.quantity + 1)
                        }
                        className="quantity-btn"
                      >
                        <Plus size={16} weight="bold" />
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.cartItemId)}
                    >
                      <Trash size={18} weight="light" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Tổng cộng</span>
              <span className="total-price">{formatPrice(totalPrice)}</span>
            </div>
            <Link
              to="/cart"
              className="btn btn-primary btn-lg btn-full"
              onClick={() => setIsCartOpen(false)}
            >
              Xem giỏ hàng & Thanh toán
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
