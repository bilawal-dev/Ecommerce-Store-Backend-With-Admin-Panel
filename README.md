# Ecommerce Store Backend API Documentation

This document provides a detailed description of all the API endpoints available in the Ecommerce Store Backend, including user authentication, admin panel, product and category management, and error handling.

---

## Table of Contents

1. Authentication Routes:
   - For signup POST Req, /api/auth/sign-up | requires username (string), email (string), password (string)
   - For signin POST Req, /api/auth/sign-in | requires email (string), password (string) | it returns a jwt token for auth | it has api rate limit of 3 reqs per 15 mins for security

2. Admin Panel Routes:
   - it is a protected route so send jwt token from signin, as headers like `Bearer ${token}`, and only admin can login because he was role as 'ADMIN'
   - For creating a category POST Req, /api/admin/category | requires name (string)
   - For deleting a category DELETE Req, /api/admin/category/:name | requires name of category to delete as params, deleting category also deletes all the category products
   - For creating a product POST Req, /api/admin/product | requires name (string), description (string), price (Int), category (string) | only send created categories as category of product
   - For deleting a product DELETE Req, /api/admin/product/:id | requires id of product to delete as params

3. Product Routes:
   - it is a public route
   - For getting all products GET Req, /api/product | it has pagination feature, so requires page and limit as params, by default, page is 0 and limit is 10
   - For searching product GET Req, /api/product/search | it requires search (?search=) as query params, and returns search products
   - For getting products of a category GET Req, /api/product/category/:name | requires name of category as params
   - For getting related products of a specific product GET Req, /api/product/related/:id | requires id of the product, of which related products are to be found as params
   - For viewing a single product GET Req, /api/product/:id | requires id of product to delete as params

4. Category Routes:
   - it is a public route
   - For getting all categories GET Req, /api/category

5. Error Handling:
   - All the API endpoints have relevant responses, with 'success' as 'false' for errors and 'true' for successful operations. Each response includes a 'message' indicating the outcome of the request.