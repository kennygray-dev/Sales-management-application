import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';


function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="logo">
        <RouterLink to="/" className='logo'>DA-KESTEL</RouterLink>
      </div>
      <ul className="nav-links">
        {isHomePage ? (
          <>
            <li className={location.hash === '#products' ? 'active' : ''}>
              <ScrollLink to="products" smooth={true} duration={500}>Products</ScrollLink>
            </li>
            <li className={location.hash === '#contact' ? 'active' : ''}>
              <ScrollLink to="contact" smooth={true} duration={500}>Contact Us</ScrollLink>
            </li>
          </>
        ) : (
          <li className={location.pathname === '/' ? 'active' : ''}>
            <RouterLink to="/"><FontAwesomeIcon icon={faHome}  className='home-about'/></RouterLink>
          </li>
        )}
        <li className={location.pathname === '/about' ? 'active' : ''}>
          <RouterLink to="/about">About Us</RouterLink>
        </li>
      </ul>
      <div>
        <RouterLink to="/cart" className={`cart-icon-container ${location.pathname === '/cart' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faShoppingCart} />
          Cart
        </RouterLink>
      </div>
    </nav>
  );
}

export default Navbar;
