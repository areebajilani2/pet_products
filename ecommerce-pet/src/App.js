import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './Components/ScrollToTop';
import Navbar from './Components/Navbar'; 
import Footer from './Components/Footer'; 
import ProductGrid from './Components/ProductGrid';
import ProductDetails from './Components/ProductDetails';
import Cart from './Components/Cart';
import CheckoutPage from './Components/CheckoutPage'; 
import AdminPanel from './Components/AdminPanel'
import CategoryProducts from './Components/CategoryProducts';
import SearchResults from './Components/SearchResults';
import Brand from './Components/Brand';
import CartSidebar from './Components/CartSidebar';

const App = () => {
  return (

    <Router>
      <ScrollToTop /> 
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ProductGrid />} />
            <Route path="/products/:name" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/products/category/:categoryName" element={<CategoryProducts />} /> 
            <Route path="/products/brand/:brandName" element={<Brand />} />
            <Route path="/products/search/" element={<SearchResults />} />

          </Routes>
          <CartSidebar />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
