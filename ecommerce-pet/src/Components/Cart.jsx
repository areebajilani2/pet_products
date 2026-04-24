import React, { useEffect } from 'react';
import { useCart } from '../CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  useEffect(() => {
    console.log('Cart component mounted');
    return () => {
      console.log('Cart component unmounted');
    };
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id, delta) => {
    // Find the item in the cart
    const item = cart.find(item => item._id === id);
    if (item) {
      if (delta < 0 && item.quantity === 1) {
        // If decrementing and quantity is 1, remove the item
        removeFromCart(id);
      } else {
        // Otherwise, update the quantity
        updateQuantity(id, delta);
      }
    }
  };
  

  // Calculate subtotal
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-950">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full  bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200 ">
                  <tr>
                    <th className="p-4 text-left font-medium text-blue-950 opacity-90">Product</th>
                    <th className="p-4 text-left font-medium text-blue-950 opacity-90">Quantity</th>
                    <th className="p-4 text-left font-medium text-blue-950 opacity-90">Price</th>
                    <th className="p-4 text-left font-medium text-blue-950 opacity-90">Total</th>
                    <th className="p-4"></th> {/* Empty header for action column */}
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item._id} className="border-t hover:bg-gray-50 transition">
                      <td className="p-4 flex items-center">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                        <h2 className="text-lg font-semibold text-blue-950 opacity-90">{item.name}</h2>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(item._id, -1)}
                            className={`flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 border border-gray-300 rounded-l-lg transition hover:bg-gray-300 : ''}`}
                          >
                            <span className="text-2xl">-</span>
                          </button>
                          <span className="w-16 text-center bg-gray-100 text-gray-800 border-t border-b border-gray-300">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item._id, 1)}
                            className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 border border-gray-300 rounded-r-lg transition hover:bg-gray-300"
                          >
                            <span className="text-2xl">+</span>
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-blue-950 opacity-90 font-semibold">${item.price.toFixed(2)}</td>
                      <td className="p-4 text-blue-950 opacity-90 font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="p-7">
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="text-red-500 transition hover:text-red-700"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-white border-t border-blue-950">
                    <td colSpan="3" className="p-4 text-right font-semibold text-blue-950 opacity-90 text-xl">
                      Subtotal:
                    </td>
                    <td className="p-4 text-blue-950 opacity-90 font-bold text-xl">
                      ${subtotal.toFixed(2)}
                    </td>
                    <td className="pl-0 p-4 font-semibold ">
                      <button
                        onClick={clearCart}
                        className="text-gray-700 transition hover:text-gray-900"
                      >
                        <FontAwesomeIcon icon={faCartArrowDown} size="lg" />
                        <h5 className='text-blue-950 opacity-90'>Empty Cart</h5> 
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" className="p-4 text-right">
                    <button
                        onClick={() => alert('Proceeding to checkout')}
                        className="bg-blue-950 border-2 border-blue-950 hover:bg-transparent hover:text-blue-950 hover:border-blue-950 text-white text-xxl w-500 font-medium py-2 px-6 rounded-lg transition-300"
                      >
                        Checkout
                    </button>

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Card View */}
          <div className="md:hidden">
            {cart.map(item => (
              <div key={item._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <div className="flex items-center mb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => handleQuantityChange(item._id, -1)}
                    disabled={item.quantity <= 1}
                    className={`flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 border border-gray-300 rounded-l-lg transition hover:bg-gray-300 ${item.quantity <= 1 ? 'cursor-not-allowed' : ''}`}
                  >
                    <span className="text-2xl">-</span>
                  </button>
                  <span className="w-16 text-center bg-gray-100 text-gray-800 border-t border-b border-gray-300">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, 1)}
                    className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 border border-gray-300 rounded-r-lg transition hover:bg-gray-300"
                  >
                    <span className="text-2xl">+</span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-800 font-semibold">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-500 transition hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                  </button>
                </div>
              </div>
            ))}
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
              <div className="flex justify-between mb-4">
                <p className="text-gray-800 font-bold text-xl">Subtotal:</p>
                <p className="text-gray-800 font-bold text-xl">${subtotal.toFixed(2)}</p>
              </div>
              <button
                onClick={clearCart}
                className=" text-gray-700 text-center hover:bg-gray-300 rounded-lg py-2 mb-2"
              > 
                <FontAwesomeIcon icon={faCartArrowDown} size="lg"/>
                <br />
                Empty Cart 
              </button>
              <button
                onClick={() => alert('Proceeding to checkout')}
                className="w-full bg-blue-950 hover:bg-opacity-75 text-white text-xl font-medium py-2 rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
