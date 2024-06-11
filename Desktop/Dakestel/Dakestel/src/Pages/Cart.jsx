import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import "./Cart.css"
import OrderForm from '../components/OrderForm';

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.quantity * item.cost, 0);
  };

  return (
    <div className="cart">
      <div>
      <h2 className='cart-topic'>Items</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className='cart-image' />
            <div className="item-details">
              <h3 className='cart-item-name'>{item.title}</h3>
             
              <div className='quantity-button-container'>
              <button className='cart-quantity-button' onClick={() => decreaseQuantity(item.id)}>-</button>
                <p className='item-quantity'>{item.quantity}</p>
                <button className='cart-quantity-button' onClick={() => increaseQuantity(item.id)}>+</button>
              
              </div>
             
              <p className='cart-item-total-price'> ₦{item.quantity * item.cost}</p>
              <div className='cart-remove-container'>
              </div>
            </div>
             <div>
                <button className='cart-remove' onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3 className='cart-total-all'>Total Amount: ₦{getTotalAmount()}</h3>
      </div>
    </div>
    <div className='cart-form'>
      <OrderForm />
    </div>
      </div>
      
  );
};

export default Cart;
