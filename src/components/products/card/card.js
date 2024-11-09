import React from 'react';
import styles from '@/components/products/card/card.module.css';

const Card = ({ image, name, price, description, quantity }) => {
  return (
    <article className={styles.productCard}>
      <img src={image} alt={name} className={styles.productImage} />
      <h3 className={styles.productName}>{name}</h3>
      <p className={styles.productDescription}>{description}</p>
      <div className={styles.priceContainer}>
        <span className={styles.productPrice}>{price}</span>
        <span className={styles.productQuantity}>Disponibilità: {quantity}</span>
        <button className={styles.addToCartButton} aria-label={`Add ${name} to cart`}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1db9423f93acecad563a7fb48b43501f83a193782e5301bc5217de6e53959b1e?placeholderIfAbsent=true&apiKey=88f18012b9cc432c81a833b7d6b5079d" alt="" className={styles.cartIcon} />
        </button>
      </div>
    </article>
  );
};

export default Card;
