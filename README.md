# 🚀 TaskSaaS – Full Stack Task Management App

A production-ready full stack SaaS-style Task Management application built using **React, Node.js, Express, and PostgreSQL (Sequelize)**.  
It supports secure authentication, multi-user task management, and real-time task operations.

---

## ✨ Features

### 🔐 Authentication
- User Signup & Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes (frontend + backend)

### 📋 Task Management
- Create tasks
- View only your tasks (multi-user isolation)
- Update task status (Pending ↔ Completed)
- Delete tasks

### 🎨 Frontend
- React + Tailwind CSS
- Clean SaaS-style UI
- Responsive dashboard layout
- Sidebar navigation

### ⚙️ Backend
- Node.js + Express
- MVC architecture (controllers, routes, models)
- Sequelize ORM with PostgreSQL
- Centralized error handling

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Tailwind CSS
- Axios
- React Router

**Backend:**
- Node.js
- Express.js
- Sequelize ORM

**Database:**
- PostgreSQL

**Auth:**
- JWT
- bcrypt

---

## 📁 Project Structure

Task-management-app /
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── models/
│ │ ├── middleware/
│ │ ├── app.js
│ │ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── api/
│ │ └── components/
│
└── README.md


---

## 🚀 Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager