import React from 'react';
import { useCart } from '../CartContext';

const Product = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevents the click event from propagating to parent elements
    addToCart({ ...product, quantity: 1 }); // Default quantity to 1 when adding from grid
    console.log(`Adding ${product.name} to cart`);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="pt-0 p-4 border rounded-lg shadow-lg h-full flex flex-col justify-between">
      <img src={product.image} alt={product.name} className="w-full h-48 object-contain mb-4" />
      <div className="flex-grow">
        <h2 className="text-xl font-semibold mb-2">{truncateText(product.name, 50)}</h2>
        <p className="hidden md:block text-gray-700 mb-2">{truncateText(product.description, 150)}</p>
        <p className="text-gray-900 font-bold">${product.price.toFixed(2)}</p>
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
