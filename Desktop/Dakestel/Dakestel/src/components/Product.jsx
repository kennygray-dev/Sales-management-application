import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Product = ({ id, image, title, cost, details }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({ id, image, title, cost, details, quantity: 1 });
    alert(`Added ${title} to cart.`);
  };

  return (
    <div className="product">
      <img src={image} alt={title} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{title}</h3>
        <h4 className="product-cost">₦{cost}</h4>
        <p >{details}</p>
        <button onClick={handleAddToCart} >Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
