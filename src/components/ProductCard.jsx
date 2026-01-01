import { Link } from "react-router-dom";
import { Plus, Star, Sparkle } from "@phosphor-icons/react";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card card card-hover"
    >
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {product.isPopular && (
          <span className="product-badge popular">
            <Star size={12} weight="fill" />
            Hot
          </span>
        )}
        {product.isNew && (
          <span className="product-badge new">
            <Sparkle size={12} weight="fill" />
            Mới
          </span>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button className="product-add-btn">
            <Plus size={20} weight="bold" />
          </button>
        </div>
      </div>
    </Link>
  );
}
