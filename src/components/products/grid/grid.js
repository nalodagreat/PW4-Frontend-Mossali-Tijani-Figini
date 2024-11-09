"use client";
import React, { useEffect, useState } from 'react';
import Card from '../card/card';
import styles from '@/components/products/grid/grid.module.css';

const Grid = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/product');
        const data = await response.json();
        console.log('products', data);
        setProducts(data);
      } catch (error) {
        console.error('Errore nel recupero dei prodotti:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className={styles.productGrid}>
      {products.map((product, index) => (
        <Card
          key={index} 
          image={product.image} 
          name={product.name} 
          price={product.price} 
          description={product.description} 
          quantity={product.quantity} 
        />
      ))}
    </section>
  );
};

export default Grid;
