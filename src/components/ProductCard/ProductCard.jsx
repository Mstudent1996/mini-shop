import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product: propProduct }) {
  const { id } = useParams();
  const [product, setProduct] = useState(propProduct || null);
  const [favorites, setFavorites] = useState([]);

  // Henter ét produkt fra API, hvis ikke allerede givet
  useEffect(() => {
    if (!propProduct && id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`https://dummyjson.com/products/${id}`);
          const data = await res.json();
          setProduct(data);
        } catch (error) {
          console.error("Fejl ved hentning af produkt:", error);
        }
      };
      fetchProduct();
    }
  }, [id, propProduct]);

  // Hent favoritter fra localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  // Gem favoritter i localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Tjekker om produktet er favorit
  const isFavorite = favorites.some((item) => item.id === product?.id);

  // Tilføjer eller fjerner favorit
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

  if (!product) return <p>Loading product...</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <div className={styles.productCard}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.singleImg}
        />
        <div className={styles.productDetails}>
          <p>{product.description}</p>
          <p>Brand: {product.brand}</p>
          <p>Price: ${product.price}</p>
          <p>Stock status: {product.availabilityStatus}</p>
          <p>Warranty: {product.warrantyInformation}</p>
          <p>Shipping: {product.shippingInformation}</p>

          <button
            onClick={() => toggleFavorite(product)}
            className={styles.favBtn}
            title="Tilføj til favoritter"
          >
            {isFavorite ? "❤️" : "🖤"}
          </button>
        </div>
      </div>
    </div>
  );
}
