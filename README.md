# Click-Shop E-commerce Applicatiion 🛒

[![wakatime](https://wakatime.com/badge/github/hussam-aldarwish/click-shop.svg)](https://wakatime.com/badge/github/hussam-aldarwish/click-shop)

This project was built as part of a frontend development task while applying for the **Frontend Developer** position at [Eduly](https://www.eduly.com/). It demonstrates expertise in creating scalable, modular, and maintainable applications using modern technologies such as TypeScript, Next.js, and Tailwind CSS. It also integrates JSON-SERVER for mock API functionality.

👉 **[Live Demo 🚀](https://click-shop-sigma.vercel.app/)**

## Features ✨

### 🔒 Authentication:

- **Registration Page**: Allows users to sign up with validation and error handling.
- **Login Page**: Enables users to log in and manage sessions securely.

### 🛍️ Product Listing:

- **Product Grid**: Displays a dynamic, responsive grid of products fetched from the mock API.
- **Infinite Scrolling 🔄**: Powered by React Query, allowing seamless product loading as the user scrolls.
- **Product Details**: Provides detailed information for each product.

### 🛒 Shopping Cart:

- Add products to the cart, view details, and manage quantities.

## ⚙️ Technical Stack

- **Data Fetching**: React Query for efficient state and server synchronization
- **Framework**: [Next.js](https://nextjs.org/) with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: [Auth.js](https://authjs.dev/)
- **State Management**: React Context API and custom hooks
- **Mock API**: JSON-SERVER

## 📦 Package Manager Preference: pnpm

I have chosen `pnpm` as the package manager for this project due to its efficiency and performance advantages:

- 🚀 Faster installations compared to npm and yarn.
- 💾 Disk space savings through content-addressable storage, avoiding redundant copies of packages.
- 🔒 Strict dependency management ensures a consistent and predictable dependency tree.

## 📂 Project Structure

```
/app
  ├── api             # API routes (e.g., NextAuth)
  ├── auth            # Authentication pages
  ├── products        # Product listing and detail pages
  ├── profile         # User profile page
  ├── shopping-cart   # Shopping cart page
  ├── globals.css     # Global CSS styles
  ├── layout.tsx      # Application layout

/components
  ├── common          # Reusable UI components (e.g., Logo, ThemeToggleButton)
  ├── forms           # Form components (e.g., LoginForm, SignUpForm)
  ├── layout          # Layout components (e.g., Header, Footer)
  ├── products        # Product-related components (e.g., ProductCard, ProductGrid)
  |-- providers       # Centralized context and state management providers for the application
  ├── shopping-cart   # Shopping cart components (e.g., ShoppingCartList)

/hooks
  ├── useMediaQuery   # Custom hook for media queries
  ├── useShoppingCart # Shopping cart management logic
  ├── useTheme        # Theme toggling logic

/contexts
  ├── ShoppingCartContext.ts # Global shopping cart state
  ├── ThemeContext.ts        # Global theme state

/lib
  ├── jsonServerAdapter.ts # Custom Adapter for JSON-SERVER with Auth.js

/helpers
  ├── env.ts          # Environment variable utilities
  ├── fetch.ts        # API fetch helper
  ├── hashing.ts      # Hashing utility

/public               # Static assets (e.g., icons, images)
/config               # Configuration files
```

## 🛠️ Getting Started

### Prerequisites

- 📦 Node.js >= 14.x
- 📑 npm, pnpm, or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd click-shop
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📐 Architectural Highlights

### 🔑 Authentication Flow

- A modular approach is used for authentication forms, with validation schemas for input validation.

### 🛍️ Product Listing and State Management

- Data is fetched from the mock API and displayed dynamically.
- The application uses the Context API and hooks for managing shared states such as the shopping cart and theme.

### 📏 Best Practices

- ✅ Error handling for API requests
- ✅ Modular component design
- ✅ Responsive UI with Tailwind CSS

## 🌐 Deployment

The application is deployed as follows:

- **Frontend**: Hosted on [Vercel](https://vercel.com/), ensuring fast and reliable delivery with seamless Next.js support.
  - **Live Link**: [https://click-shop-sigma.vercel.app/](https://click-shop-sigma.vercel.app/)
- **Mock API**: JSON-SERVER is deployed on [Render](https://render.com/) for scalable and persistent API simulation.
  - **API Link**: [https://click-shop-5dvx.onrender.com](https://click-shop-5dvx.onrender.com)

## ⚠️ Known Issues

- **Backend Server Delay ⏳**:  
  The dummy backend (JSON-SERVER) is hosted on the Render free-tier plan, which enters a sleep state after inactivity. When the server is inactive, it may take up to 50 seconds to start up again. This can cause delays during the initial data load. A notification is displayed in the application to inform users about this delay.

## 👩‍💻 Author: [Hussam Aldarwish](https://github.com/hussam-aldarwish)
