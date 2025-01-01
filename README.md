# Ecommerce Store Backend API Documentation 🛒📦

## Comprehensive API Documentation for My Ecommerce Store Backend 📑

This document provides a detailed description of all the API endpoints available in the Ecommerce Store Backend, including user authentication, admin panel, product and category management, and error handling.

---

## Tools and Technologies Used 🛠️

- **Node.js & Express.js**: Building server-side logic, routes, and APIs.
- **PostgreSQL & Prisma**: Database design, querying, and management.
- **JWT**: Implementing secure authentication and authorization.
- **Express-rate-limit**: Implementing API rate limiting for security.
- **Zod**: Schema validation.

---

## Table of Contents 📖

1. **Authentication Routes**:
   - **For signup**: POST Request, `/api/auth/sign-up` | requires `username` (string), `email` (string), `password` (string)
   - **For signin**: POST Request, `/api/auth/sign-in` | requires `email` (string), `password` (string) | returns a JWT token for auth | rate limit of 3 requests per 15 minutes for security

2. **Admin Panel Routes**:
   - Protected routes, require JWT token from signin, sent as headers like `Authentication: 'Bearer ${token}'`, and only accessible by admin with role 'ADMIN'.
   - **For creating a category**: POST Request, `/api/admin/category` | requires `name` (string)
   - **For deleting a category**: DELETE Request, `/api/admin/category/:name` | requires `name` of category to delete as params, also deletes all products in the category
   - **For creating a product**: POST Request, `/api/admin/product` | requires `name` (string), `description` (string), `price` (Int), `category` (string) | only send existing categories as product category
   - **For deleting a product**: DELETE Request, `/api/admin/product/:id` | requires `id` of product to delete as params

3. **Product Routes**:
   - Public routes.
   - **For getting all products**: GET Request, `/api/product` | pagination feature, requires `page` and `limit` as params, default: `page` is 0, `limit` is 10
   - **For searching products**: GET Request, `/api/product/search` | requires `search` (`?search=`) as query params, returns matching products
   - **For getting products of a category**: GET Request, `/api/product/category/:name` | requires `name` of category as params
   - **For getting related products of a specific product**: GET Request, `/api/product/related/:id` | requires `id` of the product as params
   - **For viewing a single product**: GET Request, `/api/product/:id` | requires `id` of product as params

4. **Category Routes**:
   - Public routes.
   - **For getting all categories**: GET Request, `/api/category`

5. **Error Handling**:
   - All API endpoints return relevant responses, with `success` as `false` for errors and `true` for successful operations. Each response includes a `message` indicating the outcome of the request.
