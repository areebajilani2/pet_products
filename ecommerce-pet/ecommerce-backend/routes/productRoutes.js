const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Adjust the path if necessary

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get products by category

router.get('/products/category/:categoryName', async (req, res) => {
  try {
    const categoryName = req.params.categoryName.toLowerCase(); // Convert to lowercase
    const products = await Product.find({ category: { $regex: new RegExp('^' + categoryName + '$', 'i') } }); // Case-insensitive regex
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get products by brand

router.get('/products/brand/:brandName', async (req, res) => {
  try {
    const brandName = req.params.brandName.toLowerCase(); // Convert to lowercase
    const products = await Product.find({ brand: { $regex: new RegExp('^' + brandName + '$', 'i') } }); // Case-insensitive regex
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Search
router.get('/products/search', async (req, res) => {
  console.log('Search route hit'); // Debugging line
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Search across name, category, and brand fields
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },  // Case-insensitive search on name
        { category: { $regex: query, $options: 'i' } },  // Case-insensitive search on category
        { brand: { $regex: query, $options: 'i' } }  // Case-insensitive search on brand
      ]
    }).limit(10);

    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching search results:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;



// Find product by name
router.get('/products/:name', async (req, res) => {
  try {
    const productName = decodeURIComponent(req.params.name); // Decode URL
    console.log('Decoded product name:', productName); // Debugging

    const product = await Product.findOne({ name: productName });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error:', error.message); // Debugging
    res.status(400).json({ error: error.message });
  }
});


router.post('/products', async (req, res) => {
  const { name, category, price, description, image, images, stockQuantity, brand, tags } = req.body;

  try {
    // Check if a product with the same name and brand already exists
    console.log('Checking for existing product:', name, brand);
    const existingProduct = await Product.findOne({ name: name.trim(), brand: brand.trim() });
    console.log('Existing product found:', existingProduct);
    if (existingProduct) {
      // If the product exists, send a 409 Conflict status with a message
      return res.status(409).json({ error: 'Product already exists' });
    }

    // If no duplicate is found, create and save the new product
    const newProduct = new Product({ name, category, price, description, image, images, stockQuantity, brand, tags });
    await newProduct.save();

    // Send the newly created product as a response
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});








// Update a product
router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
