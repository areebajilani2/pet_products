import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Product from './Product';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('default');
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-10">No results found for "{query}".</div>;
  }

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleProductClick = (product) => {
    const productName = product.name; // Encode special characters
    navigate(`/products/${productName}`);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortCriteria === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === 'priceAsc') {
      return a.price - b.price;
    } else if (sortCriteria === 'priceDesc') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className='text-center text-blue-950 font-extrabold text-3xl sm:text-4xl px-4 sm:px-6 md:px-10 py-6 sm:py-8'>
        Search Results for "{query}"
      </h1>
      <div className="mb-4 flex items-center justify-between px-4 sm:px-6">
        <p className="text-sm sm:text-md font-serif font-medium text-teal-600">
          Showing {products.length} {products.length === 1 ? 'result' : 'results'}
        </p>
        <div className="flex items-center">
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
      <div className="pb-10 pt-6 mx-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div key={product._id} onClick={() => handleProductClick(product)}>
                <Product product={product} />
              </div>
            ))}
        </div>
    </div>
  );
};

export default SearchResults;
