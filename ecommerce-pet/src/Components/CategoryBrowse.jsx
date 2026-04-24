import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Pet Food', description: 'Browse a wide range of wet and dry food for cats, dogs, and all other animals.', icon: '🐾' },
  { id: 2, name: 'Health Supplies', description: 'Check out all the health supplies like multivitamins and weight-gain supplements.', icon: '💊' },
  { id: 3, name: 'Flea & Tick Control', description: 'Protect your furry friend with the best bug control sprays and tools.', icon: '🕷️' },
  { id: 4, name: 'Litter & Accessories', description: 'Shop the best litter, training pads, and other accessories.', icon: '🏠' },
  { id: 5, name: 'Toys', description: 'Find fun and engaging toys for your pets to keep them entertained and active.', icon: '🎾' },
  { id: 6, name: 'Grooming Supplies', description: 'Explore grooming tools, shampoos, and other supplies to keep your pets looking their best.', icon: '✂️' },
  { id: 7, name: 'Treats', description: 'Discover delicious treats to reward and pamper your pets.', icon: '🍖' },
];

const CategoryBrowse = ({ onSelectCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`products/category/${categoryName}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-4xl font-bold text-center text-teal-600 pl-10 ">Browse by Category</h2>
      <div className="flex items-center space-x-6">
    
        <div className="flex-1 overflow-x-auto border-x-2 border-gray-100 scrollbar-hide relative ">
          <div className="flex space-x-6 py-3 px-4">
            {categories.map(category => (
              <div
                key={category.id}
                className="bg-white border border-gray-100 shadow-none hover:shadow-lg hover:shadow-gray-200 rounded-none p-6 text-center cursor-pointer transition-shadow min-w-[200px]"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-teal-600 mb-2">{category.name}</h3>
                <p className="text-blue-950">{category.description}</p>
              </div>
            ))}
            <div className=' pl-0.5'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBrowse;
