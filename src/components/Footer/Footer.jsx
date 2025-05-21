import styles from './Footer.module.css'
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

export default function Footer() {
    return (
      <div className={styles.footer}>
        <p className={styles.some}>
          <a href="/">
            <FaFacebookSquare />
          </a>
          <a href="/">
            <FaInstagramSquare />
          </a>
        </p>
        <p>Copyright 2025 Viborg</p>
      </div>
    );
}
