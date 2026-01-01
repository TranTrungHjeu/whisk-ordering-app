import "./CategoryFilter.css";

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="category-filter">
      <div className="category-list">
        {categories.map((category) => {
          return (
            <button
              key={category.id}
              className={`category-btn ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <img src={category.icon} alt="" className="category-icon-img" />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
