# FitKit API - Postman Guide

Base URL:

```text
http://localhost:5000/api
```

For protected endpoints, first call Login and copy the `token` from the response. In Postman, use the **Authorization** tab, choose **Bearer Token**, and paste the token.

## 1. Register

```text
POST /auth/register
```

Headers:

```text
Content-Type: application/json
```

Body, raw JSON:

```json
{
  "name": "Demo User",
  "email": "demo@example.com",
  "password": "password123"
}
```

Expected response: `201 Created`, a success message, user details, and a JWT token.

## 2. Login

```text
POST /auth/login
```

Headers:

```text
Content-Type: application/json
```

Body, raw JSON:

```json
{
  "email": "demo@example.com",
  "password": "password123"
}
```

Expected response: `200 OK` with `token` and `user`.

## 3. Get Products

```text
GET /products
```

No authorization is required.

Expected response: `200 OK` with an array of products.

## 4. Get One Product

```text
GET /products/PRODUCT_ID
```

Replace `PRODUCT_ID` with a MongoDB `_id` from the products response.

## 5. Create Product (Admin)

```text
POST /products
```

Headers:

```text
Content-Type: application/json
Authorization: Bearer YOUR_ADMIN_TOKEN
```

Body, raw JSON:

```json
{
  "name": "Adjustable Kettlebell",
  "description": "A compact kettlebell for home strength workouts.",
  "price": 1499,
  "category": "Strength",
  "image": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
  "rating": 4.5,
  "stock": 10
}
```

Expected response: `201 Created` with the saved product.

## 6. Update Product (Admin)

```text
PUT /products/PRODUCT_ID
```

Headers:

```text
Content-Type: application/json
Authorization: Bearer YOUR_ADMIN_TOKEN
```

Body, raw JSON:

```json
{
  "price": 1399,
  "stock": 8
}
```

Expected response: `200 OK` with the updated product.

## 7. Delete Product (Admin)

```text
DELETE /products/PRODUCT_ID
```

Headers:

```text
Authorization: Bearer YOUR_ADMIN_TOKEN
```

Expected response:

```json
{
  "message": "Product deleted successfully"
}
```

## 8. Create Order

A user must be logged in. The frontend sends the JWT automatically.

```text
POST /orders
```

Headers:

```text
Content-Type: application/json
Authorization: Bearer YOUR_USER_TOKEN
```

Body, raw JSON:

```json
{
  "products": [
    {
      "product": "PRODUCT_ID",
      "name": "Yoga Mat",
      "price": 699,
      "quantity": 1
    }
  ],
  "totalAmount": 699,
  "customerName": "Demo User",
  "email": "demo@example.com",
  "phone": "9999999999",
  "address": "12 College Road",
  "city": "Pune",
  "pincode": "411001"
}
```

Expected response: `201 Created` with the saved order and status `Pending`.

## 9. Get My Orders

```text
GET /orders/my-orders
```

Headers:

```text
Authorization: Bearer YOUR_USER_TOKEN
```

Expected response: `200 OK` with the logged-in user's orders.

## 10. Test Protected Authentication

```text
GET /auth/me
```

Headers:

```text
Authorization: Bearer YOUR_TOKEN
```

Expected response: `200 OK` with the decoded user ID and role.

## Error Statuses

- `400`: invalid or incomplete request data
- `401`: missing, invalid, or expired JWT
- `403`: authenticated user is not an admin
- `404`: product or resource was not found
- `500`: unexpected server/database error
