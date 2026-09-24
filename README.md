# CampusFind AI – Smart College Lost & Found System

> **An intelligent campus recovery platform that connects students who lose items with students who find them using smart matching, confidence scoring, evidence verification, and secure claim validation.**

---

## 🌟 Key Highlights & Concept

CampusFind AI moves beyond simple CRUD lost-and-found listings. It acts as a full-fledged campus recovery engine designed with startup-grade aesthetics and scalable architecture:

- 🧠 **Smart Matching Engine**: Evaluates item category, physical attributes (color, brand), location proximity, and timeframe deltas to calculate a **Match Confidence Score (0–100%)**.
- 💡 **Explainable AI Match Reasoning**: Clear, human-readable explanations showing *why* an item was flagged as a match (e.g., *"Same location perimeter (Central Library)"*, *"Lost and found within a 24-hour timeframe"*).
- 🔒 **Privacy-First Item Display**: Distinctive identifying details (such as serial numbers, stickers, or specific wallet contents) are hidden publicly to prevent false claims.
- 🔑 **Secure Ownership Verification**: Owners prove identity by correctly answering private verification questions before physical location or finder details are unlocked.
- 🗺️ **Campus Recovery Roadmap**: Designed for future integration of AI conversational reporting assistants, vector image comparison, campus loss heatmaps, and fraud/suspicious claim detection.

---

## 🏗️ Project Architecture & Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS v4 (Glassmorphic dark theme)
- **Routing**: React Router DOM
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Schema prepared for Mongoose)
- **Authentication**: JWT token workflow structure prepared

---

## 📁 Repository Structure

```
college-lost-found/
├── frontend/                 # React + Tailwind frontend application
│   ├── src/
│   │   ├── components/       # Navbar, Footer, ReportModal preview
│   │   ├── pages/            # Home, Login, Register, About
│   │   ├── App.jsx           # Routing & layout wrapper
│   │   └── main.jsx          # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                   # Express + Node.js backend API
│   ├── config/               # Database connection (db.js)
│   ├── controllers/          # Route handlers placeholder
│   ├── models/               # User.js (Mongoose schema)
│   ├── routes/               # API endpoint definitions
│   ├── services/             # matchingEngine.js (Smart match algorithm)
│   ├── server.js             # Main server entry point
│   ├── .env.example          # Environment variables blueprint
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** or **yarn**

### 1. Running the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Building Frontend for Production
```bash
cd frontend
npm run build
```

### 3. Setting Up the Backend Server
```bash
cd server
npm install
# Copy .env.example to .env and fill in MongoDB credentials
npm run dev
```

---

## 🌐 Deployment Readiness
- **Frontend**: Ready for deployment on **Vercel**, **Netlify**, or **Render**.
- **Backend**: Ready for deployment on **Render**, **Railway**, or **AWS Elastic Beanstalk**.

---

## 📜 License
This project is developed as an intelligent college lost & found startup prototype.
