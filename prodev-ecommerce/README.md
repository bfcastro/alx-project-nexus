##Modern React E-Commerce Catalog (CRA + TypeScript)

A fully responsive, high-performance product catalog application built with React, CRA, TypeScript, Redux Toolkit, and TailwindCSS.
This project demonstrates clean architecture, reusable components, filtering logic, pagination, infinite scrolling, and a delightful user experience.

#Project Overview

This project is a modern e-commerce product catalog featuring dynamic product loading from an API, intuitive filtering, clean UI interactions, and optimized performance.
Built with today’s industry standards, it serves as a strong foundation for any real e-commerce frontend.

#Features & Functionality
Search & Filtering
- Real-time product search
- Category filter dropdown
- Sort by price or relevance

Infinite Scrolling
- Smooth automatic loading of products as the user scrolls
- Enhances browsing efficiency and reduces page reloads

Product Quick View Modal
- Instant popup preview of product image, price, and description
- Allows adding items to cart without navigating away
- Improves user flow and reduces friction

Cart System (Redux Toolkit)
- Add, remove, and update quantity
- Centralized state for consistent cart behavior

Skeleton Loading
- Shopify-style shimmer placeholders for improved perceived performance

Responsive UI
- Mobile-first design
- Clean layout for both small and large screenses.

#UI/UX Design Rationale
- Simple, distraction-free layout to highlight products
- Minimal motions and spacing for a sleek modern feel
- Component reusability for scalability
- Consistent color styling using Tailwind utility classes
- Optimized alignment & spacing for clarity and user focus

#Technologies Used
- CRA (Create React App)
- React (TypeScript) – component-driven architecture
- Redux Toolkit – clean global state management
- TailwindCSS – utility-first responsive styling
- React Icons – lightweight icon set

#API
FakeStore API for product data

#Best Practices & Standards Followed
- Component-based folder structure
- Redux Toolkit slices for clean state logic
- Custom hooks where applicable
- Responsive & accessible UI patterns
- Performance-first optimization (lazy loading, infinite scroll)
- Clean and readable TypeScript types

#Installation
git clone https://github.com/bfcastro/alx-project-nexus.git
cd alx-project-nexus/prodev-ecommerce
npm install
npm run dev