import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Products from './pages/Products/Products'
import styles from './App.module.css'
import Header  from './components/Header/Header'
import Footer  from './components/Footer/Footer'
import ProductCard from './components/ProductCard/ProductCard'

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:id" element={<ProductCard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}