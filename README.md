# 💻 CodeVerse – Coding Platform

## 🚀 Overview
**CodeVerse** is a modern, full-stack collaborative coding platform designed to help developers improve their algorithmic problem-solving skills.  
Built with **React**, **Node.js**, and **Socket.IO**, it provides **real-time collaboration**, **AI-powered assistance**, and **comprehensive problem management**.

---

## ✨ Key Features

### 🔐 Authentication & User Management
- **JWT-based Authentication** with Redis session management  
- **Role-based Access** (User/Admin) with different permissions  
- **Token Blacklisting & Auto Logout** for session security  

### 💻 Problem Solving Environment
- **Monaco Editor** integration with syntax highlighting  
- **Multi-language Support** – JavaScript, Java, C++, Python  
- **Real-time Code Execution** – via Judge0 API  
- **Test Case Management** – visible & hidden test cases with feedback  

### 🤖 AI-Powered Features
- **AI Assistant** – Google Gemini integration for coding help  
- **Contextual Hints** – problem-specific debugging suggestions  
- **Solution Explanations** – step-by-step breakdowns  

### 📹 Educational Content
- **Video Solutions** – upload & stream explanations  
- **Editorial Content** – detailed tutorials  
- **Reference Solutions** – multiple language implementations  

### 👨‍💼 Admin Panel
- **Problem Management** – create, edit, delete coding problems  
- **Video Uploads** – Cloudinary integration  
- **User Analytics** – track progress & submissions  
- **Bulk Operations** – mass problem creation & management  

---

## 🛠️ Technology Stack

### 🖥️ Frontend
- React 19 – UI framework  
- Vite – build tool and dev server  
- Redux Toolkit – state management  
- React Router – client-side routing  
- Tailwind CSS + DaisyUI + Spline + Atropos – modern UI styling  
- Monaco Editor – professional code editor  
- Socket.IO Client – real-time collaboration  
- Framer Motion – animations  
- React Hook Form + Zod – form handling & validation  

### ⚙️ Backend
- Node.js + Express – REST API server  
- MongoDB + Mongoose – database  
- Redis – caching & session storage  
- Socket.IO – real-time communication  
- JWT – authentication  
- Cloudinary – media storage  
- Judge0 API – code execution  
- Google Gemini AI – AI-powered coding help  
- Multer – file uploads  

### 🌐 External Services
- Judge0 CE – code compilation & execution  
- Cloudinary – image & video storage  
- Google Gemini – AI assistance  
- Redis Cloud – session management  

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js (v18 or higher)  
- MongoDB  
- Redis  
- Judge0 API access  
- Cloudinary account  
- Google Gemini API key  

---

## ⚙️ Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/yourusername/codeverse.git
cd codeverse

# 2️⃣ Install dependencies

# Backend
cd Backend
npm install

# Frontend
cd ../Frontend
npm install

# ⚙️ Environment Setup

## 🗂️ Backend/.env

```bash
# Database
MONGODB_URI=

# Redis
REDIS_HOST=your-redis-host
REDIS_PASSWORD=your-redis-password

# JWT
JWT_SECRET=your-jwt-secret

# Judge0 API
RAPIDAPI_KEY=your-rapidapi-key
RAPIDAPI_HOST=judge0-ce.p.rapidapi.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Google Gemini
GEMINI_KEY=your-gemini-api-key

# Server
PORT=3000
NODE_ENV=development
# 🗂️ Frontend/.env

```bash
# Frontend Environment Variables

# Base URL for API requests
VITE_API_BASE_URL=http://localhost:3000

# Optional: Feature toggles or environment flags
VITE_APP_ENV=development
VITE_ENABLE_AI_ASSISTANT=true
VITE_APP_NAME=CodeVerse


# 🛡️ Security Features

## 🔑 Authentication Security
- JWT token-based authentication  
- Redis token blacklisting  
- Automatic logout on inactivity  
- Password hashing using bcrypt  

---

## 🌍 API Security
- Rate limiting (Redis)  
- CORS configuration  
- Zod schema validation for inputs  
- Role-based admin/user permissions  

---

## 🔒 Data Protection
- Cloudinary for secure file uploads  
- Mongoose ODM for injection prevention  
- Input sanitization to avoid XSS attacks  

---

# 👩‍💻 Author
**Namita Singh**    
💼 Passionate about **Full-Stack Development & Data Science**

---

# 🏁 License
This project is licensed under the **MIT License** – feel free to use and modify with credits.
