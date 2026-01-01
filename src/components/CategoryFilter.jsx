import {
  SquaresFour,
  Star,
  Sparkle,
  IceCream,
  Leaf,
  Cake,
} from "@phosphor-icons/react";
import "./CategoryFilter.css";

const iconMap = {
  Grid3X3: SquaresFour,
  Star: Star,
  Sparkles: Sparkle,
  IceCream: IceCream,
  Leaf: Leaf,
  Cake: Cake,
};

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="category-filter">
      <div className="category-list">
        {categories.map((category) => {
          const Icon = iconMap[category.icon] || SquaresFour;
          return (
            <button
              key={category.id}
              className={`category-btn ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <Icon size={18} weight="light" />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
