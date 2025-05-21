import styles from "./FilterPanel.module.css";

// Funktion til at filtrere produkter
export default function FilterPanel({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
  categories,
}) {

  //Håndterer søgningen
  return (
    <div className={styles.filterPanel}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        className={styles.searchBar}
      />

      {/* Håndterer kategorier */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className={styles.categories}
      >
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Håndterer sorteringer */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className={styles.sorting}
      >
        <option value="">No sorting</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="title-asc">Name: A → Z</option>
        <option value="title-desc">Name: Z → A</option>
        <option value="rating-asc">Rating: Low → High</option>
        <option value="rating-desc">Rating: High → Low</option>
      </select>
    </div>
  );
}
