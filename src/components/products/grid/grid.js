"use client";  // Aggiungi questa linea all'inizio del file
 
import React, { useEffect, useState } from 'react';
import ProductCard from '../card/card';
import styles from '../grid/grid.module.css';
 
const ProductGrid = () => {
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/product');
        const data = await response.json();
        console.log('products', data);  // Controlla la risposta dell'API per assicurarti che i dati siano corretti
        setProducts(data);  // Imposta i prodotti nello stato
      } catch (error) {
        console.error('Errore nel recupero dei prodotti:', error);
      }
    };
 
    fetchProducts();
  }, []);
 
  return (
    <section className={styles.productGrid}>
      {products.map((product, index) => (
        <ProductCard
          key={index}
          image={product.image}
          name={product.name}
          price={product.price}
          description={product.description}
          stock={product.stock}
          availability={product.availability}
        />
      ))}
    </section>
  );
};
 
export default ProductGrid;