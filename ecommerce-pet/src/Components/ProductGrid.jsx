import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from './Product';
import CategoryBrowse from './CategoryBrowse';
import Header from './Header'; // Import the new Header component


const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initialize with all products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortCriteria === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === 'priceAsc') {
      return a.price - b.price;
    } else if (sortCriteria === 'priceDesc') {
      return b.price - a.price;
    }
    return 0;
  });

  const handleProductClick = (product) => {
    const productName = product.name; // Encode special characters
    navigate(`/products/${productName}`);
  };

  return (
    <div>
      <Header /> {/* Include the Header component */}
      <div className='mx-10'>
        <CategoryBrowse onSelectCategory={handleCategorySelect} />
      </div>

      <h1 className='text-blue-950 font-extrabold text-4xl px-10 py-10 text-center'>All Available Products</h1>
      <div className="mb-4 flex items-center justify-between px-4 sm:px-6">
        <p className="text-sm sm:text-md font-serif font-medium text-teal-600 ml-3">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
        <div className="flex items-center mr-3">
          <select
            id="sort"
            value={sortCriteria}
            onChange={handleSortChange}
            className="border rounded-lg px-2 py-1 text-sm sm:text-md"
          >
            <option value="default">Default Sorting</option>
            <option value="name">Alphabetical Sorting</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="pb-10 pt-6 mx-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <div key={product._id} onClick={() => handleProductClick(product)}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
