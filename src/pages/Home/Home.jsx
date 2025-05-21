import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        const sorted = data.products.sort((a, b) => b.rating - a.rating);
        const topRated = sorted.slice(0, 6);
        setTopProducts(topRated);
      } catch (error) {
        console.error("Fejl ved hentning af data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to Haven Boutique</h1>
      <h2>Please enjoy this selection of products</h2>
      <ul className={styles.topProducts}>
        {topProducts.map((product) => (
          <li key={product.id} className={styles.productCard}>
            <Link to={`/products/${product.id}`} className={styles.productLink}>
              <h3>{product.title}</h3>
              <img
                src={product.thumbnail}
                alt={product.title}
                className={styles.productImg}
              />
              <p>Rating: {product.rating}</p>
              <p>Price: {product.price}</p>
            </Link>
            
            {product.reviews &&
              product.reviews.filter((r) => r.rating >= 4).length > 0 && (
                <div className={styles.reviews}>
                  {product.reviews
                    .filter((review) => review.rating >= 4)
                    .map((review, index) => (
                      <li key={index} className={styles.reviewItem}>
                        <strong>{review.reviewerName}</strong>
                        <p>
                          "{review.comment}" ★{review.rating}
                        </p>
                      </li>
                    ))}
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}
