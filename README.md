# MERN Stack Website Forever TrendHive Project

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation Guide](#installation-guide)
5. [Project Structure](#project-structure)
6. [API Endpoints](#api-endpoints)
7. [Deployment](#deployment)
8. [License](#license)

---

## Introduction

This project is a **Forever TrendHive** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). The website allows users to explore products, filter and sort items, select product variants (like size), add items to the cart, and place orders using either **Cash on Delivery** or online payment methods (**Stripe** and **Razorpay**). Additionally, the project includes an admin dashboard for managing products and orders.

The project is fully deployed on **Vercel**, ensuring easy accessibility and scalability.

---

## Features

### User Features:
- Browse products with filtering and sorting options.
- Add products to the cart with variant selection (e.g., size).
- Place orders by providing a delivery address.
- Choose from two payment methods: Cash on Delivery or Online Payment (via Stripe or Razorpay).

### Admin Features:
- Add new products to the store.
- Delete existing products.
- View and manage all products and orders in the admin dashboard.

---

## Technologies Used

### Frontend:
- **React.js** (with React Router for navigation)
- **Tailwind CSS** (for responsive and modern UI)
- **Redux Toolkit** (for state management)

### Backend:
- **Node.js** (runtime environment)
- **Express.js** (backend framework)
- **MongoDB** (NoSQL database for data storage)
- **Stripe** and **Razorpay** (payment gateways)

### Deployment:
- **Vercel** (for hosting both frontend and backend)
- **MongoDB Atlas** (for cloud-based database hosting)

---

## Installation Guide

### Prerequisites:
- Node.js and npm installed.
- MongoDB database (local or cloud-based, such as MongoDB Atlas).
- Stripe and Razorpay accounts for payment gateway integration.

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-mern.git
   cd ecommerce-mern

2. Install dependencies for both frontend and backend:
cd frontend
npm install
cd ../backend
npm install

3. Set up environment variables:

-Create a .env file in the backend folder.
-Add the following variables:
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
JWT_SECRET=your_jwt_secret

4. Start the development server:

-Backend:
cd backend
npm start

-Frontend:
cd frontend
npm start

5. Open the application in your browser at http://localhost:4000.

/ecommerce-mern
|-- /Admin
|   |-- /src
|   |   |-- assets
|   |   |-- components
|   |   |-- pages
|   |-- package.json
|-- /frontend
|   |-- /src
|   |   |-- assets
|   |   |-- components
|   |   |-- context
|   |   |-- pages
|   |-- package.json
|-- /backend
|   |   |-- /config
|   |   |-- /controllers
|   |   |-- /middleware
|   |   |-- /models
|   |   |-- /routes
|   |   |-- server.js
|   |   |-- package.json


## API Endpoints:

### User Authentication:
-POST /api/auth/register: Register a new user.
-POST /api/auth/login: Login for existing users.

### Product Management:
-GET /api/products: Fetch all products.
-POST /api/products: Add a new product (Admin only).
-DELETE /api/products/:id: Delete a product (Admin only).

### Cart and Orders:
-POST /api/cart: Add items to cart.
-POST /api/orders: Place an order.

## Deployment
1. Deploy the frontend and backend to Vercel:

-For the backend, ensure the Vercel project includes your .env variables.

-For the frontend, update API URLs to point to the deployed backend.

2. Configure MongoDB Atlas for database hosting.

3. Access the deployed application via your Vercel-provided domain.

## License
This project is licensed under the MIT License. You are free to use, modify, and distribute it as per the terms of the license.
