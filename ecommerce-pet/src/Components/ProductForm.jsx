import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, initialData = {}, buttonText }) => {
  const [formData, setFormData] = useState({
    _id: initialData._id || '',
    name: initialData.name || '',
    category: initialData.category || '',
    price: initialData.price || '',
    description: initialData.description || '',
    image: initialData.image || '',
    images: initialData.images ? initialData.images.join(', ') : '',
    stockQuantity: initialData.stockQuantity || '',
    brand: initialData.brand || '',
    tags: initialData.tags ? initialData.tags.join(', ') : '',
  });

  useEffect(() => {
    setFormData({
      _id: initialData._id || '',
      name: initialData.name || '',
      category: initialData.category || '',
      price: initialData.price || '',
      description: initialData.description || '',
      image: initialData.image || '',
      images: initialData.images ? initialData.images.join(', ') : '',
      stockQuantity: initialData.stockQuantity || '',
      brand: initialData.brand || '',
      tags: initialData.tags ? initialData.tags.join(', ') : '',
    });
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      _id: formData._id,
      ...formData,
      images: formData.images.split(',').map((img) => img.trim()),
      tags: formData.tags.split(',').map((tag) => tag.trim()),
    };
    console.log('Submitting product data:', productData);
    onSubmit(productData);
    setFormData({
      _id: '',
      name: '',
      category: '',
      price: '',
      description: '',
      image: '',
      images: '',
      stockQuantity: '',
      brand: '',
      tags: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-10 bg-white shadow-md rounded-lg w-11/12 mx-auto">
      <h2 className="text-2xl text-blue-950 font-bold mb-6 text-center">{buttonText}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-blue-950">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-950">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product category"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-950">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product price"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-950">Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter stock quantity"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-950">Main Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product image URL"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-950">Additional Images URLs (comma-separated)</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter additional images URLs"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-950">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product brand"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-950">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product tags"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-blue-950">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product description"
            rows="4"
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <button type="submit" className="w-full py-2 px-4 bg-blue-950 text-white rounded-md hover:opacity-85">
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
