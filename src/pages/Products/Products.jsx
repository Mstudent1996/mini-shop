import { useState, useEffect } from "react";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import Pagination from "../../components/Pagination/Pagination";
import ProductList from "../../components/ProductList/Productlist";
import styles from "./Products.module.css"

const PRODUCTS_PER_PAGE = 10; // Antal produkter pr. side

export default function Products() {
  const [allProducts, setAllProducts] = useState([]); // State til at gemme alle produkter
  const [filteredProducts, setFilteredProducts] = useState([]); // State til at gemme filtrerede produkter
  const [searchTerm, setSearchTerm] = useState(""); // State til at gemme søgetermer
  const [selectedCategory, setSelectedCategory] = useState(""); // State til at gemme den valgte kategori
  const [sortOption, setSortOption] = useState(""); // State til at gemme den valgte sorteringsmulighed
  const [currentPage, setCurrentPage] = useState(1); // State til at gemme den aktuelle side

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100"); // Henter data fra API
        const data = await res.json();
        setAllProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Error collecting:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...allProducts]; // Kopierer produkter til nyt array

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrerer produkter baseret på søgetermer
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory); // Filtrerer produkter baseret på valgt kategori
    }

    // Sorterings muligheder
    if (sortOption === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "title-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "title-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "rating-asc") {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === "rating-desc") {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    

    // Opdaterer den filtrerede liste og nulstiller den aktuelle side
    setFilteredProducts(filtered);
    setCurrentPage(1); 
  }, [allProducts, searchTerm, selectedCategory, sortOption]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE); // Beregner det totale antal sider
  const indexOfLast = currentPage * PRODUCTS_PER_PAGE; // Beregner indekset for det sidste produkt på den aktuelle side
  const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE; // Beregner indekset for det første produkt på den aktuelle side
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast); // Skaber et nye array med de filtrerede produkter

  const categories = [...new Set(allProducts.map((p) => p.category))]; // Henter unikke kategorier fra alle produkter

  return (
    <div>
      <FilterPanel
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOption={sortOption}
        setSortOption={setSortOption}
        categories={categories}
      />

      <h1>Products</h1>
      <p className={styles.foundProducts}>{filteredProducts.length} products found</p>

      <ProductList products={currentProducts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
