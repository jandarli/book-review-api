# 🚀 Express.js Project: Book Review API + Auth System

## 1. 📘 Project Overview
A simple REST API using Express.js for managing book reviews, with user authentication and role-based authorization.

---

## 2. 🛠 Stack / Tools
Before you start, make sure you're comfortable with:
- `express` – server framework
- `bcrypt` – password hashing
- `jsonwebtoken` – token-based auth
- `dotenv` – environment config

---

## 3. 🗂 Project Structure (Recommended)
```
book-review-api/
├── controllers/
│   ├── authController.ts
│   └── booksController.ts
├── middleware/
│   └── authMiddleware.ts
├── routes/
│   ├── authRoutes.ts
│   └── bookRoutes.ts
├── models/
│   └── userModel.ts
├── data/
│   └── books.tson
├── server.ts
├── .env
└── package.tson
```

---

## 4. 🏗 Step-by-Step Features

### Step 1: Basic Server & Routing
- Set up `express`, `server.ts`, and a simple home route.
- Create `bookRoutes.ts` with a `GET /books` route.

### Step 2: Add Controllers
- Create `booksController.ts` and move route logic there.
- Create dummy data in `books.tson` or in-memory array.

### Step 3: Modularize with Routers
- Use `express.Router()` in both `bookRoutes.ts` and `authRoutes.ts`.
- Plug routers into `server.ts`.

### Step 4: User Registration & Login
**(authController.ts + authRoutes.ts)**
- `POST /register` – hash password, save user
- `POST /login` – verify password, return JWT

### Step 5: Add Middleware
**(authMiddleware.ts)**
- `authenticateToken` – check JWT on protected routes
- `authorizeRole(role)` – limit access by user role

### Step 6: Protect Routes
- Make `POST /books` accessible to logged-in users
- Restrict `PUT` and `DELETE` to admin only

---

## 5. 🔐 Role-Based Authorization
- Users have roles: `'user'` or `'admin'`
- Add role checks in `authMiddleware.ts`

---

## 6. ✅ Final Route Summary

**Public:**
- `GET /books`

**Authenticated Users:**
- `POST /books`

**Admin Only:**
- `PUT /books/:id`
- `DELETE /books/:id`

**Auth:**
- `POST /register`
- `POST /login`

---

## 7. 🎯 Bonus Features (Optional)
- Store books in a file (`books.json`) or connect to MongoDB
- Add pagination and sorting to `GET /books`
- Add `GET /me` route to show logged-in user's info
- Build a frontend to consume this API

---

## 8. 🧠 What You'll Learn
- Routing and route organization
- Express middleware
- Authentication with JWT
- Authorization with user roles
- File-based or DB storage (optional)
