# Office Automation System (Ticketing System)

Office Automation System for managing users, tickets, messages, and categories using **Node.js**, **Express**, **MongoDB**, and documented with **Swagger**.

---

## Features

- User registration and login with JWT and refresh tokens
- Admin user management (CRUD)
- Ticket and message management
- Role-based access control (`admin`, `manager`, `staff`, `user`)
- API documentation with Swagger
- HttpOnly cookie storage for refresh tokens

---

## Project Structure

```
backend/
│
├─ src/
│  ├─ controllers/       # API controllers
│  ├─ middlewares/       # Middleware (auth, role)
│  ├─ models/            # MongoDB models
│  ├─ routes/            # API routes
│  ├─ config/            # Database connection
│  ├─ docs/              # Swagger documentation
│  ├─ app.js             # Express setup and routes
│  └─ server.js          # Server start
│
├─ .env.example          # Sample environment variables
├─ package.json
└─ README.md
```

---

## Prerequisites

- Node.js >= 18
- MongoDB
- npm or yarn

---

## Installation & Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create the `.env` file:

```bash
cp .env.example .env
```

Fill in your actual values:

```env
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/ticket
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
```

4. Start the server:

```bash
npm start
# or for development with auto-reload
npm run dev
```

5. Access Swagger API documentation:

```
http://localhost:5000/api-docs
```

---

## API Usage

### Auth
- `POST /api/auth/register` → Register new user
- `POST /api/auth/login` → Login and receive access token
- `POST /api/auth/refresh` → Refresh access token
- `POST /api/auth/logout` → Logout
- `GET /api/auth/profile` → Get current user profile
- `PUT /api/auth/profile` → Update current user profile
- `DELETE /api/auth/profile` → Delete current user 
- `change-password /api/auth/change-password` → change password current user
profile

### Users (Admin only)
- `POST /api/users` → Create new user
- `GET /api/users` → Get all users
- `GET /api/users/:id` → Get user by ID
- `PUT /api/users/:id` → Update user
- `DELETE /api/users/:id` → Delete user

### Tickets, Messages, Categories
- Routes similar to above under `/api/tickets`, `/api/messages`, `/api/categories`

---

## Security

- Password hashing with bcrypt
- JWT tokens with different expiration (short access, long refresh)
- Refresh token stored in HttpOnly cookie

---

## Notes

- **Do not push your `.env` file to GitHub.** Use `.env.example` instead.
- The `node_modules/` folder should be ignored via `.gitignore`.

---

## Frontend Development

You can build a React or Next.js frontend using this API and implement JWT-based authentication.


