// import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useCart } from '../CartContext';
// import axios from 'axios';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [recommendations, setRecommendations] = useState([]);
//   const { getTotalItemCount } = useCart();
//   const navigate = useNavigate();
//   const location = useLocation(); // Hook to get the current route

//   const dropdownRef = useRef(null);
//   const searchInputRef = useRef(null);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         searchInputRef.current &&
//         !searchInputRef.current.contains(event.target)
//       ) {
//         setRecommendations([]);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     // Clear searchTerm if navigating to a route other than the search results page
//     if (location.pathname !== '/products/search') {
//       setSearchTerm('');
//       setRecommendations([]);
//     }
//   }, [location.pathname]); // Effect runs when the pathname changes

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchTerm(query);

//     if (query.trim()) {
//       fetchRecommendations(query);
//     } else {
//       setRecommendations([]);
//     }
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       setRecommendations([]); // Clear the dropdown when navigating
//       navigate(`/products/search?q=${encodeURIComponent(searchTerm.trim())}`);
//     }
//   };

//   const clearSearch = () => {
//     setSearchTerm('');
//     setRecommendations([]);
//   };

//   const fetchRecommendations = async (query) => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/products/search', {
//         params: { q: query }
//       });
//       setRecommendations(response.data);
//     } catch (error) {
//       console.error('Error fetching search recommendations', error);
//       setRecommendations([]);
//     }
//   };

//   return (
//     <nav className="w-full bg-gradient-to-b from-white to-gray-100 p-4 shadow-md sticky top-0 z-10">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-blue-950 text-lg font-bold">
//           <Link to="/" className="hover:text-gray-300 pr-4">PetConnect</Link>
//         </div>
//         <div className="relative flex items-center justify-center w-full max-w-xs">
//           <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 w-full">
//             <div className="relative flex-grow">
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 className="border border-gray-300 rounded-full py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-teal-700 pr-10"
//               />
//               {searchTerm && (
//                 <button
//                   type="button"
//                   onClick={clearSearch}
//                   className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
//                 >
//                   <FontAwesomeIcon icon={faTimes} />
//                 </button>
//               )}
//             </div>
//             <button type="submit" className="bg-teal-700 text-white rounded-full p-2 focus:outline-none">
//               <FontAwesomeIcon icon={faSearch} />
//             </button>
//           </form>
//           {recommendations.length > 0 && (
//             <div
//               ref={dropdownRef}
//               className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10"
//             >
//               {recommendations.map((item) => (
//                 <Link
//                   key={item._id}
//                   to={`/products/${encodeURIComponent(item.name)}`}
//                   className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
//                   onClick={() => {
//                     setRecommendations([]);
//                     setSearchTerm('');
//                   }}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//         <div className="flex items-center space-x-6 hidden md:flex">
//           <Link to="/checkout" className="text-blue-950 hover:text-gray-400 font-bold text-xl">Checkout</Link>
//           <Link to="/cart" className="relative inline-flex items-center">
//             <FontAwesomeIcon icon={faShoppingCart} className="text-blue-950 text-2xl" />
//             {getTotalItemCount() > 0 && (
//               <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-teal-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {getTotalItemCount()}
//               </span>
//             )}
//           </Link>
//         </div>
//         <div className="md:hidden flex items-center pl-3">
//           <button onClick={toggleMenu} className="text-blue-950 focus:outline-none">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               ></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//       {isOpen && (
//         <div className="md:hidden bg-gradient-to-b from-white to-gray-100 flex flex-col items-end">
//           <Link to="/checkout" className="block text-blue-950 font-bold hover:text-gray-400 py-2 px-4">Checkout</Link>
//           <Link to="/cart" className="relative inline-flex items-center text-blue-950 hover:text-gray-400 py-2 px-4">
//             <FontAwesomeIcon icon={faShoppingCart} className="mr-2 text-xl" />
//             {getTotalItemCount() > 0 && (
//               <span className="absolute top-0 right-0 mr-5 transform translate-x-1/2 -translate-y-1/2 bg-teal-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {getTotalItemCount()}
//               </span>
//             )}
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../CartContext';
import axios from 'axios';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendations, setRecommendations] = useState({ products: [], brands: [], categories: [] });
  const { getTotalItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setRecommendations({ products: [], brands: [], categories: [] });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/products/search') {
      setSearchTerm('');
      setRecommendations({ products: [], brands: [], categories: [] });
    }
  }, [location.pathname]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim()) {
      fetchRecommendations(query);
    } else {
      setRecommendations({ products: [], brands: [], categories: [] });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setRecommendations({ products: [], brands: [], categories: [] });
  
      // Check if searchTerm matches any category or brand
      if (recommendations.categories.some(category => typeof category === 'string' && category.toLowerCase() === searchTerm.trim().toLowerCase())) {
        navigate(`/products/category/${encodeURIComponent(searchTerm.trim())}`);
      } else if (recommendations.brands.some(brand => typeof brand === 'string' && brand.toLowerCase() === searchTerm.trim().toLowerCase())) {
        navigate(`/products/brand/${encodeURIComponent(searchTerm.trim())}`);
      } else {
        navigate(`/products/search?q=${encodeURIComponent(searchTerm.trim())}`);
      }
    }
  };
  

  const clearSearch = () => {
    setSearchTerm('');
    setRecommendations({ products: [], brands: [], categories: [] });
  };

  const fetchRecommendations = async (query) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/search', {
        params: { q: query }
      });
      console.log('API response:', response.data); // Check the format of response
      const products = response.data.filter(item => typeof item.name === 'string'); // Validate field types
      const brands = response.data.filter(item => typeof item.brand === 'string');
      const categories = response.data.filter(item => typeof item.category === 'string');
  
      setRecommendations({ products, brands, categories });
    } catch (error) {
      console.error('Error fetching search recommendations', error);
      setRecommendations({ products: [], brands: [], categories: [] });
    }
  };
  

  return (
    <nav className="w-full bg-gradient-to-b from-white to-gray-100 p-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-blue-950 text-lg font-bold">
          <Link to="/" className="hover:text-gray-300 pr-4">PetConnect</Link>
        </div>
        <div className="relative flex items-center justify-center w-full max-w-xs">
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 w-full">
            <div className="relative flex-grow">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-full py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-teal-700 pr-10"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </div>
            <button type="submit" className="bg-teal-700 text-white rounded-full p-2 focus:outline-none">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          {(recommendations.products.length > 0 || recommendations.brands.length > 0 || recommendations.categories.length > 0) && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto scrollbar-hide"
            >
              {recommendations.products.length > 0 && (
                <div className="border-b border-gray-300">
                  <div className="px-4 py-2 font-semibold text-gray-700">Products</div>
                  {recommendations.products.map((item) => (
                    <Link
                      key={item._id}
                      to={`/products/${encodeURIComponent(item.name)}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => {
                        setRecommendations({ products: [], brands: [], categories: [] });
                        setSearchTerm('');
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
              {recommendations.brands.length > 0 && (
                <div className="border-b border-gray-300">
                  <div className="px-4 py-2 font-semibold text-gray-700">Brands</div>
                  {recommendations.brands.map((item) => (
                    <Link
                      key={item}
                      to={`/products/brand/${encodeURIComponent(item.brand)}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => {
                        setRecommendations({ products: [], brands: [], categories: [] });
                        setSearchTerm('');
                      }}
                    >
                      {item.brand}
                    </Link>
                  ))}
                </div>
              )}
              {recommendations.categories.length > 0 && (
                <div>
                  <div className="px-4 py-2 font-semibold text-gray-700">Categories</div>
                  {recommendations.categories.map((item) => (
                    <Link
                      key={item}
                      to={`/products/category/${encodeURIComponent(item.category)}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => {
                        setRecommendations({ products: [], brands: [], categories: [] });
                        setSearchTerm('');
                      }}
                    >
                      {item.category}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className=" items-center space-x-6 hidden md:flex">
             <Link to="/checkout" className="text-blue-950 hover:text-gray-400 font-bold text-xl">Checkout</Link>
             <Link to="/cart" className="relative inline-flex items-center">
               <FontAwesomeIcon icon={faShoppingCart} className="text-blue-950 text-2xl" />
              {getTotalItemCount() > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-teal-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItemCount()}
              </span>
            )}
          </Link>
        </div>
        <div className="md:hidden flex items-center pl-3">
          <button onClick={toggleMenu} className="text-blue-950 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-white to-gray-100 flex flex-col items-end">
          <Link to="/checkout" className="block text-blue-950 font-bold hover:text-gray-400 py-2 px-4">Checkout</Link>
          <Link to="/cart" className="relative inline-flex items-center text-blue-950 hover:text-gray-400 py-2 px-4">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2 text-xl" />
            {getTotalItemCount() > 0 && (
              <span className="absolute top-0 right-0 mr-5 transform translate-x-1/2 -translate-y-1/2 bg-teal-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItemCount()}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );}