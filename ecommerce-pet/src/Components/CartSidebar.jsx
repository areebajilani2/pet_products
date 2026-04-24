import React from 'react';
import { useCart } from '../CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CartSidebar = () => {
  const { cart, isSidebarVisible, closeSidebar, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle View Cart button click
  const handleViewCart = () => {
    closeSidebar(); // Close the sidebar
    navigate('/cart'); // Redirect to Cart page
  };

  // Function to handle Checkout button click
  const handleCheckout = () => {
    closeSidebar(); // Close the sidebar
    navigate('/checkout'); // Redirect to Checkout page
  };

  // Function to handle decrement button click
  const handleDecrement = (id, quantity) => {
    if (quantity > 1) {
      updateQuantity(id, -1); // Decrement quantity
    } else {
      removeFromCart(id); // Remove item if quantity is 1
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isSidebarVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={closeSidebar}
    >
      <div
        className={`absolute right-0 top-0 w-[400px] bg-blue-950 shadow-2xl h-full p-6 transition-transform duration-300 ${isSidebarVisible ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Your Cart</h2>
          <button onClick={closeSidebar} className="text-white absolute top-8 right-7 hover:text-gray-200 transition-colors">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        {cart.length === 0 ? (
          <p className="text-center text-gray-200">Your cart is empty.</p>
        ) : (
          <div className="overflow-y-auto max-h-[calc(100vh-250px)] pr-2 scrollbar-hide">
            {cart.map(item => (
              <div key={item._id} className="bg-white p-4 shadow-md mb-4 relative">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-3">
                      <button
                        onClick={() => handleDecrement(item._id, item.quantity)}
                        className={`w-8 h-8 bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300 transition-colors: ''}`}
                      >
                        -
                      </button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, 1)}
                        className="w-8 h-8 bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="absolute top-0 right-2 text-blue-950 hover:text-blue-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} size="sm" />
                </button>
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div className="mt-8">
            <button
              onClick={handleViewCart}
              className="bg-white text-blue-950 w-full py-3 mb-4 hover:bg-blue-950 hover:text-white border border-blue-950 hover:border-white transition-colors shadow-md"
            >
              View Cart
            </button>
            <button
              onClick={handleCheckout}
              className="bg-white text-blue-950 w-full py-3 hover:bg-blue-950 hover:text-white border border-blue-950 hover:border-white transition-colors shadow-md"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
