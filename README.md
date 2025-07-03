# 📚 Library Management System – Client

This is the **frontend** of the Minimal Library Management System, developed with **React**, **TypeScript**, **Tailwind CSS**, and **Redux Toolkit Query**. It allows users to manage a collection of books, perform borrowing operations, and view a real-time borrow summary. This project is part of an academic assignment.

***Live Link: https://library-management-client-three.vercel.app/

---

## 🚀 Features

- ✅ View list of all available books
- ✅ Create, update, and delete books
- ✅ Borrow books with quantity and due date
- ✅ View borrow summary with total quantity borrowed per book
- ✅ Real-time updates with RTK Query
- ✅ Toast notifications for user feedback
- ✅ Fully responsive and mobile-friendly UI using Tailwind CSS

---

## 🛠️ Tech Stack

- **React** – Frontend library
- **TypeScript** – Static typing
- **Tailwind CSS** – Utility-first CSS framework
- **Redux Toolkit (RTK)** + **RTK Query** – State and data fetching
- **React Hook Form** – Form management
- **Vite** – Lightning-fast dev server and bundler

---

## 📁 Folder Structure

src/
│
├── components/ # Reusable UI components
├── pages/ # Route-level pages (BookList, CreateBook, EditBook, BorrowSummary)
├── redux/ # RTK Query setup and API definitions
├── types/ # TypeScript interfaces
└── main.tsx # App entry point

---

## 🌐 Environment Variables

Create a `.env` file in the root of the project:

VITE_API_BASE_URL=http://localhost:5000/api

> ⚠️ Make sure to replace the URL when deploying to production.

---

## 🧪 Getting Started

### 1️⃣ Create a folder

cd library-management-client
2️⃣ Install Dependencies

npm install
3️⃣ Start the Development Server

npm run dev
The app will run on http://localhost:5173

🧑‍💻 Available Scripts
Script	Description
npm run dev	Start dev server (Vite)
npm run build	Build for production
npm run preview	Preview production build

🌍 Deployment
This app is deployable on Vercel, Netlify, or any static hosting provider.

On Vercel:
Push the code to GitHub

Connect the repo to Vercel

Add VITE_API_BASE_URL in the Environment Variables section

Deploy

Also deploy with the command of vercel

if it has to redeploy just command: vercel --prod

📦 Backend Repository
https://github.com/Sarfaraj525/library-management-server

👉 Link to Backend Repository
https://library-management-server-gamma-sand.vercel.app/

📚 License
This project is open-source and available for educational purposes.

🙋‍♂️ Author
Sarfaraj Nawaz Chowdhury
📧 sarfarajeee525@gmail.com
🔗 www.linkedin.com/in/sarfaraj-nawaz-chowdhury