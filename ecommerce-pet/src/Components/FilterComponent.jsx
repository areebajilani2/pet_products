import React, { useState } from 'react';

const FilterComponent = ({ onFilter }) => {
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    onFilter({ brand, category, minPrice, maxPrice });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Filter Products</h2>
      <div className="mb-4">
        <label className="block mb-2">Brand:</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Price Range:</label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min Price"
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max Price"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
      <button
        onClick={handleFilter}
        className="bg-blue-950 text-white py-2 px-4 rounded-md"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterComponent;
