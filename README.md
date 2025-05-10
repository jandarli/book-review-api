# Express.js Project: Book Review API + Auth System

## 1. 📘 Project Overview
A REST API using Express.js for managing book reviews, with user authentication and role-based authorization.

---

## 2. 🛠 Stack / Tools
Before you start, make sure you're comfortable with:
- `express` – server framework
- `bcrypt` – password hashing
- `jsonwebtoken` – token-based auth
- `dotenv` – environment config

---

## 3. 🗂 Project Structure
```
book-review-api/
├── config/
├── migrations/
├── src/
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── booksController.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   └── bookRoutes.ts
│   ├── models/
│   │   └── userModel.ts
│   └── server.ts
├── sql/
├── .env
├── package.json
├── tsconfig.json
```

---

## 4. 🏗 Features

### Basic Server & Routing
- Set up `express`, `server.ts`, and a home route.
- Create `bookRoutes.ts` with a `GET /books` route.

### Add Controllers
- Create `booksController.ts` and move route logic there.
- Create dummy data in `books.tson` or in-memory array.

### Modularize with Routers
- Use `express.Router()` in both `bookRoutes.ts` and `authRoutes.ts`.
- Plug routers into `server.ts`.

### User Registration & Login
**(authController.ts + authRoutes.ts)**
- `POST /register` – hash password, save user
- `POST /login` – verify password, return JWT

### Add Middleware
**(authMiddleware.ts)**
- `authenticateToken` – check JWT on protected routes
- `authorizeRole(role)` – limit access by user role

### Protect Routes
- Make `POST /books` accessible to logged-in users
- Restrict `PUT` and `DELETE` to admin only

---

##  🔐 Role-Based Authorization
- Users have roles: `'user'` or `'admin'`
- Add role checks in `authMiddleware.ts`

---

**Auth:**
- `POST /register`
- `POST /login`

---
