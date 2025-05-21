import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";

export default function ProductList({ products }) {
  const [favorites, setFavorites] = useState([]);

  // Henter favoritter fra localstorage 
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  // Gemmer favoritter i localstorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Tjekker om produktet er i favoritter og tilføjer eller fjerner det
  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, { id: product.id, title: product.title }];
      }
    });
  };

  return (
    <ul className={styles.productList}>
      {products.map((product) => {
        const isFavorite = favorites.some((item) => item.id === product.id); // Tjekker om produktet er i favoritter

        return (
          <li key={product.id} className={styles.productItem}>
            <Link to={`/products/${product.id}`}>
            <h3>{product.title}</h3>
              <img
                src={product.thumbnail}
                alt={product.title}
                className={styles.productImage}
              />
              <p>{product.description}</p>
            </Link>

            <div className={styles.cardFooter}>
              <p>${product.price}</p>
              <p>★ {product.rating}</p>
              <button
                onClick={() => toggleFavorite(product)}
                className={styles.favBtn}
                title="Tilføj til favoritter"
              >
                {isFavorite ? "❤️" : "🖤"}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
