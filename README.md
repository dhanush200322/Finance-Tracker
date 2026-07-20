<div align="center">
  
# 🟢 FolioTracker - Finance Portfolio Tracker

**A Premium, Full-Stack FinTech Dashboard for tracking personal investments and analyzing portfolio performance.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=React_Query&logoColor=white)](https://tanstack.com/query/latest)

</div>

---

## 🌐 Live Links

- 💻 **GitHub Repository:** [https://github.com/dhanush200322/finance-portfolio-tracker](https://github.com/dhanush200322/finance-portfolio-tracker)
- 🚀 **Live Demo (Vercel):** [https://your-project.vercel.app](https://your-project.vercel.app)
- ⚙️ **Backend API (Render):** [https://your-backend.onrender.com](https://your-backend.onrender.com)
- 🌐 **Portfolio:** [https://your-portfolio.vercel.app](https://your-portfolio.vercel.app)
- 🔗 **LinkedIn:** [https://linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)

*(Replace placeholders with actual deployed links)*

---

## 📖 Project Overview

**Purpose:**  
FolioTracker is designed to give users a transparent, real-time overview of their personal wealth. Built as a Full Stack Developer Internship Assessment, this project demonstrates enterprise-level architecture, strict type-safety, and modern FinTech UI/UX design patterns.

**Features:**  
It calculates real-time profits, losses, and ROI across various asset classes while providing a seamless, secure, and responsive user experience. 

**Architecture:**  
A strictly decoupled frontend and backend. The client uses **React Query** for aggressive caching and server-state synchronization. The backend utilizes **NestJS** and **Prisma** to securely handle database mutations and **JWTs** for authentication.

---

## 📸 Screenshots

*(Replace with actual project screenshots)*

### Login & Registration
<!-- Add Login Screenshot Here -->

### Main Dashboard (Portfolio Summary)
<!-- Add Dashboard Screenshot Here -->

### Investments CRUD Table
<!-- Add Investments Screenshot Here -->

### Profile Settings & Danger Zone
<!-- Add Profile Screenshot Here -->

---

## ✨ Features

| Feature | Status |
|---------|:---:|
| **JWT Authentication** (Login/Register/Logout) | ✅ |
| **Secure Password Strength Meter** | ✅ |
| **Investment CRUD** (Create, Read, Update, Delete) | ✅ |
| **Portfolio Summary & ROI Calculation** | ✅ |
| **Profile Management & Cascade Account Deletion** | ✅ |
| **Responsive, Premium FinTech UI** | ✅ |
| **React Query Data Fetching & Caching** | ✅ |
| **PostgreSQL & Prisma ORM** | ✅ |

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, React Hook Form, Zod
- **State Management:** TanStack React Query, React Context (Auth)
- **Backend:** NestJS, TypeScript, Passport.js, JWT, Class Validator
- **Database:** PostgreSQL (Neon), Prisma ORM
- **Deployment:** Vercel (Frontend), Render / Railway (Backend)

---

## 🏗️ Architecture Diagram

```text
[ Client / Web Browser ] 
       │ 
 (Axios + Interceptors + JWT Bearer Token)
       │
       ▼
[ NestJS Backend / REST API ] ───▶ [ AuthGuard / JWT Strategy ]
       │
       ├─▶ [ Users Module ]
       ├─▶ [ Investments Module ]
       ├─▶ [ Portfolio Module ]
       │
       ▼
[ Prisma ORM ] 
       │
       ▼
[ PostgreSQL DB ]
```

---

## 📂 Folder Structure

```text
finance-portfolio-tracker/
├── backend/
│   ├── prisma/             # Database schema & migrations
│   ├── src/
│   │   ├── auth/           # Login, Register, JWT Strategy
│   │   ├── investments/    # CRUD operations for assets
│   │   ├── portfolio/      # Aggregation & ROI calculations
│   │   ├── users/          # Profile management
│   │   ├── common/         # Global interceptors & decorators
│   │   └── main.ts         # NestJS entry point & CORS setup
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/            # Axios instance setup
    │   ├── components/     # UI, Layouts, Forms, Tables
    │   ├── context/        # AuthContext
    │   ├── hooks/          # React Query mutations & fetchers
    │   ├── pages/          # Dashboard, Login, Register, Profile
    │   ├── routes/         # ProtectedRoutes & AppRouter
    │   ├── types/          # TypeScript interfaces
    │   └── main.tsx        # React entry point
    ├── .env.example
    └── package.json
```

---

## 🚀 Installation & Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/dhanush200322/finance-portfolio-tracker.git
cd finance-portfolio-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
# Set up your .env file here

# Run Prisma migrations to sync your PostgreSQL database
npx prisma migrate dev

# Start the NestJS server
npm run start:dev
```

### 3. Frontend Setup
```bash
# Open a new terminal
cd frontend
npm install
# Set up your .env file here

# Start the Vite development server
npm run dev
```

---

## 🔐 Environment Variables

You will need to create a `.env` file in both the `backend` and `frontend` directories.

**`backend/.env`**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/finance_tracker?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3000
```

**`frontend/.env`**
```env
VITE_API_URL="http://localhost:3000"
```

---

## 📡 API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Authenticate and return JWT token |
| `GET`  | `/auth/me` | Fetch currently authenticated user |
| `GET`  | `/users/profile` | Get user profile data |
| `PUT`  | `/users/profile` | Update user name/email |
| `DELETE`| `/users/profile`| Delete user account (cascades) |
| `GET`  | `/investments` | Get all investments for current user |
| `POST` | `/investments` | Create a new investment |
| `PUT`  | `/investments/:id` | Update investment details |
| `DELETE`| `/investments/:id`| Delete an investment |
| `GET`  | `/portfolio/summary` | Aggregate total invested, value, and ROI |

---

## 🔑 Authentication Flow

1. **Client Submission:** User submits credentials to `/auth/login`.
2. **Server Verification:** Backend validates via bcrypt and returns a signed JWT.
3. **Local Storage:** Frontend securely stores the JWT.
4. **Axios Interceptor:** An Axios Request Interceptor automatically attaches `Authorization: Bearer <token>` to all outgoing network requests.
5. **Global Error Handling:** An Axios Response Interceptor catches any `401 Unauthorized` errors globally, clears storage, and seamlessly redirects the user back to the login screen.

---

## 🗄️ Database Schema & ER Diagram

```text
[ User ]  1 ────────────── N  [ Investment ]
- id (UUID)                   - id (UUID)
- name                        - userId (FK)
- email (Unique)              - investmentName
- password                    - investmentType
- createdAt                   - investedAmount
- updatedAt                   - currentValue
                              - purchaseDate
```

**Prisma Schema Snippet:**
```prisma
model User {
  id          String       @id @default(uuid()) @db.Uuid
  name        String
  email       String       @unique
  password    String
  investments Investment[]
}

model Investment {
  id             String   @id @default(uuid()) @db.Uuid
  userId         String   @db.Uuid
  investmentName String
  investedAmount Decimal
  currentValue   Decimal
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## ⚛️ React Architecture

- **React Query:** Serves as the primary engine for fetching and caching server state. By utilizing `queryClient.invalidateQueries`, the UI automatically refreshes when investments are created, updated, or deleted—without triggering hard page reloads.
- **Axios:** Centralized API client configured with global interceptors.
- **Protected Routes:** A `<ProtectedRoute />` wrapper strictly blocks unauthenticated traffic from accessing the `/dashboard`, `/investments`, or `/profile`.
- **Custom Hooks:** Business logic is decoupled from components. E.g., `useInvestments` handles all CRUD logic and toast notifications.
- **Reusable UI Components:** Adheres to DRY principles. Components like `<Input />`, `<Button />`, and `<Card />` are highly reusable and fully typed.

---

## 📬 Postman Collection

A fully configured Postman collection is included in the repository root:  
`Finance_Portfolio_Tracker.postman_collection.json`

Import this file into Postman to easily test all backend endpoints. It includes automated JWT token extraction for seamless authenticated testing.

---

## 🚀 Deployment Guide

### Frontend (Vercel)
1. Push your code to GitHub.
2. Import the project into Vercel.
3. Set the Root Directory to `frontend`.
4. Add the `VITE_API_URL` environment variable.
5. Deploy.

### Backend (Render / Railway)
1. Set up a managed PostgreSQL database (e.g., Neon or Supabase).
2. Create a Web Service and set the Root Directory to `backend`.
3. Add `DATABASE_URL` and `JWT_SECRET` environment variables.
4. Build Command: `npm install && npx prisma generate && npm run build`
5. Start Command: `npm run start:prod`

---

## 🔮 Future Improvements

- 📊 **Interactive Charts:** Integrate Recharts or Chart.js to visualize asset allocation and historical portfolio performance.
- 📑 **Pagination & Filtering:** Implement cursor or offset-based pagination and advanced filtering for large investment datasets.
- 🔐 **OAuth Integration:** Allow users to log in securely via Google or GitHub using Passport.js.
- 🐳 **Dockerization:** Add Docker and docker-compose support for streamlined local development.
- 🧪 **Comprehensive Testing:** Add Unit Tests (Jest) and End-to-End Tests (Cypress).

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Dhanush AV**

- 💻 **GitHub:** 
-
