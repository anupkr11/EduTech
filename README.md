# 🎓 EduLearn – Full Stack E-Learning Platform

## 🚀 Project Overview

EduLearn is a full-stack e-learning web application where users can browse courses, enroll via payment, track progress, and complete lessons with certification. It also includes an AI-powered assistant to help learners with queries.

This project demonstrates real-world features like authentication, payment integration, protected routes, and dynamic UI updates.

---

## ✨ Features

### 🔐 Authentication

* User Signup & Login
* JWT-based authentication
* Protected routes (Dashboard, Learning)

### 📚 Courses

* Browse all courses
* Course details page
* Preview lessons before purchase

### 💳 Payment Integration

* Stripe payment gateway (Test mode)
* Secure checkout flow
* Payment success handling

### 📈 Progress Tracking

* Track completed lessons
* Dynamic progress bar
* Continue learning feature

### 🎓 Certificate System

* Course completion detection
* Download certificate option

### 🤖 AI Chat Assistant

* Integrated with Groq API (LLM)
* Helps users with coding & course queries

### 🎯 Smart UX

* Conditional UI (Enroll / Continue Learning)
* Loading states (Login, Payment)
* Error handling & validations

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* ShadCN UI
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### APIs & Services

* Stripe (Payment Gateway)
* Groq API (AI Chatbot)

---

## 🌐 Deployment Links

* **Frontend (Vercel):** https://edu-tech-alpha-two.vercel.app/
* **Backend (Render):** https://edutech-backend-qmxf.onrender.com

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/edulearn.git
cd edulearn
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
GROQ_API_KEY=your_groq_key
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔄 Project Workflow

1. User visits homepage
2. Signs up / logs in
3. Browses courses
4. Views course details
5. Makes payment via Stripe
6. Gets enrolled
7. Watches lessons
8. Progress is tracked
9. Completes course
10. Downloads certificate

---

## 📂 Folder Structure

```
EduLearn/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── api/
```

---

## 🧠 Key Learnings

* Implemented full-stack authentication
* Integrated third-party APIs (Stripe, Groq)
* Managed protected routes & role-based access
* Designed scalable UI with React
* Handled async operations with loading states

---

## 📌 Future Improvements

* Add Google OAuth login
* Add course reviews & ratings
* Improve AI chatbot memory
* Add admin dashboard

---

## 🙌 Author

**Anup Kumar**

* GitHub: https://github.com/anupkr11
* LinkedIn: https://www.linkedin.com/in/anup-kumar-06186b20b/

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!

---
