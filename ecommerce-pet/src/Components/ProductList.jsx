import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await onDelete(id);
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  return (
    <div className="lg:mx-auto px-4 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 text-left">
            <tr>
              <th colSpan="6" className="pt-5 px-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Product List</h2>
              </th>
            </tr>
            <tr className="hidden md:table-row">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Category</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Stock</th>
              <th className="py-3 px-6">Image</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.map((product) => (
              <tr key={product._id} className="border-b md:table-row flex flex-col md:flex-row md:justify-between md:items-center">
                <td className="py-3 px-6 md:w-auto w-full flex justify-between md:table-cell">
                  <span className="font-medium md:hidden">Name: </span>
                  {product.name}
                </td>
                <td className="py-3 px-6 md:w-auto w-full flex justify-between md:table-cell">
                  <span className="font-medium md:hidden">Category: </span>
                  {product.category}
                </td>
                <td className="py-3 px-6 md:w-auto w-full flex justify-between md:table-cell">
                  <span className="font-medium md:hidden">Price: </span>
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-3 px-6 md:w-auto w-full flex justify-between md:table-cell">
                  <span className="font-medium md:hidden">Stock: </span>
                  {product.stockQuantity}
                </td>
                <td className="py-3 px-6 md:w-auto w-full flex justify-between md:table-cell">
                  <span className="font-medium md:hidden">Image: </span>
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                </td>
                <td className="py-3 px-6 md:w-auto w-full flex justify-between md:table-cell">
                  <div>
                    <button
                      onClick={() => onEdit(product)}
                      className="m-2 bg-teal-600 text-white p-1 px-3 rounded-md hover:opacity-80"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product._id)}
                      className="ml-2 bg-red-500 text-white p-1  px-4 rounded-md hover:opacity-80"
                    >
                       Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
