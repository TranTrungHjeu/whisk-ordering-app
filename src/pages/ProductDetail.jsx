import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Bag, Check } from "@phosphor-icons/react";
import { useCart } from "../context/CartContext";
import { api } from "../services/api";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProductById(id);
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (err) {
        console.error("Failed to load product", err);
        setError("Không thể tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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
    if (!product) return 0;
    const base = product.price;
    const sizePrice = selectedSize?.price || 0;
    const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
    return (base + sizePrice + toppingsPrice) * quantity;
  }, [product, selectedSize, selectedToppings, quantity]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, selectedSize, selectedToppings, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (loading) return <div className="loading-screen">Đang tải...</div>;

  if (error || !product) {
    return (
      <div className="product-not-found">
        <p>{error || "Sản phẩm không tồn tại"}</p>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Về trang chủ
        </button>
      </div>
    );
  }

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
