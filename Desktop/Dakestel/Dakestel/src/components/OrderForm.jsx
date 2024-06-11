import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import emailjs from '@emailjs/browser';

const OrderForm = () => {
  const { cart, calculateTotal } = useContext(CartContext);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const formattedCartItems = cart.map(item => `- ${item.title}: ${item.quantity} x ₦${item.cost}`).join('\n');
    const total = calculateTotal();
    setMessage(`${formattedCartItems}\n\nTotal: ₦${total} `);
  }, [cart, calculateTotal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullMessage = `
      Name: ${name}
      Contact: ${contact}
      Address: ${address}
      
      Order Details:
      ${message}
    `;
    console.log("Submitting order with message:", fullMessage); // Log the message for debugging
    try {
      const response = await emailjs.send('service_883p1jf', 'template_6of9xvg', {
        message: fullMessage,
        to_email: 'ddakestelresources@gmail.com'
      }, 'jNFIeX4NPMwYV_i45');
      console.log('Success!', response.status, response.text);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Failed...', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='form-topic'>
        <h3 className='h3'>Fill in your details to confirm order</h3>
        <p>We will contact you to validate your order</p>
      </div>
      
      <div className='form-label-div'>
        <label className='form-label'>
          Name<span>*</span>
          <input className='form-input'
            placeholder='Type in your full name'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div className='form-label-div'>
        <label className='form-label'>
          Phone Number<span>*</span>
          <input className='form-input'
            placeholder='Type in your phone number'
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </label>
      </div>
      <div className='form-label-div'>
        <label className='form-label'>
          Location<span>*</span>
          <input className='form-input'
            placeholder='Type in the location for delivery'
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
      </div>
      <div className='form-label-div'>
        <label className='form-message'>
          Order details
          <textarea className='form-input'
            value={message}
            readOnly
            rows="10"
            cols="30"
          />
        </label>
      </div>
      <button className='place-order-button' type="submit"><p>Proceed to checkout</p></button>
    </form>
  );
};

export default OrderForm;
