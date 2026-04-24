Pet-Products

A modern web app to help users browse, search, and purchase pet supplies from a curated catalog.
Pet-Products allows users to:
- Browse a catalog of pet supplies (food, toys, accessories)
- Search and filter by category, price, brand, and pet type
- View detailed product pages with images and descriptions
- Add items to a cart and simulate checkout
- Manage a user profile with order history

Features
- Product listing with search & filtering
- Shopping cart & pseudo checkout
- Product detail pages with images
- User registration, login, and profile management
- Order history tracking

Tech Stack
- Frontend: React.js, Tailwind CSS (or Bootstrap/SCSS)
- Backend: Node.js + Express
- Database: MongoDB (via Mongoose)
- Auth: JWT-based authentication
- Storage: Local or cloud image storage (e.g., AWS S3)
- API: RESTful endpoints

Installation & Setup
Prerequisites
- [Node.js](https://nodejs.org/en) & npm
- MongoDB instance (local or cloud)
Setup
1. Clone the repo:
   git clone https://github.com/KhansaWaheed7/pet-products.git
   cd pet-products
2. Install dependencies:
   npm install
3. Create a .env file in the project root:
   PORT=5000
   MONGO_URI=<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
4. Start the development server:
   npm run dev
5. Navigate to http://localhost:5000 (or your frontend port if separate) to view the app.   
