import React from 'react';
import { Link } from 'react-router-dom';


export function HomePage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">Welcome to ECommerce!</h1>
      <p className="text-lg mb-4">Discover a seamless shopping experience with a wide range of products available in various sizes and colors.</p>
      <p className="text-lg mb-4">Browse through our diverse collection of fashion-forward apparel and trendy accessories to find the perfect match for your style.</p>
      <p className="text-lg mb-4">For administrators, our robust management interfaces empower you to effortlessly oversee your E-commerce operations, including product listings, inventory management, and order processing.</p>
      <p className="text-lg mb-4">With real-time inventory updates and secure transactions, shop and manage with confidence.</p>
      <p className="text-lg mb-4">If you have any questions or need assistance, our responsive customer support team is here to help.</p>
      <Link to="/products" className="text-lg text-blue-500 hover:underline">Start Shopping</Link>
    </div>
  );
}