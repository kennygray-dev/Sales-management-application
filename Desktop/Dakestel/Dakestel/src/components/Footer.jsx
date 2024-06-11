import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

function Footer() {
  return (
    <section className="footer">
      <div>
        <a href="/"><h3>DA-KESTEL</h3></a>
      </div>

      <div className="footer-products">
        <div className="footer-home-care">
          <h3>Home Care Products</h3>
          <p>Automatic fabric wash</p>
          <p>Home clean</p>
          <p>Lemon fresh</p>
          <p>Deep action</p>
          <p>Odour kill</p>
          <p>Screen cleaner</p>
          <p>Toilet & bath cleaner</p>
          <p>Mirror & glass cleaner</p>
          <p>Anti-bacterial cleaner</p>
        </div>
        <div className="footer-car-care">
          <h3>Car Care Products</h3>
          <p>Car wash</p>
          <p>Glaze protectant</p>
          <p>Petrol injector cleaner</p>
          <p>Automatic Transmission Fluid (ATF)</p>
        </div>
      </div>

      <div className="Company-info">
        <h3>Company Info</h3>
        <ul>
          <li className='about-footer'>
            <a href="/about">About us</a>
          </li>
          <li className='contact-footer'>
          <ScrollLink to="contact" smooth={true} duration={500}>Contact Us</ScrollLink>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;
