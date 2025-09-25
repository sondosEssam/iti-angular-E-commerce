# ITI Shop - Angular E-commerce Application

A modern e-commerce application built with Angular 17+ and Bootstrap 5, featuring complete shopping experience with user authentication, product management, and admin dashboard.

## Features

**Customer Features:**
- User authentication (register, login, password reset)
- Product browsing with category filtering and live search
- Shopping cart with quantity management
- Secure checkout with form validation
- Order history and tracking
- Responsive design

**Admin Features:**
- Dashboard with metrics
- Product management (CRUD operations)
- User management
- Order management
- Admin can shop as regular customer

**Technical Features:**
- Standalone Angular components
- Reactive forms with validation
- Route guards for protected pages
- JSON Server for mock backend
- Global notification system

## Technology Stack

- Angular 17+, Bootstrap 5, JSON Server, Angular Signals, Reactive Forms

## Prerequisites

- Node.js 16+, npm 8+, Angular CLI 17+

## Installation

1. Clone and install dependencies:
```bash
git clone https://github.com/sondosEssam/iti-angular-E-commerce
cd E-commerce
npm install
```

2. Install JSON Server globally:
```bash
npm install -g json-server
```

3. Start both servers:
```bash
# Terminal 1: Start JSON Server
json-server --watch db.json --port 3000

# Terminal 2: Start Angular dev server
ng serve
```

4. Open `http://localhost:4200`

## API Endpoints

The application uses JSON Server for mock backend with these endpoints:

- **Products:** GET/POST/PUT/DELETE `/products` - Product CRUD operations
- **Users:** GET/POST/PUT `/users` - User management and authentication
- **Cart:** GET/POST/PUT/DELETE `/cart?userId=:id` - User-specific cart operations
- **Orders:** GET/POST `/orders` - Order creation and retrieval
- **Categories:** GET `/categories` - Product categories

## User Roles

### Customer Role
- Browse and search products with filtering
- Add items to cart and manage quantities
- Complete checkout process with address validation
- View order history and tracking information
- Manage personal profile

### Admin Role
- All customer features plus:
- Access admin dashboard with metrics
- Create, edit, and delete products
- Manage user accounts and roles
- View and manage all orders
- Can shop as regular customer when needed

## Default Login Credentials

**Admin:**
- Email: sondosessam713@gmail.com
- Password: 123456

**Regular User:**
- Email: user@example.com
- Password: 123456

## Key Features

### Authentication System
- Token-based authentication with secure login/logout
- User registration with form validation (minimum 6 characters password)
- Password reset functionality
- Route guards protecting checkout and admin pages
- Admin role-based access control

### Product Management
- Product catalog with category filtering and live search
- Product detail pages with quantity selection
- Stock management with low-stock indicators ("Only 1 left" badges)
- Discount badges and pricing display
- Admin can create, edit, and delete products

### Shopping Cart & Checkout
- User-specific cart isolation (each user has unique cart)
- Add/remove items with quantity controls
- Item compression (combines duplicate items: "2x Laptop" instead of two separate entries)
- Real-time cart updates and persistence
- Secure checkout with shipping/billing address validation
- Automatic cart clearing after successful order placement

### Order Management
- Order history for customers with tracking
- Order confirmation pages with order IDs
- Admin can view and manage all orders

### User Experience
- Global toast notification system for user feedback
- Responsive design with Bootstrap 5 and custom CSS
- Modern UI with linear gradients and smooth animations
- Mobile-first responsive layout
