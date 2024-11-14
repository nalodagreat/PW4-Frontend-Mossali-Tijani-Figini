'use client';

import React, { useState } from 'react';
import styles from './card.module.css';

const ProductCard = ({ productId, image, name, price, description, stock, availability, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleAddToCartClick = () => {
        if (onAddToCart && quantity > 0) {
            onAddToCart(productId, quantity);
        }
    };

    return (
        <article className={styles.productCard}>
            <img src={image} alt={name} className={styles.productImage}/>
            <h3  className={styles.productName}>{name}</h3>
            <p className={styles.productDescription}>{description}</p>
            <p
                className={`${styles.productAvailability} ${
                    availability === 'available' ? styles.available : styles.unavailable
                }`}
            >
                {availability === 'available' ? 'Disponibile' : 'Esaurito'}
            </p>
            <p className={styles.productStock}>
                {stock !== undefined ? `Disponibilità: ${stock}` : 'Stock non disponibile'}
            </p>
            <div className={styles.priceContainer}>
                <span className={styles.productPrice}>{price} €</span>
            </div>

            {availability === 'available' && (
                <>
                    <input
                        type="number"
                        min="1"
                        max={stock}
                        value={quantity}
                        onChange={handleQuantityChange}
                        className={styles.quantityInput}
                        aria-label={`Scegli la quantità di ${name}`}
                    />
                    <button
                        onClick={handleAddToCartClick}
                        className={styles.addToCartButton}
                        aria-label={`Aggiungi ${name} al carrello`}
                    >
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1db9423f93acecad563a7fb48b43501f83a193782e5301bc5217de6e53959b1e?placeholderIfAbsent=true&apiKey=88f18012b9cc432c81a833b7d6b5079d"
                            alt="Carrello"
                            className={styles.cartIcon}
                        />
                    </button>
                </>
            )}
        </article>
    );
};

export default ProductCard;
