import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Bag, Check } from "@phosphor-icons/react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = useMemo(
    () => products.find((p) => p.id === Number(id)),
    [id]
  );

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="product-not-found">
        <p>Sản phẩm không tồn tại</p>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Về trang chủ
        </button>
      </div>
    );
  }

  const toggleTopping = (topping) => {
    setSelectedToppings((prev) => {
      const exists = prev.find((t) => t.name === topping.name);
      if (exists) {
        return prev.filter((t) => t.name !== topping.name);
      }
      return [...prev, topping];
    });
  };

  const totalPrice = useMemo(() => {
    const base = product.price;
    const sizePrice = selectedSize?.price || 0;
    const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
    return (base + sizePrice + toppingsPrice) * quantity;
  }, [product.price, selectedSize, selectedToppings, quantity]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedToppings, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="product-detail-page">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={24} weight="light" />
      </button>

      {/* Product Image */}
      <div className="product-hero">
        <img
          src={product.image}
          alt={product.name}
          className="product-hero-image"
        />
      </div>

      {/* Product Info */}
      <div className="product-detail-content">
        <div className="product-header">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-desc">{product.description}</p>
          <span className="product-base-price">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="option-section">
            <h3 className="option-title">Chọn size</h3>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size.name}
                  className={`size-btn ${
                    selectedSize?.name === size.name ? "active" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  <span className="size-name">{size.name}</span>
                  {size.price > 0 && (
                    <span className="size-price">
                      +{formatPrice(size.price)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Toppings Selection */}
        {product.toppings && product.toppings.length > 0 && (
          <div className="option-section">
            <h3 className="option-title">Thêm topping</h3>
            <div className="topping-options">
              {product.toppings.map((topping) => {
                const isSelected = selectedToppings.find(
                  (t) => t.name === topping.name
                );
                return (
                  <button
                    key={topping.name}
                    className={`topping-btn ${isSelected ? "active" : ""}`}
                    onClick={() => toggleTopping(topping)}
                  >
                    <span className="topping-check">
                      {isSelected && <Check size={14} weight="bold" />}
                    </span>
                    <span className="topping-name">{topping.name}</span>
                    <span className="topping-price">
                      +{formatPrice(topping.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="option-section">
          <h3 className="option-title">Số lượng</h3>
          <div className="quantity-selector">
            <button
              className="qty-btn"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >
              <Minus size={20} weight="bold" />
            </button>
            <span className="qty-value">{quantity}</span>
            <button
              className="qty-btn"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <Plus size={20} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* Add to Cart Footer */}
      <div className="add-to-cart-footer">
        <div className="total-display">
          <span className="total-label">Tổng cộng</span>
          <span className="total-value">{formatPrice(totalPrice)}</span>
        </div>
        <button
          className={`add-to-cart-btn ${isAdded ? "added" : ""}`}
          onClick={handleAddToCart}
        >
          {isAdded ? (
            <>
              <Check size={20} weight="bold" />
              Đã thêm
            </>
          ) : (
            <>
              <Bag size={20} weight="light" />
              Thêm vào giỏ
            </>
          )}
        </button>
      </div>
    </div>
  );
}
