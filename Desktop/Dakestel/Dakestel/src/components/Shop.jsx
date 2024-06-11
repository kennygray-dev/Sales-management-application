import React, { useState } from 'react';
import Products from './Products'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';


const Shop = () => {
  const [category, setCategory] = useState('home');

  const carCareProducts = [
   
    {
      
      id: 1,

      image: 'carwash2l.png',
      title: 'Car Wash 2L',
      cost: '2500',
      details: "Transform your car washing routine with our Ultimate Car Wash Shampoo. Formulated with advanced cleaning agents, this high-foaming shampoo gently yet effectively removes dirt, grime, and road contaminants from your vehicle's surface without stripping away wax protection. Suitable for all paint types and safe for use on clear coats, it delivers a deep clean and leaves a streak-free, glossy finish.",
    },
    {
      id: 2,
      image: 'glaze.png',
      title: 'Glaze Protectant',
      cost: '1500',
      details: "Transform your car washing routine with our Ultimate Car Wash Shampoo. Formulated with advanced cleaning agents, this high-foaming shampoo gently yet effectively removes dirt, grime, and road contaminants from your vehicle's surface without stripping away wax protection. Suitable for all paint types and safe for use on clear coats, it delivers a deep clean and leaves a streak-free, glossy finish.",
    },
    {
      id: 3,
      image: 'fuelcleaner.png',
      title: 'Petrol Injector Cleaner',
      cost: '1200',
      details: "Transform your car washing routine with our Ultimate Car Wash Shampoo. Formulated with advanced cleaning agents, this high-foaming shampoo gently yet effectively removes dirt, grime, and road contaminants from your vehicle's surface without stripping away wax protection. Suitable for all paint types and safe for use on clear coats, it delivers a deep clean and leaves a streak-free, glossy finish.",
    },
    {
      id: 4,
      image: 'atf.png',
      title: 'Automatic Tranmission Fluid',
      cost: '1800',
      details: "Transform your car washing routine with our Ultimate Car Wash Shampoo. Formulated with advanced cleaning agents, this high-foaming shampoo gently yet effectively removes dirt, grime, and road contaminants from your vehicle's surface without stripping away wax protection. Suitable for all paint types and safe for use on clear coats, it delivers a deep clean and leaves a streak-free, glossy finish.",
    },
    {
      id: 5,
      image: 'carwash.png',
      title: 'Car wash',
      cost: '4000',
      details: "Transform your car washing routine with our Ultimate Car Wash Shampoo. Formulated with advanced cleaning agents, this high-foaming shampoo gently yet effectively removes dirt, grime, and road contaminants from your vehicle's surface without stripping away wax protection. Suitable for all paint types and safe for use on clear coats, it delivers a deep clean and leaves a streak-free, glossy finish.",
    },
    // Add more car care products here
  ];

  const homeCareProducts = [
    {
      id: 6,
      image: 'lemonfresh.png',
      title: 'Lemon fresh',
      cost: '3000',
      details: 'Elevate your home cleaning routine with Sparkle Multi-Surface Cleaner, your go-to solution for a spotless and hygienic home. This powerful cleaner is specially formulated to tackle grease, grime, and dirt on a variety of surfaces, leaving them clean and fresh with a pleasant lavender scent. Ideal for kitchens, bathrooms, and living areas, Sparkle Multi-Surface Cleaner ensures your home stays sparkling clean with minimal effort.',
    },
    {
      id: 7,
      image: 'homeclean.png',
      title: 'Home Clean',
      cost: '1500',
      details: 'Elevate your home cleaning routine with Sparkle Multi-Surface Cleaner, your go-to solution for a spotless and hygienic home. This powerful cleaner is specially formulated to tackle grease, grime, and dirt on a variety of surfaces, leaving them clean and fresh with a pleasant lavender scent. Ideal for kitchens, bathrooms, and living areas, Sparkle Multi-Surface Cleaner ensures your home stays sparkling clean with minimal effort.',
    },
    {
      id: 8,
      image: 'fabricwash.png',
      title: 'Automatic Fabric wash',
      cost: '1500',
      details: 'Elevate your home cleaning routine with Sparkle Multi-Surface Cleaner, your go-to solution for a spotless and hygienic home. This powerful cleaner is specially formulated to tackle grease, grime, and dirt on a variety of surfaces, leaving them clean and fresh with a pleasant lavender scent. Ideal for kitchens, bathrooms, and living areas, Sparkle Multi-Surface Cleaner ensures your home stays sparkling clean with minimal effort.',
    },
    {
      id: 9,
      image: 'deepaction.png',
      title: 'Deep Action',
      cost: '1600',
      details: 'Elevate your home cleaning routine with Sparkle Multi-Surface Cleaner, your go-to solution for a spotless and hygienic home. This powerful cleaner is specially formulated to tackle grease, grime, and dirt on a variety of surfaces, leaving them clean and fresh with a pleasant lavender scent. Ideal for kitchens, bathrooms, and living areas, Sparkle Multi-Surface Cleaner ensures your home stays sparkling clean with minimal effort.',
    },
    {
      id: 10,
      image: 'odour.png',
      title: 'Odour Kill',
      cost: '1300',
      details: 'Elevate your home cleaning routine with Sparkle Multi-Surface Cleaner, your go-to solution for a spotless and hygienic home. This powerful cleaner is specially formulated to tackle grease, grime, and dirt on a variety of surfaces, leaving them clean and fresh with a pleasant lavender scent. Ideal for kitchens, bathrooms, and living areas, Sparkle Multi-Surface Cleaner ensures your home stays sparkling clean with minimal effort.',
    },
    {
      id: 11,
      image: 'screen.png',
      title: 'Screen Cleaner',
      cost: '1200',
      details: 'Elevate your home cleaning routine with Sparkle Multi-Surface Cleaner, your go-to solution for a spotless and hygienic home. This powerful cleaner is specially formulated to tackle grease, grime, and dirt on a variety of surfaces, leaving them clean and fresh with a pleasant lavender scent. Ideal for kitchens, bathrooms, and living areas, Sparkle Multi-Surface Cleaner ensures your home stays sparkling clean with minimal effort.',
    },
    {
      id: 12,
      image: 'toilet.png',
      title: 'Toilet & Bath Cleaner',
      cost: '1100',
      details: 'Elevate your home cleaning routine with Sparkle Multi-Surface Cleaner, your go-to solution for a spotless and hygienic home. This powerful cleaner is specially formulated to tackle grease, grime, and dirt on a variety of surfaces, leaving them clean and fresh with a pleasant lavender scent. Ideal for kitchens, bathrooms, and living areas, Sparkle Multi-Surface Cleaner ensures your home stays sparkling clean with minimal effort.',
    },
    {
      id: 13,
      image: 'screen.png',
      title: 'Mirror & Glass Cleaner',
      cost: '1900',
      details: 'Elevate your home cleaning routine with Sparkle Multi-Surface Cleaner, your go-to solution for a spotless and hygienic home. This powerful cleaner is specially formulated to tackle grease, grime, and dirt on a variety of surfaces, leaving them clean and fresh with a pleasant lavender scent. Ideal for kitchens, bathrooms, and living areas, Sparkle Multi-Surface Cleaner ensures your home stays sparkling clean with minimal effort.',
    },
    {
      id: 14,
      image: 'sanitizer.png',
      title: 'Anti-Bacterial Cleaner',
      cost: '1500',
      details: 'Elevate your home cleaning routine with Sparkle Multi-Surface Cleaner, your go-to solution for a spotless and hygienic home. This powerful cleaner is specially formulated to tackle grease, grime, and dirt on a variety of surfaces, leaving them clean and fresh with a pleasant lavender scent. Ideal for kitchens, bathrooms, and living areas, Sparkle Multi-Surface Cleaner ensures your home stays sparkling clean with minimal effort.',
    },
    {
      id: 15,
      image: 'lemon4l.png',
      title: 'Lemon fresh 4L',
      cost: '4000',
      details: 'Elevate your home cleaning routine with Sparkle Multi-Surface Cleaner, your go-to solution for a spotless and hygienic home. This powerful cleaner is specially formulated to tackle grease, grime, and dirt on a variety of surfaces, leaving them clean and fresh with a pleasant lavender scent. Ideal for kitchens, bathrooms, and living areas, Sparkle Multi-Surface Cleaner ensures your home stays sparkling clean with minimal effort.',
    },
    {
      id: 16,
      image: 'applefresh.png',
      title: 'Apple fresh',
      cost: '1500',
      details: 'Elevate your home cleaning routine with Sparkle Multi-Surface Cleaner, your go-to solution for a spotless and hygienic home. This powerful cleaner is specially formulated to tackle grease, grime, and dirt on a variety of surfaces, leaving them clean and fresh with a pleasant lavender scent. Ideal for kitchens, bathrooms, and living areas, Sparkle Multi-Surface Cleaner ensures your home stays sparkling clean with minimal effort.',
    },
    // Add more home care products here
  ];

  return (
    <section className="second" id='products' >
      <h2>Shop our products</h2>
      <div className="product-buttons-container">
        <button
          onClick={() => setCategory('car')}
          className={category === 'car' ? 'selected' : ''}
        >
          <FontAwesomeIcon icon={faCar} size="2x" />
          <div>
            Car care products
            
          </div>
        </button>

        <button
          onClick={() => setCategory('home')}
          className={category === 'home' ? 'selected' : ''}
        >
          <FontAwesomeIcon icon={faHome} size="2x" />
          <div>
            Home care products
            
          </div>
         
        </button>
      </div>
     

      <div className="product-container">
        {category === 'car' && <Products products={carCareProducts} />}
        {category === 'home' && <Products products={homeCareProducts} />}
      </div>
     
    </section>
  );
};

export default Shop;