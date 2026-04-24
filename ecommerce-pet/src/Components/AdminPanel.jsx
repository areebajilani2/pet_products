import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/products', productData);
      console.log('Product added successfully:', response.data);
      setProducts([...products, response.data]);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Product already exists');
      } else {
        console.error('Error adding product:', error);
      }
    }
  };

  const handleEditProduct = async (product) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/products/${product._id}`, product);
      console.log('Product updated:', response.data);
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error editing product:', error);
      alert('Error updating product');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Error deleting product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <div className="w-4/5 mx-auto flex flex-col gap-8">
          <div className="flex flex-col">
            <ProductForm
              onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
              initialData={editingProduct || {}}
              buttonText={editingProduct ? 'Update Product' : 'Upload Product'}
            />
          </div>
          <div className="flex flex-col">
            <ProductList
              products={products}
              onEdit={(product) => setEditingProduct(product)}
              onDelete={handleDeleteProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
