import { useState, useMemo } from "react";
import { products, categories, userMock } from "../data/products";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { Medal, Gift } from "@phosphor-icons/react";
import "./Home.css";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="home-page">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div className="welcome-content">
          <div className="welcome-text">
            <p className="welcome-greeting">Xin chào, {userMock.name}!</p>
            <h1 className="welcome-title">Hôm nay bạn muốn uống gì?</h1>
          </div>
          <div className="points-card">
            <div className="points-icon">
              <Gift size={22} weight="light" />
            </div>
            <div className="points-info">
              <span className="points-value">
                {userMock.points.toLocaleString()}
              </span>
              <span className="points-label">điểm</span>
            </div>
          </div>
        </div>

        {/* Tier Progress */}
        <div className="tier-progress">
          <div className="tier-info">
            <span className="tier-badge">
              <Medal size={14} weight="fill" />
              {userMock.tier}
            </span>
            <span className="tier-next">
              Còn {userMock.pointsToNextTier} điểm để lên {userMock.nextTier}
            </span>
          </div>
          <div className="tier-bar">
            <div
              className="tier-bar-fill"
              style={{ width: `${userMock.tierProgress}%` }}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Products Grid */}
      <section className="products-section">
        <div className="section-header">
          <h2>
            {activeCategory === "all"
              ? "Menu Matcha"
              : categories.find((c) => c.id === activeCategory)?.name}
          </h2>
          <span className="product-count">
            {filteredProducts.length} sản phẩm
          </span>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="product-item animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
