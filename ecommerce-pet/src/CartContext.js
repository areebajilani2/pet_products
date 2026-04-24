import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const CartContext = createContext();

// Create a custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Load cart from local storage on initial render
  useEffect(() => {
    console.log('Loading cart from local storage...');
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      console.log('Cart loaded:', parsedCart);
      setCart(parsedCart);
    }
  }, []);
  
  useEffect(() => {
    console.log('Saving cart to local storage:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  
  // Function to add item to cart
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item._id === product._id);
    if (existingProduct) {
      // Update quantity if product already in cart
      setCart(cart.map(item => 
        item._id === product._id 
          ? { ...item, quantity: item.quantity + product.quantity } 
          : item
      ));
    } else {
      // Add new product to cart
      setCart([...cart, { ...product, quantity: product.quantity }]);
    }
    setSidebarVisible(true);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (productId, delta) => {
    setCart(cart => {
      const updatedCart = cart.map(item =>
        item._id === productId
          ? { ...item, quantity: item.quantity + delta }
          : item
      ).filter(item => item.quantity > 0); // Remove items with zero or negative quantity
  
      // If item quantity drops to zero, filter it out
      return updatedCart;
    });
  };
  const getTotalItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItemCount,isSidebarVisible, 
      closeSidebar 
     }}>
      {children}
    </CartContext.Provider>
  );
};

