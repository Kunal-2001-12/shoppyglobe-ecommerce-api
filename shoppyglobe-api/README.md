# ShoppyGlobe API

A simple Node.js + Express backend for an e-commerce application with MongoDB (Atlas) integration.

## Deep Project Description

ShoppyGlobe API is a robust backend service designed for modern e-commerce applications. It provides a secure, scalable, and modular RESTful API for managing users, products, and shopping carts. Built with Node.js, Express, and MongoDB, it follows best practices for authentication, error handling, and code organization.

### Key Features
- **User Authentication:** Secure registration and login using JWT. Passwords are hashed with bcryptjs for safety.
- **Product Management:** CRUD operations for products, including creation, listing, and fetching by ID. Each product has a name, price, description, and stock quantity.
- **Cart Management:** Authenticated users can add, update, and remove products in their cart. Cart data is stored per user and validated against product stock.
- **MongoDB Integration:** All data is persisted in MongoDB Atlas, with Mongoose schemas for Users, Products, and Cart.
- **Error Handling & Validation:** All endpoints include input validation and return clear error messages for invalid requests or server errors.
- **Modular Codebase:** Code is organized into models, routes, controllers, and middleware for maintainability and scalability.
- **Environment Configuration:** Sensitive data and configuration are managed via a `.env` file.

### Technologies Used
- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Fast, unopinionated web framework for Node.js.
- **MongoDB Atlas**: Cloud-hosted NoSQL database for storing all application data.
- **Mongoose**: ODM for MongoDB, providing schema validation and easy data manipulation.
- **JWT (jsonwebtoken)**: For secure authentication and route protection.
- **bcryptjs**: For password hashing.
- **dotenv**: For environment variable management.
- **cors**: To enable cross-origin requests.
- **nodemon**: For development auto-reloading.

### Security
- All sensitive routes (cart operations) are protected by JWT authentication middleware.
- Passwords are never stored in plain text.
- Only authenticated users can modify their cart.

### How It Works
1. **User Registration/Login:**
   - Users register with a username, email, and password. Passwords are hashed before storage.
   - On login, a JWT token is issued, which must be sent in the `x-auth-token` header for protected routes.
2. **Product Endpoints:**
   - Anyone can fetch all products or a single product by ID.
   - Admins (or via POST) can add new products.
3. **Cart Endpoints:**
   - Only logged-in users can add, update, or remove items in their cart.
   - Cart operations validate product existence and stock before updating.

### Example API Usage
- **Register:** `POST /api/auth/register` with `{ username, email, password }`
- **Login:** `POST /api/auth/login` with `{ email, password }` (returns JWT)
- **Get Products:** `GET /api/products`
- **Add to Cart:** `POST /api/cart` with `{ productId, quantity }` and JWT in `x-auth-token`

### Best Practices Followed
- Modular folder structure for scalability
- Environment variables for secrets and configuration
- Proper error handling and input validation
- Secure password storage and JWT authentication

## Features
- User authentication (register/login with JWT)
- Product management (fetch all, fetch by ID)
- Cart management (add, update, remove items)
- Secure routes with JWT middleware

## Folder Structure
```
shoppyglobe-api/
├── server.js
├── .env
├── package.json
├── controllers/
│   └── cartController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Product.js
│   └── CartItem.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   └── cart.js
```

## Getting Started

### 1. Clone the repository
```
git clone < https://github.com/Kunal-2001-12/shoppyglobe-ecommerce-api.git >
cd shoppyglobe-api
```

### 2. Install dependencies
```
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

### 4. Start the server
For development (with auto-reload):
```
npm run dev
```
For production:
```
npm start
```

## API Endpoints

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and get JWT

### Products
- `GET /api/products` — Get all products
- `GET /api/products/:id` — Get product by ID

### Cart (requires JWT in `x-auth-token` header)
- `GET /api/cart` — Get current user's cart
- `POST /api/cart` — Add product to cart
- `PUT /api/cart/:id` — Update cart item quantity
- `DELETE /api/cart/:id` — Remove item from cart

## Product API Test Cases (Thunder Client)

### Step 1: POST – Add Product (T-shirt)
- **Method:** POST
- **URL:** http://localhost:5000/api/products
- **Headers:**
  - Content-Type: application/json
- **Body:**
```json
{
  "name": "Cotton T-shirt",
  "price": 499,
  "description": "100% cotton comfortable round-neck T-shirt",
  "stockQty": 50
}
```
- **Screenshot:**
  ![POST Add Product](../Pictures/Screenshots/test%20all%20API%20cases%20in%20Thunder%20Client/POST%20%E2%80%94%20Add%20Product%20%231%20(T-shirt).png)

---

### Step 2: GET – Fetch All Products
- **Method:** GET
- **URL:** http://localhost:5000/api/products
- **Screenshot:**
  ![GET All Products](../Pictures/Screenshots/test%20all%20API%20cases%20in%20Thunder%20Client/GET%20%E2%80%94%20Fetch%20All%20Products.png)

---

### Step 3: GET – Fetch Product by Valid ID
- **Method:** GET
- **URL:** http://localhost:5000/api/products/&lt;product_id&gt;
  - Replace &lt;product_id&gt; with the actual product ID returned in Step 1.
- **Screenshot:**
  ![GET Product by ID](../Pictures/Screenshots/test%20all%20API%20cases%20in%20Thunder%20Client/GET%20Fetch%20Product%20by%20Valid%20id.png)

---

### Step 4: POST – Error Test (Missing Fields)
- **Method:** POST
- **URL:** http://localhost:5000/api/products
- **Headers:**
  - Content-Type: application/json
- **Body:**
```json
{
  "name": "Incomplete Product"
}
```
- **Expected:**
  - Status: 400 Bad Request
  - Message: "Please provide all required fields"
- **Screenshot:**
  ![POST Product Error](../Pictures/Screenshots/test%20all%20API%20cases%20in%20Thunder%20Client/ERROR%20TEST%20%E2%80%94%20Send%20Incomplete%20POST%20(Missing%20fields).png)

---

### Step 5: GET – Error Test (Invalid Product ID)
- **Method:** GET
- **URL:** http://localhost:5000/api/products/12345invalidid
- **Expected:**
  - Status: 404 Not Found
  - Message: "Product not found"
- **Screenshot:**
  ![GET Product Invalid ID](../Pictures/Screenshots/test%20all%20API%20cases%20in%20Thunder%20Client/ERROR%20TEST%20GET%20Invalid%20Product%20id.png)

## User Registration & Login API Test Cases (Thunder Client)

### 1. User Registration
- **Method:** POST
- **URL:** http://localhost:5000/api/users/register
- **Headers:**
  - Content-Type: application/json
- **Body (JSON):**
```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "yourpassword"
}
```
- **Expected Response:**
  - Status: 200 OK
  - JSON with a JWT token and user info
- **Screenshot:**
  ![User Registration](../Pictures/Screenshots/test%20all%20API%20cases%20in%20Thunder%20Client/User%20Registration.png)

---

### 2. User Login
- **Method:** POST
- **URL:** http://localhost:5000/api/users/login
- **Headers:**
  - Content-Type: application/json
- **Body (JSON):**
```json
{
  "email": "testuser@example.com",
  "password": "yourpassword"
}
```
- **Expected Response:**
  - Status: 200 OK
  - JSON with a JWT token and user info
- **Screenshot:**
  ![User Login](../Pictures/Screenshots/test%20all%20API%20cases%20in%20Thunder%20Client/User%20Login.png)

---

## Notes
- Make sure your MongoDB Atlas URI is correct in `.env`.
- Use Postman or similar tool to test endpoints.
- JWT token must be sent in `x-auth-token` header for protected routes.

---

**Enjoy building with ShoppyGlobe API!**
