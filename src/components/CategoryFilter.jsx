function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-text-tertiary font-semibold">
          Filter by:
        </span>
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`px-5 py-2 text-sm font-semibold tracking-wide rounded-full transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-md scale-105'
                  : 'bg-white text-text-secondary border-2 border-border hover:border-primary hover:text-primary hover:shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
