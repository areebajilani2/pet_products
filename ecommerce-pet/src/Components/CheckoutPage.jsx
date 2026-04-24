// import React, { useState } from 'react';
// import { useCart } from '../CartContext';
// import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const CheckoutPage = () => {
//   const { cart } = useCart();
//   const [isOpen, setIsOpen] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('COD');
//   const [onlinePaymentOption, setOnlinePaymentOption] = useState('Credit/Debit Card');
//   const navigate = useNavigate();

//   const toggleOrderSummary = () => {
//     setIsOpen(!isOpen);
//   };

//   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   // If the cart is empty, display a message and a button to return to the main products page
//   if (cart.length === 0) {
//     return (
//       <div className="p-6 max-w-4xl mx-auto text-center">
//         <div className="bg-white shadow-xl rounded-lg p-8">
//           <h2 className="text-3xl font-semibold mb-6">Your cart is empty, so you cannot checkout.</h2>
//           <button
//             onClick={() => navigate('/')}  // Redirect to the main products page
//             className="mt-4 w-half bg-blue-950 text-white font-bold py-2 px-4 rounded-md border-2 border-blue-950 hover:bg-white hover:text-blue-950 transition duration-500"
//           >
//             Return to Products
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>
      
//       {/* Order Summary */}
//       <div className="bg-white shadow-lg rounded-lg mb-8">
//         <div 
//           onClick={toggleOrderSummary} 
//           className="p-6 cursor-pointer flex justify-between items-center border-b border-gray-200"
//         >
//           <h2 className="text-3xl font-semibold">Order Summary</h2>
//           {isOpen ? <FaCaretUp size={24} /> : <FaCaretDown size={24} />}
//         </div>
//         {isOpen && (
//           <div className="p-6 space-y-4">
//             {cart.map((item) => (
//               <div key={item._id} className="flex items-center justify-between border-b pb-4">
//                 <div className="flex items-center space-x-4">
//                   <img 
//                     src={item.image} 
//                     alt={item.name} 
//                     className="w-20 h-20 object-cover rounded-lg" 
//                   />
//                   <div>
//                     <span className="font-medium text-lg block">{item.name}</span>
//                     <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
//                   </div>
//                 </div>
//                 <span className="font-medium text-lg">${(item.price * item.quantity).toFixed(2)}</span>
//               </div>
//             ))}
//             <div className="flex justify-between font-bold text-xl pt-4 border-t border-gray-200">
//               <span>Total</span>
//               <span>${subtotal.toFixed(2)}</span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Customer Information Form */}
//       <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
//         <h2 className="text-3xl font-semibold mb-6">Customer Information</h2>
//         <form className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <input 
//               type="text" 
//               className="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input 
//               type="email" 
//               className="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Address</label>
//             <input 
//               type="text" 
//               className="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">City</label>
//             <input 
//               type="text" 
//               className="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Postal Code</label>
//             <input 
//               type="text" 
//               className="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
//             />
//           </div>
//         </form>
//       </div>
      
//       {/* Payment Information Form */}
//       <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
//         <h2 className="text-3xl font-semibold mb-6">Payment Information</h2>
//         <form className="space-y-6">
//           {/* Payment Method */}
//           <div className="border border-gray-300 rounded-lg">
//             <div className="bg-gray-100 p-6 rounded-t-lg">
//               <label className="block text-sm font-medium text-gray-700 mb-4">Payment Method</label>
//               <div className="space-y-4">
//                 <label className="flex items-center space-x-3">
//                   <input 
//                     type="radio" 
//                     name="paymentMethod" 
//                     value="COD" 
//                     checked={paymentMethod === 'COD'} 
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="h-6 w-6"
//                   />
//                   <span className="text-lg">Cash on Delivery</span>
//                 </label>
//                 <label className="flex items-center space-x-3">
//                   <input 
//                     type="radio" 
//                     name="paymentMethod" 
//                     value="Online" 
//                     checked={paymentMethod === 'Online'} 
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="h-6 w-6"
//                   />
//                   <span className="text-lg">Online Payment</span>
//                 </label>
//               </div>
//             </div>
//             {/* Online Payment Options */}
//             {paymentMethod === 'Online' && (
//               <div className="bg-gray-50 p-6 rounded-b-lg">
//                 <label className="block text-sm font-medium text-gray-700 mb-4">Online Payment Option</label>
//                 <div className="space-y-4 pl-4">
//                   <label className="flex items-center space-x-3">
//                     <input 
//                       type="radio" 
//                       name="onlinePaymentOption" 
//                       value="JazzCash" 
//                       checked={onlinePaymentOption === 'JazzCash'} 
//                       onChange={(e) => setOnlinePaymentOption(e.target.value)}
//                       className="h-4 w-4"
//                     />
//                     <span className="text-lg">JazzCash</span>
//                   </label>
//                   <label className="flex items-center space-x-3">
//                     <input 
//                       type="radio" 
//                       name="onlinePaymentOption" 
//                       value="EasyPaisa" 
//                       checked={onlinePaymentOption === 'EasyPaisa'} 
//                       onChange={(e) => setOnlinePaymentOption(e.target.value)}
//                       className="h-4 w-4"
//                     />
//                     <span className="text-lg">EasyPaisa</span>
//                   </label>
//                   <label className="flex items-center space-x-3">
//                     <input 
//                       type="radio" 
//                       name="onlinePaymentOption" 
//                       value="Credit/Debit Card" 
//                       checked={onlinePaymentOption === 'Credit/Debit Card'} 
//                       onChange={(e) => setOnlinePaymentOption(e.target.value)}
//                       className="h-4 w-4"
//                     />
//                     <span className="text-lg">Credit/Debit Card</span>
//                   </label>
//                 </div>

//                 {/* Credit/Debit Card Details */}
//                 {onlinePaymentOption === 'Credit/Debit Card' && (
//                   <div className="mt-6 space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Card Number</label>
//                       <input 
//                         type="text" 
//                         className="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
//                       <input 
//                         type="text" 
//                         className="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">CVV</label>
//                       <input 
//                         type="text" 
//                         className="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </form>
//       </div>
      
//       <div className="text-center">
//         <button className="w-full bg-blue-950 hover:opacity-80 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
//           Complete Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;


import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [onlinePaymentOption, setOnlinePaymentOption] = useState('Credit/Debit Card');
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the single product from state if it exists
  const singleProduct = location.state?.singleProduct;

  // If singleProduct exists, use it to calculate subtotal, otherwise use the cart
  const itemsToCheckout = singleProduct ? [singleProduct] : cart;
  const subtotal = itemsToCheckout.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const toggleOrderSummary = () => {
    setIsOpen(!isOpen);
  };

  // If the cart is empty and no single product is passed, display a message
  if (itemsToCheckout.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6">Your cart is empty, so you cannot checkout.</h2>
          <button
            onClick={() => navigate('/')}  // Redirect to the main products page
            className="mt-4 w-half bg-blue-950 text-white font-bold py-2 px-4 rounded-md border-2 border-blue-950 hover:bg-white hover:text-blue-950 transition duration-500"
          >
            Return to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>
      
      {/* Order Summary */}
      <div className="bg-white shadow-lg rounded-lg mb-8">
        <div 
          onClick={toggleOrderSummary} 
          className="p-6 cursor-pointer flex justify-between items-center border-b border-gray-200"
        >
          <h2 className="text-3xl font-semibold">Order Summary</h2>
          {isOpen ? <FaCaretUp size={24} /> : <FaCaretDown size={24} />}
        </div>
        {isOpen && (
          <div className="p-6 space-y-4">
            {itemsToCheckout.map((item) => (
              <div key={item._id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-lg" 
                  />
                  <div>
                    <span className="font-medium text-lg block">{item.name}</span>
                    <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-medium text-lg">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-xl pt-4 border-t border-gray-200">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Customer Information Form */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-semibold mb-6">Customer Information</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              className="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              className="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input 
              type="text" 
              className="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input 
              type="text" 
              className="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input 
              type="text" 
              className="mt-1 block w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
        </form>
      </div>
      
      {/* Payment Information Form */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-semibold mb-6">Payment Information</h2>
        <form className="space-y-6">
          {/* Payment Method */}
          <div className="border border-gray-300 rounded-lg">
            <div className="bg-gray-100 p-6 rounded-t-lg">
              <label className="block text-sm font-medium text-gray-700 mb-4">Payment Method</label>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="COD" 
                    checked={paymentMethod === 'COD'} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-6 w-6"
                  />
                  <span className="text-lg">Cash on Delivery</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="Online" 
                    checked={paymentMethod === 'Online'} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-6 w-6"
                  />
                  <span className="text-lg">Online Payment</span>
                </label>
              </div>
            </div>
            {/* Online Payment Options */}
            {paymentMethod === 'Online' && (
              <div className="bg-gray-50 p-6 rounded-b-lg">
                <label className="block text-sm font-medium text-gray-700 mb-4">Online Payment Option</label>
                <div className="space-y-4 pl-4">
                  <label className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="onlinePaymentOption" 
                      value="JazzCash" 
                      checked={onlinePaymentOption === 'JazzCash'} 
                      onChange={(e) => setOnlinePaymentOption(e.target.value)}
                      className="h-4 w-4"
                    />
                    <span className="text-lg">JazzCash</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="onlinePaymentOption" 
                      value="EasyPaisa" 
                      checked={onlinePaymentOption === 'EasyPaisa'} 
                      onChange={(e) => setOnlinePaymentOption(e.target.value)}
                      className="h-4 w-4"
                    />
                    <span className="text-lg">EasyPaisa</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="onlinePaymentOption" 
                      value="Credit/Debit Card" 
                      checked={onlinePaymentOption === 'Credit/Debit Card'} 
                      onChange={(e) => setOnlinePaymentOption(e.target.value)}
                      className="h-4 w-4"
                    />
                    <span className="text-lg">Credit/Debit Card</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
      
      {/* Complete Order Button */}
      <div className="flex justify-center">
        <button 
          onClick={() => alert('Order Completed!')}  // Implement the complete order logic here
          className="w-full bg-blue-950 text-white font-bold py-4 px-6 rounded-md border-2 border-blue-950 hover:bg-white hover:text-blue-950 transition duration-500"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;


