const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes'); // Adjust the path if necessary
const cors = require('cors');



const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/my-ecommerce-db'
);
app.use(cors());
app.use(express.json());
app.use('/api', productRoutes); // All routes will start with /api


// Route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to Pet Product Store API');
});
// Error handling and other routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
