import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { name } = useParams(); // Get the product name from the URL
  const [product, setProduct] = useState(null); // Initialize product as null
  const [error, setError] = useState(null); // To handle errors
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Ensure the product name is URL-encoded
        const encodedName = encodeURIComponent(name);
        const response = await fetch(`http://localhost:5000/api/products/${encodedName}`);
        const data = await response.json();
        console.log('Fetched product data:', data); 
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product.');
      }
    };

    fetchProduct();
  }, [name]); // Add `name` to the dependency array to refetch if `name` changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    console.log(`Adding ${quantity} of ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    // Add product to cart temporarily and navigate to checkout with only this product
    const singleProduct = { ...product, quantity };

    navigate('/checkout', { state: { singleProduct } });
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-96 mb-4">
            <img 
              src={selectedImage || product.image} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-contain" 
            />
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {product.images && product.images.length > 0 ? (
              product.images.map((image, index) => (
                <img 
                  key={index}
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover cursor-pointer border rounded-lg hover:opacity-75"
                  onClick={() => handleImageClick(image)}
                />
              ))
            ) : (
              <p>No additional images available</p>
            )}
          </div>
        </div>
        <div className="md:ml-6 flex flex-col justify-between">
          <h1 className="text-3xl font-bold text-blue-950 mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          
          <div className="text-blue-950 font-bold text-xl mb-4">
            <label htmlFor="quantity" className="mr-2 text-lg font-bold text-blue-950">Price:</label>
            {product.price !== undefined ? `$${product.price.toFixed(2)}` : 'Price not available'}
          </div>
          
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2 text-lg font-bold text-blue-950">Quantity:</label>
            <div className="flex items-center border">
              <button 
                onClick={decrementQuantity}
                disabled={quantity <= 1} // Disable button if quantity is 1 or less
                className={`bg-gray-200 text-blue-950 font-bold py-1 px-3 border-r ${quantity <= 1 ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                -
              </button>
              <input 
                type="number" 
                id="quantity" 
                value={quantity} 
                min="1" 
                onChange={handleQuantityChange} 
                className="border-0 px-3 py-1 w-16 text-center outline-none"
              />
              <button 
                onClick={incrementQuantity}
                className="bg-gray-200 text-blue-950 font-bold py-1 px-3 border-l"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleAddToCart}
              className="bg-blue-950 text-white font-bold py-2 px-4 rounded-md border-2 border-blue-950 hover:bg-white hover:text-blue-950 transition duration-500"
            >
              ADD TO CART
            </button>
            
            <button
              onClick={handleBuyNow}
              className="bg-teal-700 text-white font-bold py-2 px-4 rounded-md border-2 border-teal-700 hover:bg-white hover:text-teal-700 transition duration-500"
            >
              BUY IT NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
