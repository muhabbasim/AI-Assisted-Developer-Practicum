# E-Commerce Backend API

REST API built with Node.js, Express, and PostgreSQL for an e-commerce application.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (hosted on Neon)
- **Database Client**: pg
- **Authentication**: express-session + connect-pg-simple
- **Password Security**: bcryptjs
- **Deployment**: Railway

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database (Neon account)
- npm or yarn

## Setup Instructions

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your:
   - Neon PostgreSQL connection string
   - Session secret key
   - Frontend URL (for CORS)

3. **Set up database tables**
   - Tables will be created automatically on first run
   - See `src/config/database.js` for schema

4. **Seed products from frontend**
   ```bash
   npm run seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   The API will run on `http://localhost:5001`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update item quantity
- `DELETE /api/cart/:productId` - Remove item from cart

### Orders
- `POST /api/orders` - Create order (checkout)
- `GET /api/orders` - Get user's order history
- `GET /api/orders/:id` - Get single order details

### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## Database Schema

### users
- id (PRIMARY KEY)
- email (UNIQUE)
- password_hash
- name
- created_at

### products
- id (PRIMARY KEY)
- name
- price
- category
- image
- stock_quantity
- description
- created_at

### carts
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- product_id (FOREIGN KEY)
- quantity
- created_at
- updated_at

### orders
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- total_amount
- status
- created_at

### order_items
- id (PRIMARY KEY)
- order_id (FOREIGN KEY)
- product_id (FOREIGN KEY)
- quantity
- price_at_purchase

## Development

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start

# Seed database with products
npm run seed
```

## Deployment

This API is designed to be deployed on Railway. See Railway documentation for deployment steps.

## Security Features

- Password hashing with bcryptjs
- Secure session management
- HTTP-only session cookies
- CORS protection
- Input validation

## License

ISC
