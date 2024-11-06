import React from 'react';
import styles from './ProductPage.module.css';
import Header from '../components/Header'; 

const ProductCard = ({ image, name, price }) => (
  <article className={styles.productCard}>
    <img src={image} alt={name} className={styles.productImage} />
    <h3 className={styles.productName}>{name}</h3>
    <div className={styles.priceContainer}>
      <span className={styles.productPrice}>{price}</span>
      <button className={styles.addToCartButton} aria-label={`Add ${name} to cart`}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1db9423f93acecad563a7fb48b43501f83a193782e5301bc5217de6e53959b1e?placeholderIfAbsent=true&apiKey=88f18012b9cc432c81a833b7d6b5079d" alt="" className={styles.cartIcon} />
      </button>
    </div>
  </article>
);
const ProductGrid = () => {
  const products = [
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1006525e864b23a6d19a92afc675402268df72ddede78d2ebabb7e5f58c469ce?placeholderIfAbsent=true&apiKey=88f18012b9cc432c81a833b7d6b5079d", name: "Torta ai 3 cioccolati", price: "€20,00" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1006525e864b23a6d19a92afc675402268df72ddede78d2ebabb7e5f58c469ce?placeholderIfAbsent=true&apiKey=88f18012b9cc432c81a833b7d6b5079d", name: "Torta ai frutti di bosco", price: "€22,00" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4ddb41dccb80bbda0c4b9c34d0246bae2e24ebaa488819f9ce6d5370831ca587?placeholderIfAbsent=true&apiKey=88f18012b9cc432c81a833b7d6b5079d", name: "Torta Tiramisù", price: "€17,00" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/b0fcb730cef3ca8641ab3d30761c32ce0fba26aa11c459bf55712701588605d3?placeholderIfAbsent=true&apiKey=88f18012b9cc432c81a833b7d6b5079d", name: "Torta Ferrero Rocher", price: "€20,00" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/2729cb1ab34d473d4f867ea85a2339ffc4a5a545feda6c5d5fc068d617a0cad9?placeholderIfAbsent=true&apiKey=88f18012b9cc432c81a833b7d6b5079d", name: "Torta al pistacchio", price: "€19,00" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6059256b66431053fd09229cdf1f51aa1204b28313b07529ac6893b55b32f5b1?placeholderIfAbsent=true&apiKey=88f18012b9cc432c81a833b7d6b5079d", name: "Torta Caprese rivisitata", price: "€21,00" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/54ab45f53390ef10bd2565fb65f19e0e9aeb8aa3fb0cd5960f9a2d8f0485ac7e?placeholderIfAbsent=true&apiKey=88f18012b9cc432c81a833b7d6b5079d", name: "Torta Sbrisolona", price: "€18,00" },
    { image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5f3d236f51edf45f536882384668eb230c64c528470c4c3c67bf77d28623ed43?placeholderIfAbsent=true&apiKey=88f18012b9cc432c81a833b7d6b5079d", name: "Crostata di albicocche", price: "€12,00" },
  ];

  return (
    <section className={styles.productGrid}>
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </section>
  );
};

const ProductPage = () => {
  return (
    <div className={styles.productPage}>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a050ef7beee9b1d3c32f6c8ac19675f99ddd92b6c5562f0d98ddd9c9f62e55a?placeholderIfAbsent=true&apiKey=88f18012b9cc432c81a833b7d6b5079d" alt="" className={styles.backgroundImage} />
      <Header />
      <main className={styles.mainContent}>
        <nav className={styles.breadcrumb}>
          <a href="#home">Home</a> &gt; <span>Prodotti</span>
        </nav>
        <h1 className={styles.pageTitle}>Le Nostre Delizie</h1>
        <div className={styles.filterContainer}>
          <span className={styles.filterLabel}>Filtra per</span>
          <select className={styles.filterSelect}>
            <option>Seleziona</option>
          </select>
        </div>
        <ProductGrid />
      </main>
      <section className={styles.callToAction}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5cbfbc4b8fc0a9e6954a6fd243a673d4be4b56be7011404d29544c53058369ca?placeholderIfAbsent=true&apiKey=88f18012b9cc432c81a833b7d6b5079d" alt="" className={styles.ctaBackground} />
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Vuoi venirci a trovare ?</h2>
          <p className={styles.ctaDescription}>
            Visita la pagina contatti per poterci contattare <br />e scoprire dove ci troviamo!
          </p>
          <button className={styles.ctaButton}>Scopri di più</button>
        </div>
      </section>
      <footer className={styles.footer}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/75023c09654fc7923bf75d2dcd9d5c0c6ded6af44ad467e941b9ffa43cb298d4?placeholderIfAbsent=true&apiKey=88f18012b9cc432c81a833b7d6b5079d" alt="" className={styles.footerImage} />
      </footer>
    </div>
  );
};
export default ProductPage;
