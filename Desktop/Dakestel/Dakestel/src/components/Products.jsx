import React, { useState, useContext } from 'react';
import { CartContext } from '../components/CartContext';

const Products = ({ products }) => {
  const { addToCart } = useContext(CartContext);
  const [quantities] = useState({});

  



  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <div>
          <img className='product-image' src={product.image} alt={product.title} />
          </div>
          <div>
          <h3 className='product-name'>{product.title}</h3>
          <p className='product-cost'>₦{product.cost}</p>
          <p className='product-details'>{product.details}</p>
          
        
          
          <button className='add-to-cart-btn' onClick={() => addToCart({ ...product, quantity: quantities[product.id] || 1 })}>
            Add to Cart
          </button>
        </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
