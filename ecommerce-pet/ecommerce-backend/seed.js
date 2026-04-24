// seed.js
const mongoose = require('mongoose');
const Product = require('./models/product');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my-ecommerce-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample products data
const products = 
[
  {
    "name": "All-Natural Dog Supplement",
    "category": "health supplies",
    "price": 22.50,
    "description": "Natural supplement for overall health and vitality.",
    "image": "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
    "stockQuantity": 25,
    "brand": "HealthBoost",
    "tags": ["premium"],
    "images": [
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png"
    ]
  },
  {
    "name": "Pet Brush for Sensitive Skin",
    "category": "grooming supplies",
    "price": 13.75,
    "description": "Gentle brush for pets with sensitive skin.",
    "image": "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
    "stockQuantity": 45,
    "brand": "SensitiveGroom",
    "tags": ["affordable"],
    "images": [
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png"
    ]
  },
  {
    "name": "Professional Pet Clippers",
    "category": "grooming supplies",
    "price": 25.00,
    "description": "High-quality clippers for professional grooming.",
    "image": "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
    "stockQuantity": 20,
    "brand": "ClipMaster",
    "tags": ["premium"],
    "images": [
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png"
    ]
  },
  {
    "name": "High-Back Cat Litter Box",
    "category": "litter and accessories",
    "price": 14.00,
    "description": "Cat litter box with high back to prevent spills.",
    "image": "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
    "stockQuantity": 40,
    "brand": "HighBackBox",
    "tags": ["essential"],
    "images": [
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png"
    ]
  },
  {
    "name": "Cat Litter Deodorizer Powder",
    "category": "litter and accessories",
    "price": 7.99,
    "description": "Deodorizing powder to control litter box odors.",
    "image": "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
    "stockQuantity": 55,
    "brand": "OdorControl",
    "tags": ["premium"],
    "images": [
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png"
    ]
  },
  {
    "name": "Bacon-Flavored Dog Treats",
    "category": "treats",
    "price": 6.00,
    "description": "Delicious bacon-flavored treats for dogs.",
    "image": "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
    "stockQuantity": 80,
    "brand": "BaconBites",
    "tags": ["affordable"],
    "images": [
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png"
    ]
  },
  {
    "name": "Tuna Cat Treats",
    "category": "treats",
    "price": 7.00,
    "description": "Tasty tuna treats for cats.",
    "image": "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
    "stockQuantity": 50,
    "brand": "TunaTreat",
    "tags": ["premium"],
    "images": [
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png"
    ]
  },
  {
    "name": "All-Natural Dog Food for Large Breeds",
    "category": "pet food",
    "price": 19.99,
    "description": "Nutritionally balanced food for large breed dogs.",
    "image": "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
    "stockQuantity": 45,
    "brand": "BigPaws",
    "tags": ["essential"],
    "images": [
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png"
    ]
  },
  {
    "name": "Weight Control Cat Food",
    "category": "pet food",
    "price": 12.00,
    "description": "Specially formulated food to help control weight in cats.",
    "image": "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
    "stockQuantity": 50,
    "brand": "SlimCat",
    "tags": ["affordable"],
    "images": [
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png"
    ]
  },
  {
    "name": "Durable Dog Tug Toy",
    "category": "toys",
    "price": 8.50,
    "description": "Durable tug toy for dogs of all sizes.",
    "image": "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
    "stockQuantity": 70,
    "brand": "TugTough",
    "tags": ["affordable"],
    "images": [
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png",
      "https://chubbymeows.com/wp-content/uploads/2021/11/D-Tick-Spray-Advanced-for-Pet-Flea-Tick-Control-All.png"
    ]
  }
]

  
  




// Insert sample products into the database
Product.insertMany(products)
  .then(() => {
    console.log('Products inserted successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error inserting products:', error);
    mongoose.connection.close();
  });
