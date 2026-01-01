import { useState, useMemo, useEffect } from "react";
import { userMock } from "../data/products"; // Keep user mock for now
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { Medal, Gift } from "@phosphor-icons/react";
import { api } from "../services/api";
import { icons } from "../assets/icons";
import "./Home.css";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
        ]);

        // Map category icons from string key to actual import
        const mappedCategories = categoriesData.map((c) => ({
          ...c,
          icon: icons[c.icon] || icons.coffeeMenu, // Fallback
        }));

        // Prepend "All" category if not present
        // Note: DB categories don't include "All" usually, it's a UI concept
        // But my seed script inserted "Tất cả" with icon 'coffeeMenu'.
        // Let's check if it exists in DB.
        // If seeded, it has an ID.

        // Wait, if "All" is in DB, logic is simpler.
        // Seed script: { id: 'all', name: 'Tất cả', icon: 'coffeeMenu' } -> DB ID: 7
        // So clicking "Tất cả" sets activeCategory to 7.
        // But filtering logic needs to know 7 means "show all".
        // Better to handle "All" on frontend as a virtual category usually.
        // But if it is in DB, we can use it.
        // However, standard "All" filter logic is "if id == all_id then return items".
        // But products array doesn't list "all_id" in their category list.
        // It's easier to filter "All" out of the DB categories list used for filtering
        // and manually add a "All" option that sets activeCategory to "all".

        // Let's assume we filter out "Tất cả" from DB (if it exists) and add our own virtual one
        // OR standard practice: "All" is just null or "all" string.

        const realCategories = mappedCategories.filter(
          (c) => c.name !== "Tất cả"
        ); // Filter out seeded "All" if it confuses logic

        const uiCategories = [
          { id: "all", name: "Tất cả", icon: icons.coffeeMenu },
          ...realCategories,
        ];

        setCategories(uiCategories);
        setProducts(productsData);
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    // activeCategory is now an INTEGER (from DB)
    // product.categoryId is an INTEGER (from DB)
    return products.filter((p) => p.categoryId === activeCategory);
  }, [activeCategory, products]);

  if (loading) return <div className="loading-screen">Đang tải...</div>;

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
